import { v4 as uuid } from 'uuid'
import test from 'ava'
import aggregateNewRecords from '../../src/aggregations/aggregateNewRecords.js'


test('return aggregation', (t) => {
	const result = aggregateNewRecords(uuid(), [ 'siteReferrer' ])

	t.true(Array.isArray(result))
})