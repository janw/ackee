#!/usr/bin/env node

import 'dotenv/config'
import app from './server.js'
import config from './utils/config.js'
import connect from './utils/connect.js'
import log from './utils/log.js'

if (config.dbUrl == null) {
	log.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

try {
	log.info(`Connecting to ${config.stripUrlAuth}`)
	await connect(config.dbUrl)

	log.info(`Starting the server`)
	const server = app.listen(config.port)
	log.info(`Listening on http://localhost:${config.port}${config.baseUrl}`)

	const close = () => {
		log.info('Terminating server')
		server.close(() => {
			log.info('Done')
			process.exit(0)
		})
	}

	process.on('SIGTERM', close)
	process.on('SIGINT', close)
} catch (error) {
	log.fatal(error)
	process.exit(1)
}


if (config.isDevelopmentMode === true) {
	log.info('Development mode enabled')
}

if (config.isDemoMode === true) {
	log.info('Demo mode enabled')
}
