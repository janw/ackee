import { v4 as uuid } from 'uuid'
import test from 'ava'
import aggregateActiveVisitors from '../../src/aggregations/aggregateActiveVisitors.js'
import createDate from '../../src/utils/createDate.js'


test('return aggregation', (t) => {
	const result = aggregateActiveVisitors(uuid(), createDate())

	t.true(Array.isArray(result))
})