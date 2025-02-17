import aggregateNewRecords from '../aggregations/aggregateNewRecords.js'
import aggregateRecentRecords from '../aggregations/aggregateRecentRecords.js'
import aggregateTopRecords from '../aggregations/aggregateTopRecords.js'
import constants from '../constants/browsers.js'
import sortings from '../constants/sortings.js'
import Record from '../models/Record.js'
import recursiveId from '../utils/recursiveId.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
	const aggregation = (() => {
		if (type === constants.BROWSERS_TYPE_NO_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'browserName' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'browserName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'browserName' ], limit)
		}
		if (type === constants.BROWSERS_TYPE_WITH_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'browserName', 'browserVersion' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'browserName', 'browserVersion' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'browserName', 'browserVersion' ], limit)
		}
	})()

	const enhanceId = (id) => {
		if (type === constants.BROWSERS_TYPE_NO_VERSION) return `${ id.browserName }`
		if (type === constants.BROWSERS_TYPE_WITH_VERSION) return `${ id.browserName } ${ id.browserVersion }`
	}

	const enhance = (entries) => {
		return entries.map((entry) => {
			const value = enhanceId(entry._id)

			return {
				id: recursiveId([ value, sorting, type, range, ...ids ]),
				value,
				count: entry.count,
				created: entry.created,
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