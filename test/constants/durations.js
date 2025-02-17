import test from 'ava'
import durations from '../../src/constants/durations.js'


test('is an object', (t) => {
	t.is(typeof durations, 'object')
})