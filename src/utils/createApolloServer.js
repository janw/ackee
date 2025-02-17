import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import {
	DateTimeResolver,
	DateTimeTypeDefinition,
	PositiveFloatResolver,
	PositiveFloatTypeDefinition,
	UnsignedIntResolver,
	UnsignedIntTypeDefinition,
} from 'graphql-scalars';
import resolvers from '../resolvers/index.js';
import types from '../types/index.js';
import config from './config.js';

export default (ApolloServer, httpServer, options) => new ApolloServer({
	introspection: config.isDemoMode === true || config.isDevelopmentMode === true,
	playground: config.isDemoMode === true || config.isDevelopmentMode === true,
	debug: config.isDevelopmentMode === true,
	plugins: [
		new ApolloServerPluginDrainHttpServer({httpServer}),
		// HttpHeadersPlugin,  // FIXME: re-add
		(config.isDemoMode === true || config.isDevelopmentMode === true) ?
			new ApolloServerPluginLandingPageLocalDefault() :
			new ApolloServerPluginLandingPageProductionDefault(),
	],
	typeDefs: [
		UnsignedIntTypeDefinition,
		DateTimeTypeDefinition,
		PositiveFloatTypeDefinition,
		types,
	],
	resolvers: {
		UnsignedInt: UnsignedIntResolver,
		DateTime: DateTimeResolver,
		PositiveFloat: PositiveFloatResolver,
		...resolvers,
	},
	...options,
})