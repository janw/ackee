import test from 'ava'
import browsers from '../../src/constants/browsers.js'


test('is an object', (t) => {
	t.is(typeof browsers, 'object')
})