import test from 'ava'
import sortings from '../../src/constants/sortings.js'


test('is an object', (t) => {
	t.is(typeof sortings, 'object')
})