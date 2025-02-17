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
import useBrowsers from '../../api/hooks/browsers/useBrowsers.js'
import useDevices from '../../api/hooks/devices/useDevices.js'
import useDurations from '../../api/hooks/durations/useDurations.js'
import useActiveVisitors from '../../api/hooks/facts/useActiveVisitors.js'
import useFacts from '../../api/hooks/facts/useFacts.js'
import useLanguages from '../../api/hooks/languages/useLanguages.js'
import usePages from '../../api/hooks/pages/usePages.js'
import useReferrers from '../../api/hooks/referrers/useReferrers.js'
import useSizes from '../../api/hooks/sizes/useSizes.js'
import useSystems from '../../api/hooks/systems/useSystems.js'
import useViews from '../../api/hooks/views/useViews.js'
import useRoute from '../../hooks/useRoute.js'
import CardFacts from '../cards/CardFacts.js'
import CardStatistics from '../cards/CardStatistics.js'
import RendererDurations from '../renderers/RendererDurations.js'
import RendererList from '../renderers/RendererList.js'
import RendererReferrers from '../renderers/RendererReferrers.js'
import RendererViews from '../renderers/RendererViews.js'

const RouteDomain = (props) => {
	const currentRoute = useRoute(props.route)
	const domainId = currentRoute.params.domainId

	useActiveVisitors(domainId)

	return (
		h(Fragment, {},
			h(CardFacts, {
				hook: useFacts,
				hookArgs: [
					domainId,
				],
			}),
			h('div', { className: 'content__spacer' }),
			h(CardStatistics, {
				wide: true,
				headline: 'Views',
				onMore: () => props.setRoute('/insights/views'),
				hook: useViews,
				hookArgs: [
					domainId,
					{
						interval: intervals.INTERVALS_DAILY,
						type: views.VIEWS_TYPE_UNIQUE,
						limit: 14,
					},
				],
				renderer: RendererViews,
				rendererProps: {
					interval: intervals.INTERVALS_DAILY,
				},
			}),
			h(CardStatistics, {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute('/insights/durations'),
				hook: useDurations,
				hookArgs: [
					domainId,
					{
						interval: intervals.INTERVALS_DAILY,
						limit: 14,
					},
				],
				renderer: RendererDurations,
				rendererProps: {
					interval: intervals.INTERVALS_DAILY,
				},
			}),
			h(CardStatistics, {
				headline: 'Pages',
				onMore: () => props.setRoute('/insights/pages'),
				hook: usePages,
				hookArgs: [
					domainId,
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
				hook: useReferrers,
				hookArgs: [
					domainId,
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
				hook: useSystems,
				hookArgs: [
					domainId,
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
				hook: useDevices,
				hookArgs: [
					domainId,
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
				hook: useBrowsers,
				hookArgs: [
					domainId,
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
				hook: useSizes,
				hookArgs: [
					domainId,
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
				hook: useLanguages,
				hookArgs: [
					domainId,
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

RouteDomain.propTypes = {
	route: PropTypes.string.isRequired,
	setRoute: PropTypes.func.isRequired,
}

export default RouteDomain