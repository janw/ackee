import test from 'ava';
import { v4 as uuid } from 'uuid';
import aggregateViews from '../../src/aggregations/aggregateViews.js';
import intervals from '../../src/constants/intervals.js';
import createDate from '../../src/utils/createDate.js';

test('return unique aggregation', (t) => {
	const result = aggregateViews(uuid(), true, intervals.INTERVALS_DAILY, 14, createDate())

	t.true(Array.isArray(result))
})

test('return non-unique aggregation', (t) => {
	const result = aggregateViews(uuid(), false, intervals.INTERVALS_DAILY, 14, createDate())

	t.true(Array.isArray(result))
})