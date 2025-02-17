import aggregateNewRecords from '../aggregations/aggregateNewRecords.js'
import aggregateRecentRecords from '../aggregations/aggregateRecentRecords.js'
import aggregateTopRecords from '../aggregations/aggregateTopRecords.js'
import sortings from '../constants/sortings.js'
import Record from '../models/Record.js'
import recursiveId from '../utils/recursiveId.js'

const get = async (ids, sorting, range, limit, dateDetails) => {
	const aggregation = (() => {
		if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'siteLocation' ], range, limit, dateDetails)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'siteLocation' ], limit)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'siteLocation' ], limit)
	})()

	const enhanceId = (id) => {
		return id.siteLocation
	}

	const enhance = (entries) => {
		return entries.map((entry) => {
			const value = enhanceId(entry._id)

			return {
				id: recursiveId([ value, sorting, range, ...ids ]),
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