import { v4 as uuid } from 'uuid'
import test from 'ava'
import messages from '../../src/utils/messages.js'


test('extract messages from an object with errors', (t) => {
	const message = uuid()
	const errors = { 0: new Error(message) }

	const result = messages(errors)

	t.is(result, message)
})

test('remove dot at the end of message', (t) => {
	const message = uuid()
	const errors = { 0: new Error(`${ message }.`) }

	const result = messages(errors)

	t.is(result, message)
})