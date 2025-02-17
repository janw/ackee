import test from 'ava'
import stripUrlAuth from '../../src/utils/stripUrlAuth.js'


test('remove user and password', (t) => {
	const url = 'mongodb://username:password@host:3000/database'
	const result = 'mongodb://host:3000/database'

	t.is(stripUrlAuth(url), result)
})

test('do nothing without username or password', (t) => {
	const url = 'mongodb://host:3000/database'

	t.is(stripUrlAuth(url), url)
})