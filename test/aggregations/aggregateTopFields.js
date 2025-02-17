import { v4 as uuid } from 'uuid'
import test from 'ava'
import aggregateTopRecords from '../../src/aggregations/aggregateTopRecords.js'
import createDate from '../../src/utils/createDate.js'


test('return aggregation', (t) => {
	const result = aggregateTopRecords(uuid(), [ 'osName', 'osVersion' ], createDate())

	t.true(Array.isArray(result))
})