import stripUrlAuth from './stripUrlAuth.js';
import { day } from './times.js';

const removeLeadingSlash= (str) =>{
	return str.replace(/^\/+/, '');
}

const dbUrl = process.env.ACKEE_MONGODB || process.env.MONGODB_URI
const dbUrlSanitized = dbUrl? stripUrlAuth(dbUrl) :''
// Must be a function or object that loads and returns the env variables at runtime.
// Otherwise it wouldn't be possible to mock the env variables with mockedEnv.
export default new Proxy({}, {
	get: function(target, prop) {
		const data = {
			ttl: process.env.ACKEE_TTL || day,
			port: process.env.ACKEE_PORT || process.env.PORT || 3000,
			dbUrl,
			dbUrlSanitized,
			allowOrigin: process.env.ACKEE_ALLOW_ORIGIN,
			autoOrigin: process.env.ACKEE_AUTO_ORIGIN === 'true',
			username: process.env.ACKEE_USERNAME,
			password: process.env.ACKEE_PASSWORD,
			isDemoMode: process.env.ACKEE_DEMO === 'true',
			isDevelopmentMode: process.env.NODE_ENV === 'development',
			baseUrl: '/' + removeLeadingSlash(process.env.ACKEE_BASEURL || '') ,
		}
		return data[prop]
	},
})