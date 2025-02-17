import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import js from 'rosid-handler-js-next';
import sass from 'rosid-handler-sass';
import baseUrl from '../utils/baseUrl.js';
import layout from '../utils/layout.js';
import log from '../utils/log.js';

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;

const DEVELOPMENT = process.env.NODE_ENV === 'development'

export const index = () => {
	return layout('<div id="main"></div>', 'favicon.ico', [ 'index.css' ], [ 'index.js' ], {
		isDemoMode: false,
		baseUrl,
	})
}

export const styles = () => {
	const filePath = resolve(__dirname, './styles/index.scss')

	return sass(filePath, { optimize: !DEVELOPMENT})
}

export const scripts = () => {
	const filePath = resolve(__dirname, './scripts/index.js')

	return js(filePath, {
		optimize: !DEVELOPMENT,
		nodeGlobals: DEVELOPMENT,
		replace: { 'process.env.NODE_ENV': process.env.NODE_ENV },
		babel: false,
	})
}

export const tracker = () => {
	const filePath = require.resolve('ackee-tracker')

	return readFile(filePath, 'utf8')
}

export const build = async (path, fn) => {
	try {
		log.info(`Building and writing '${ path }'`)
		const data = await fn()
		await writeFile(path, data)
		log.info(`Finished building '${ path }'`)
	} catch (error) {
		log.fatal(error)
		process.exit(1)
	}
}
