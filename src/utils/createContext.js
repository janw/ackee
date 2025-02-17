import config from './config.js'
import createDate from './createDate.js'
import ignoreCookie from './ignoreCookie.js'
import isAuthenticated from './isAuthenticated.js'

const createContext = async (ip, headers) => {
	return {
		isDemoMode: config.isDemoMode,
		isAuthenticated: await isAuthenticated(headers['authorization'], config.ttl),
		isIgnored: ignoreCookie.isSet(headers['cookie']),
		dateDetails: createDate(headers['time-zone']),
		userAgent: headers['user-agent'],
		ip,
		// Variables used by apollo-server-plugin-http-headers
		// See: https://github.com/b2a3e8/apollo-server-plugin-http-headers
		setCookies: [],
		setHeaders: [],
	}
}

export const createServerlessContext = (integrationContext) => {
	return createContext(integrationContext.event.headers['client-ip'], integrationContext.event.headers)
}

export const createExpressContext = (integrationContext) => {
	const req = integrationContext.req
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	return createContext(ip, req.headers)
}
