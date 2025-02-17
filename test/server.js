import fetch from 'node-fetch'
import { v4 as uuid } from 'uuid'
import server from '../src/server.js'

import test from 'ava'


import listen from 'test-listen'


const base = listen(server)

test('return 404', async (t) => {
	const url = new URL(`/${ uuid() }`, await base)
	const { status } = await fetch(url.href)

	t.is(status, 404)
})

test('return production styles', async (t) => {
	const url = new URL('/index.css', await base)
	const response = await fetch(url.href)
	const content = await response.text()

	t.is(typeof content, 'string')
	t.false(content.includes('sourceMappingURL'))
})

test('return production scripts', async (t) => {
	const url = new URL('/index.js', await base)
	const response = await fetch(url.href)
	const content = await response.text()

	t.is(typeof content, 'string')
	t.false(content.includes('sourceMappingURL'))
})

test('return tracker', async (t) => {
	const url = new URL('/tracker.js', await base)
	const response = await fetch(url.href)
	const content = await response.text()

	t.is(typeof content, 'string')
	t.false(content.includes('sourceMappingURL'))
})

test('return favicon', async (t) => {
	const url = new URL('/favicon.ico', await base)
	const { status } = await fetch(url.href)

	t.is(status, 200)
})