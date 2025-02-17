import views from '../../src/constants/views.js'

const test = require('ava')


test('is an object', (t) => {
	t.is(typeof views, 'object')
})