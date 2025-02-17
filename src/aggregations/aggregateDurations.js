import intervals from '../constants/intervals.js'
import matchDomains from '../stages/matchDomains.js'
import matchLimit from '../stages/matchLimit.js'
import projectDuration from '../stages/projectDuration.js'
import projectMinInterval from '../stages/projectMinInterval.js'

export default (ids, interval, limit, dateDetails) => {
	const aggregation = [
		matchDomains(ids),
		projectDuration(),
		projectMinInterval(),
		matchLimit(),
		{
			$group: {
				_id: {},
				count: {
					$avg: '$duration',
				},
			},
		},
	]

	aggregation[0].$match.created = { $gte: dateDetails.includeFnByInterval(interval)(limit) }

	const dateExpression = { date: '$created', timezone: dateDetails.userTimeZone }
	const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
	const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
	const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

	if (matchDay === true) aggregation[4].$group._id.day = { $dayOfMonth: dateExpression }
	if (matchMonth === true) aggregation[4].$group._id.month = { $month: dateExpression }
	if (matchYear === true) aggregation[4].$group._id.year = { $year: dateExpression }

	return aggregation
}