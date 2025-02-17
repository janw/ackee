import matchEvents from '../stages/matchEvents.js'

export default (ids, limit) => {
	const aggregation = [
		matchEvents(ids),
		{
			$sort: {
				created: -1,
			},
		},
		{
			$project: {
				_id: {
					key: '$key',
				},
				created: '$created',
			},
		},
		{
			$limit: limit,
		},
	]

	aggregation[0].$match.key = { $ne: null }

	return aggregation
}