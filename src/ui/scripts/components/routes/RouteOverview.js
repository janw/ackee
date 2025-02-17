import PropTypes from 'prop-types'
import { Fragment, createElement as h } from 'react'
import browsers from '../../../../constants/browsers.js'
import devices from '../../../../constants/devices.js'
import intervals from '../../../../constants/intervals.js'
import ranges from '../../../../constants/ranges.js'
import referrers from '../../../../constants/referrers.js'
import sizes from '../../../../constants/sizes.js'
import sortings from '../../../../constants/sortings.js'
import systems from '../../../../constants/systems.js'
import views from '../../../../constants/views.js'
import modals from '../../constants/modals.js'
import useMergedBrowsers from '../../api/hooks/browsers/useMergedBrowsers.js'
import useMergedDevices from '../../api/hooks/devices/useMergedDevices.js'
import useMergedDurations from '../../api/hooks/durations/useMergedDurations.js'
import useMergedActiveVisitors from '../../api/hooks/facts/useMergedActiveVisitors.js'
import useMergedFacts from '../../api/hooks/facts/useMergedFacts.js'
import useMergedLanguages from '../../api/hooks/languages/useMergedLanguages.js'
import useMergedPages from '../../api/hooks/pages/useMergedPages.js'
import useMergedReferrers from '../../api/hooks/referrers/useMergedReferrers.js'
import useMergedSizes from '../../api/hooks/sizes/useMergedSizes.js'
import useMergedSystems from '../../api/hooks/systems/useMergedSystems.js'
import useMergedViews from '../../api/hooks/views/useMergedViews.js'
import CardFacts from '../cards/CardFacts.js'
import CardStatistics from '../cards/CardStatistics.js'
import RendererDurations from '../renderers/RendererDurations.js'
import RendererList from '../renderers/RendererList.js'
import RendererReferrers from '../renderers/RendererReferrers.js'
import RendererViews from '../renderers/RendererViews.js'

const RouteOverview = (props) => {
	useMergedActiveVisitors()

	return (
		h(Fragment, {},
			h(CardFacts, {
				hook: useMergedFacts,
				hookArgs: [],
			}),
			h('div', { className: 'content__spacer' }),
			h(CardStatistics, {
				wide: true,
				headline: 'Views',
				onMore: () => props.setRoute('/insights/views'),
				hook: useMergedViews,
				hookArgs: [
					{
						interval: intervals.INTERVALS_DAILY,
						type: views.VIEWS_TYPE_UNIQUE,
						limit: 14,
					},
				],
				renderer: RendererViews,
				rendererProps: {
					interval: intervals.INTERVALS_DAILY,
					onItemClick: (index) => props.addModal(modals.MODALS_VIEWS, {
						index,
						interval: intervals.INTERVALS_DAILY,
						type: views.VIEWS_TYPE_UNIQUE,
						limit: 14,
					}),
				},
			}),
			h(CardStatistics, {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute('/insights/durations'),
				hook: useMergedDurations,
				hookArgs: [
					{
						interval: intervals.INTERVALS_DAILY,
						limit: 14,
					},
				],
				renderer: RendererDurations,
				rendererProps: {
					interval: intervals.INTERVALS_DAILY,
					onItemClick: (index) => props.addModal(modals.MODALS_DURATIONS, {
						index,
						interval: intervals.INTERVALS_DAILY,
						limit: 14,
					}),
				},
			}),
			h(CardStatistics, {
				headline: 'Pages',
				onMore: () => props.setRoute('/insights/pages'),
				hook: useMergedPages,
				hookArgs: [
					{
						sorting: sortings.SORTINGS_TOP,
						range: ranges.RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: sortings.SORTINGS_TOP,
					range: ranges.RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Referrers',
				onMore: () => props.setRoute('/insights/referrers'),
				hook: useMergedReferrers,
				hookArgs: [
					{
						sorting: sortings.SORTINGS_TOP,
						type: referrers.REFERRERS_TYPE_WITH_SOURCE,
						range: ranges.RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererReferrers,
				rendererProps: {
					sorting: sortings.SORTINGS_TOP,
					range: ranges.RANGES_LAST_24_HOURS,
				},
			}),
			h('div', { className: 'content__spacer' }),
			h(CardStatistics, {
				headline: 'Systems',
				onMore: () => props.setRoute('/insights/systems'),
				hook: useMergedSystems,
				hookArgs: [
					{
						sorting: sortings.SORTINGS_TOP,
						type: systems.SYSTEMS_TYPE_WITH_VERSION,
						range: ranges.RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: sortings.SORTINGS_TOP,
					range: ranges.RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Devices',
				onMore: () => props.setRoute('/insights/devices'),
				hook: useMergedDevices,
				hookArgs: [
					{
						sorting: sortings.SORTINGS_TOP,
						type: devices.DEVICES_TYPE_WITH_MODEL,
						range: ranges.RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: sortings.SORTINGS_TOP,
					range: ranges.RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Browsers',
				onMore: () => props.setRoute('/insights/browsers'),
				hook: useMergedBrowsers,
				hookArgs: [
					{
						sorting: sortings.SORTINGS_TOP,
						type: browsers.BROWSERS_TYPE_WITH_VERSION,
						range: ranges.RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: sortings.SORTINGS_TOP,
					range: ranges.RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Sizes',
				onMore: () => props.setRoute('/insights/sizes'),
				hook: useMergedSizes,
				hookArgs: [
					{
						sorting: sortings.SORTINGS_TOP,
						type: sizes.SIZES_TYPE_BROWSER_RESOLUTION,
						range: ranges.RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: sortings.SORTINGS_TOP,
					range: ranges.RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Languages',
				onMore: () => props.setRoute('/insights/languages'),
				hook: useMergedLanguages,
				hookArgs: [
					{
						sorting: sortings.SORTINGS_TOP,
						range: ranges.RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: sortings.SORTINGS_TOP,
					range: ranges.RANGES_LAST_24_HOURS,
				},
			}),
		)
	)
}

RouteOverview.propTypes = {
	setRoute: PropTypes.func.isRequired,
}

export default RouteOverview