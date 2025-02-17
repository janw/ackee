import test from 'ava'
import salt from '../../src/utils/salt.js'


test('return same result as long as it is the same day', (t) => {
	const a = salt()
	const b = salt()

	t.is(a, b)
})