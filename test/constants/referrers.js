import test from 'ava'
import referrers from '../../src/constants/referrers.js'


test('is an object', (t) => {
	t.is(typeof referrers, 'object')
})