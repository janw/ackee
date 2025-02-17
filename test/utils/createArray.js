import test from 'ava'
import createArray from '../../src/utils/createArray.js'


test('return boolean', (t) => {
	const length = 4
	const result = createArray(length)

	t.true(Array.isArray(result))
	t.is(result.length, length)
})