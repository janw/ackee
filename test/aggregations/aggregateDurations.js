import { v4 as uuid } from 'uuid'
import test from 'ava'
import aggregateDurations from '../../src/aggregations/aggregateDurations.js'
import intervals from '../../src/constants/intervals.js'
import createDate from '../../src/utils/createDate.js'


test('return aggregation', (t) => {
	const result = aggregateDurations(uuid(), intervals.INTERVALS_DAILY, 14, createDate())

	t.true(Array.isArray(result))
})