import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'

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

export default mongoose.model('Domain', schema)