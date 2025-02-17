import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid,
	},
	eventId: {
		type: String,
		required: true,
		index: true,
	},
	key: {
		type: String,
	},
	value: {
		type: Number,
		required: true,
	},
	details: {
		type: String,
	},
	created: {
		type: Date,
		required: true,
		index: true,
		default: Date.now,
	},
	updated: {
		type: Date,
		required: true,
		index: true,
		default: Date.now,
	},
})

export default mongoose.model('Action', schema)