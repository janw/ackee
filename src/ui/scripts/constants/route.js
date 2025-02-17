import RouteBrowsers from '../components/routes/RouteBrowsers.js'
import RouteDevices from '../components/routes/RouteDevices.js'
import RouteDomain from '../components/routes/RouteDomain.js'
import RouteDurations from '../components/routes/RouteDurations.js'
import RouteEvents from '../components/routes/RouteEvents.js'
import RouteLanguages from '../components/routes/RouteLanguages.js'
import RouteOverview from '../components/routes/RouteOverview.js'
import RoutePages from '../components/routes/RoutePages.js'
import RouteReferrers from '../components/routes/RouteReferrers.js'
import RouteSettings from '../components/routes/RouteSettings.js'
import RouteSizes from '../components/routes/RouteSizes.js'
import RouteSystems from '../components/routes/RouteSystems.js'
import RouteViews from '../components/routes/RouteViews.js'

export const ROUTE_OVERVIEW = { key: 'route_overview', title: 'Overview', component: RouteOverview }
export const ROUTE_DOMAIN = { key: 'route_domain', title: 'Domains', component: RouteDomain }
export const ROUTE_VIEWS = { key: 'route_views', title: 'Views', component: RouteViews }
export const ROUTE_PAGES = { key: 'route_pages', title: 'Pages', component: RoutePages }
export const ROUTE_REFERRERS = { key: 'route_referrers', title: 'Referrers', component: RouteReferrers }
export const ROUTE_DURATIONS = { key: 'route_durations', title: 'Durations', component: RouteDurations }
export const ROUTE_LANGUAGES = { key: 'route_languages', title: 'Languages', component: RouteLanguages }
export const ROUTE_SIZES = { key: 'route_sizes', title: 'Sizes', component: RouteSizes }
export const ROUTE_SYSTEMS = { key: 'route_systems', title: 'Systems', component: RouteSystems }
export const ROUTE_DEVICES = { key: 'route_devices', title: 'Devices', component: RouteDevices }
export const ROUTE_BROWSERS = { key: 'route_browsers', title: 'Browsers', component: RouteBrowsers }
export const ROUTE_EVENTS = { key: 'route_events', title: 'Events', component: RouteEvents }
export const ROUTE_SETTINGS = { key: 'route_settings', title: 'Settings', component: RouteSettings }