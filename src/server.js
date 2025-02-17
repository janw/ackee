import http from 'node:http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import config from './utils/config.js';
import createApolloServer from './utils/createApolloServer.js';
import { createExpressContext } from './utils/createContext.js';
import KnownError from './utils/KnownError.js';
import log from './utils/log.js';

// Const handleMicroError = (error, response) => {
// 	// This part is for micro errors and errors outside of GraphQL.
// 	// Most errors won't be caught here, but some error can still
// 	// happen outside of GraphQL. In this case we distinguish
// 	// between unknown errors and known errors. Known errors are
// 	// created with the createError function while unknown errors
// 	// are simply errors thrown somewhere in the application.

// 	const isUnknownError = error.statusCode == null
// 	const hasOriginalError = error.originalError != null

// 	// Only log the full error stack when the error isn't a known response
// 	if (isUnknownError === true) {
// 		log.fatal(error)
// 		return send(response, 500, error.message)
// 	}

// 	log.warn(hasOriginalError === true ? error.originalError.message : error.message)
// 	send(response, error.statusCode, error.message)
// }

const handleGraphError = (error) => {
	// This part is for error that happen inside GraphQL resolvers.
	// All known errors should be thrown as a KnownError as those
	// errors will only show up in the response and as a warning
	// in the console output.

	const suitableError = error.originalError || error
	const isKnownError = suitableError instanceof KnownError

	// Only log the full error stack when the error isn't a known response
	if (isKnownError === false) {
		log.fatal(suitableError)
		return error
	}

	log.warn(suitableError.message)
	return error
}

// Const catchError = (fn) => async (request, response) => {
// 	try {
// 		return await fn(request, response)
// 	} catch (error) {
// 		handleMicroError(error, response)
// 	}
// }

// const attachCorsHeaders = (fn) => async (request, response) => {
// 	const matchingOrigin = await findMatchingOrigin(request, config.allowOrigin, config.autoOrigin)

// 	if (matchingOrigin != null) {
// 		response.setHeader('Access-Control-Allow-Origin', matchingOrigin)
// 		response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
// 		response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Time-Zone')
// 		response.setHeader('Access-Control-Allow-Credentials', 'true')
// 		response.setHeader('Access-Control-Max-Age', '3600')
// 	}

// 	return fn(request, response)
// }

// const awaitedHandler = (fn) => async (request, response) => {
// 	return (await fn)(request, response)
// }

// const notFound = (request) => {
// 	const error = new Error(`\`${ request.url }\` not found`)

// 	throw createError(404, 'Not found', error)
// }

const app = express()
const router = express()
app.use(config.baseUrl, router)
const httpServer = http.createServer(app);
const apolloServer = createApolloServer(ApolloServer, httpServer, {
	formatError: handleGraphError,
	context: createExpressContext,
})

await apolloServer.start()

router.use(
	'/api',
	cors,
	express.json(),
	expressMiddleware(apolloServer),
)
router.use(express.static('dist'))

export default app