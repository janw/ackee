import test from 'ava'
import sizes from '../../src/constants/sizes.js'


test('is an object', (t) => {
	t.is(typeof sizes, 'object')
})