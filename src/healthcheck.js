#!/usr/bin/env node

import 'dotenv/config'
import fetch from 'node-fetch'
import config from './utils/config.js'
import checkMongoDB from './utils/connect.js'
import log from './utils/log.js'


if (config.dbUrl == null) {
	log.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

const checkServer = async (url) => {
	const response = await fetch(url)

	if (response.ok === false) {
		throw new Error(`Server is unhealthy and returned with the status '${ response.status }'`)
	}
}

const checkApi = async (url) => {
	const response = await fetch(url)

	if (response.ok === false) {
		throw new Error(`API is unhealthy and returned with the status '${ response.status }'`)
	}
}

const exit = (healthy) => process.exit(healthy === true ? 0 : 1)

const check = () => Promise.all([
	checkMongoDB(config.dbUrl),
	checkServer(`http://localhost:${ config.port }${ config.baseUrl }/`),
	checkApi(`http://localhost:${ config.port }${ config.baseUrl }/.well-known/apollo/server-health`),
])

const handleSuccess = () => {
	log.success('Ackee is up and running')
	exit(true)
}

const handleFailure = (error) => {
	log.fatal(error)
	exit(false)
}

check()
	.then(handleSuccess)
	.catch(handleFailure)