import { v4 as uuid } from 'uuid'
import test from 'ava'
import aggregateRecentRecords from '../../src/aggregations/aggregateRecentRecords.js'


test('return aggregation', (t) => {
	const result = aggregateRecentRecords(uuid(), [ 'osName', 'osVersion' ])

	t.true(Array.isArray(result))
})