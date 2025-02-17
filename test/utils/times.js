import test from 'ava';
import { day, hour, minute, second } from '../../src/utils/times.js';


test('return one second in milliseconds', (t) => {
	t.is(second, 1000)
})

test('return one minute in milliseconds', (t) => {
	t.is(minute, 60000)
})

test('return one hour in milliseconds', (t) => {
	t.is(hour, 3600000)
})

test('return one day in milliseconds', (t) => {
	t.is(day, 86400000)
})