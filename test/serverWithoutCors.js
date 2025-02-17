import fetch from 'node-fetch'
import server from '../src/server.js'

import test from 'ava'
import mockedEnv from 'mocked-env'
import listen from 'test-listen'


const base = listen(server)

test('return no cors headers if env var specifies none', async (t) => {
	const url = new URL('/api', await base)

	const restore = mockedEnv({
		ACKEE_ALLOW_ORIGIN: undefined,
	})

	const { headers } = await fetch(url.href)

	t.is(headers.get('Access-Control-Allow-Origin'), null)
	t.is(headers.get('Access-Control-Allow-Methods'), null)
	t.is(headers.get('Access-Control-Allow-Headers'), null)
	t.is(headers.get('Access-Control-Allow-Credentials'), null)
	t.is(headers.get('Access-Control-Max-Age'), null)

	restore()
})