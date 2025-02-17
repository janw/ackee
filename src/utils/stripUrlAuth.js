import normalizeUrl from 'normalize-url';

export default (url) => normalizeUrl(url, {
	normalizeProtocol: false,
	stripWWW: false,
	removeTrailingSlash: false,
	sortQueryParameters: false,
	stripAuthentication: true,
})