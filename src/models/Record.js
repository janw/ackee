import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';


const isUrl = (string) => {
	try {
		new URL(string);
		return true;
	} catch (error) {
		return false;
	}
}

const isNullOrUrl = (value) => value == null || isUrl(value)

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid,
	},
	clientId: {
		type: String,
		index: true,
	},
	domainId: {
		type: String,
		required: true,
		index: true,
	},
	siteLocation: {
		type: String,
		required: true,
		validate: isUrl,
	},
	siteReferrer: {
		type: String,
		validate: isNullOrUrl,
	},
	siteLanguage: {
		type: String,
		minlength: 2,
		maxlength: 2,
	},
	source: {
		type: String,
	},
	screenWidth: {
		type: Number,
		min: 0,
		max: 100000,
	},
	screenHeight: {
		type: Number,
		min: 0,
		max: 100000,
	},
	screenColorDepth: {
		type: Number,
		min: 1,
		max: 48,
	},
	deviceName: {
		type: String,
	},
	deviceManufacturer: {
		type: String,
	},
	osName: {
		type: String,
	},
	osVersion: {
		type: String,
	},
	browserName: {
		type: String,
	},
	browserVersion: {
		type: String,
	},
	browserWidth: {
		type: Number,
		min: 0,
		max: 100000,
	},
	browserHeight: {
		type: Number,
		min: 0,
		max: 100000,
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

export default mongoose.model('Record', schema)