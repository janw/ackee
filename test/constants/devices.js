import test from 'ava'
import devices from '../../src/constants/devices.js'


test('is an object', (t) => {
	t.is(typeof devices, 'object')
})