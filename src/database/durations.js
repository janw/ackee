import { toZonedTime } from 'date-fns-tz'
import aggregateDurations from '../aggregations/aggregateDurations.js'
import intervals from '../constants/intervals.js'
import Record from '../models/Record.js'
import createArray from '../utils/createArray.js'
import matchesDate from '../utils/matchesDate.js'
import recursiveId from '../utils/recursiveId.js'

const get = async (ids, interval, limit, dateDetails) => {
	const aggregation = (() => {
		return aggregateDurations(ids, interval, limit, dateDetails)
	})()

	const enhance = (entries) => {
		const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
		const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
		const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

		return createArray(limit).map((_, index) => {
			const date = dateDetails.lastFnByInterval(interval)(index)

			// Database entries include the day, month and year in the
			// timezone of the user. We therefore need to match it against a
			// date in the timezone of the user.
			const userZonedDate = toZonedTime(date, dateDetails.userTimeZone)

			// Find a entry that matches the date
			const entry = entries.find((entry) => {
				return matchesDate(
					matchDay === true ? entry._id.day : undefined,
					matchMonth === true ? entry._id.month : undefined,
					matchYear === true ? entry._id.year : undefined,
					userZonedDate,
				)
			})

			const value = (() => {
				if (matchDay === true) return `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`
				if (matchMonth === true) return `${ date.getFullYear() }-${ date.getMonth() + 1 }`
				if (matchYear === true) return `${ date.getFullYear() }`
			})()

			return {
				id: recursiveId([ value, ...ids ]),
				value,
				count: entry == null ? 0 : entry.count,
			}
		})
	}

	return enhance(
		await Record.aggregate(aggregation),
	)
}

export default {
	get,
}