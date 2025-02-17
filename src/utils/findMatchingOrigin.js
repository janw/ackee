import fullyQualifiedDomainNames from './fullyQualifiedDomainNames.js'

const findOrigin = (request, origins) => {
	return origins.find((origin) => origin.includes(request.headers.origin) || origin.includes(request.headers.host))
}

export const findMatchingOrigin = async (request, allowedOrigins, autoOrigin) => {
	if (autoOrigin === true) {
		const origins = await fullyQualifiedDomainNames()
		return findOrigin(request, origins)
	}

	if (allowedOrigins === '*') return '*'

	if (allowedOrigins != null) {
		const origins = allowedOrigins.split(',')
		return findOrigin(request, origins)
	}
}