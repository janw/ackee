import aggregateNewRecords from '../aggregations/aggregateNewRecords.js'
import aggregateRecentRecords from '../aggregations/aggregateRecentRecords.js'
import aggregateTopRecords from '../aggregations/aggregateTopRecords.js'
import sortings from '../constants/sortings.js'
import constants from '../constants/systems.js'
import Record from '../models/Record.js'
import recursiveId from '../utils/recursiveId.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
	const aggregation = (() => {
		if (type === constants.SYSTEMS_TYPE_NO_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'osName' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'osName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'osName' ], limit)
		}
		if (type === constants.SYSTEMS_TYPE_WITH_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'osName', 'osVersion' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'osName', 'osVersion' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'osName', 'osVersion' ], limit)
		}
	})()

	const enhanceId = (id) => {
		if (type === constants.SYSTEMS_TYPE_NO_VERSION) return `${ id.osName }`
		if (type === constants.SYSTEMS_TYPE_WITH_VERSION) return `${ id.osName } ${ id.osVersion }`
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