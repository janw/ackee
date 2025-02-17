import aggregateNewRecords from '../aggregations/aggregateNewRecords.js'
import aggregateRecentRecords from '../aggregations/aggregateRecentRecords.js'
import aggregateTopRecords from '../aggregations/aggregateTopRecords.js'
import constants from '../constants/devices.js'
import sortings from '../constants/sortings.js'
import Record from '../models/Record.js'
import recursiveId from '../utils/recursiveId.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
	const aggregation = (() => {
		if (type === constants.DEVICES_TYPE_NO_MODEL) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'deviceManufacturer' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'deviceManufacturer' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'deviceManufacturer' ], limit)
		}
		if (type === constants.DEVICES_TYPE_WITH_MODEL) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'deviceManufacturer', 'deviceName' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'deviceManufacturer', 'deviceName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'deviceManufacturer', 'deviceName' ], limit)
		}
	})()

	const enhanceId = (id) => {
		if (type === constants.DEVICES_TYPE_NO_MODEL) return `${ id.deviceManufacturer }`
		if (type === constants.DEVICES_TYPE_WITH_MODEL) return `${ id.deviceManufacturer } ${ id.deviceName }`
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