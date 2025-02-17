import test from 'ava'
import pino from 'pino'
import log from '../../src/utils/log.js'


test('is a Pino instance', (t) => {
	t.true(log instanceof pino.pino)
})