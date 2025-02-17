import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'
import events from '../constants/events.js'


const isKnownType = (value) => [
	events.EVENTS_TYPE_TOTAL_CHART,
	events.EVENTS_TYPE_AVERAGE_CHART,
	events.EVENTS_TYPE_TOTAL_LIST,
	events.EVENTS_TYPE_AVERAGE_LIST,
].includes(value)

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid,
	},
	title: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
		validate: isKnownType,
	},
	created: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updated: {
		type: Date,
		required: true,
		default: Date.now,
	},
})

export default mongoose.model('Event', schema)