import Token from '../models/Token.js'

const response = (entry) => ({
	id: entry.id,
	created: entry.created,
	updated: entry.updated,
})

const add = async () => {
	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Token.create({}),
	)
}

const get = async (id) => {
	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Token.findOne({ id }),
	)
}

const update = async (id) => {
	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Token.findOneAndUpdate({
			id,
		}, {
			$set: {
				updated: Date.now(),
			},
		}, {
			new: true,
		}),
	)
}

const del = (id) => {
	return Token.findOneAndDelete({
		id,
	})
}

export default {
	add,
	get,
	update,
	del,
}