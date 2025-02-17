import aggregateNewRecords from '../aggregations/aggregateNewRecords.js'
import aggregateRecentRecords from '../aggregations/aggregateRecentRecords.js'
import aggregateTopRecords from '../aggregations/aggregateTopRecords.js'
import constants from '../constants/referrers.js'
import sortings from '../constants/sortings.js'
import Record from '../models/Record.js'
import recursiveId from '../utils/recursiveId.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
	const aggregation = (() => {
		if (type === constants.REFERRERS_TYPE_WITH_SOURCE) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'source', 'siteReferrer' ], range, limit, dateDetails, true)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'source', 'siteReferrer' ], limit, true)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'source', 'siteReferrer' ], limit, true)
		}
		if (type === constants.REFERRERS_TYPE_NO_SOURCE) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'siteReferrer' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'siteReferrer' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'siteReferrer' ], limit)
		}
		if (type === constants.REFERRERS_TYPE_ONLY_SOURCE) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'source' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'source' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'source' ], limit)
		}
	})()

	const enhanceId = (id) => {
		return id.source || id.siteReferrer
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