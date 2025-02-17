import intervals from '../constants/intervals.js'
import viewsType from '../constants/views.js'
import durations from '../database/durations.js'
import facts from '../database/facts.js'
import views from '../database/views.js'
import requireAuth from '../middlewares/requireAuth.js'
import domainIds from '../utils/domainIds.js'
import pipe from '../utils/pipe.js'
import recursiveId from '../utils/recursiveId.js'

export default {
	AverageViews: {
		count: pipe(requireAuth, (entries) => {
			const totalCount = entries.slice(1, 15).reduce((acc, entry) => acc + entry.count, 0)

			return Math.round(totalCount / 14)
		}),
		change: pipe(requireAuth, (entries) => {
			const totalCountCurrent = entries.slice(1, 8).reduce((acc, entry) => acc + entry.count, 0)
			const totalCountPrevious = entries.slice(8, 15).reduce((acc, entry) => acc + entry.count, 0)
			const totalDifference = totalCountCurrent - totalCountPrevious

			if (totalCountPrevious === 0) return

			return Math.min(Math.max(Math.round(totalDifference / totalCountPrevious * 100), -100), 100)
		}),
	},
	AverageDuration: {
		count: pipe(requireAuth, (entries) => {
			const totalCount = entries.slice(1, 15).reduce((acc, entry) => acc + entry.count, 0)

			return Math.round(totalCount / 14)
		}),
		change: pipe(requireAuth, (entries) => {
			const totalCountCurrent = entries.slice(1, 8).reduce((acc, entry) => acc + entry.count, 0)
			const totalCountPrevious = entries.slice(8, 15).reduce((acc, entry) => acc + entry.count, 0)
			const totalDifference = totalCountCurrent - totalCountPrevious

			if (totalCountPrevious === 0) return

			return Math.min(Math.max(Math.round(totalDifference / totalCountPrevious * 100), -100), 100)
		}),
	},
	Facts: {
		id: pipe(requireAuth, async (domain) => {
			const ids = await domainIds(domain)

			// Provide a static fallback id when there're domains to create a recursive id from
			if (ids.length === 0) return '882b8e8a-f30b-414d-85e1-00d8ed5585a6'

			return recursiveId(ids)
		}),
		activeVisitors: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const activeVisitors = await facts.getActiveVisitors(ids, dateDetails)

			return activeVisitors
		}),
		averageViews: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const entries = views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, 15, dateDetails)

			return entries
		}),
		averageDuration: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const entries = durations.get(ids, intervals.INTERVALS_DAILY, 15, dateDetails)

			return entries
		}),
		viewsToday: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, 1, dateDetails)

			return entries[0].count
		}),
		viewsMonth: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_MONTHLY, 1, dateDetails)

			return entries[0].count
		}),
		viewsYear: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_YEARLY, 1, dateDetails)

			return entries[0].count
		}),
	},
	Query: {
		facts: () => ({}),
	},
}