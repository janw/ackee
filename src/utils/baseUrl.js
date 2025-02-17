import sanitizeFilename from 'sanitize-filename'

const name = process.env.ACKEE_BASEURL
const exists = name != null && name !== ''

export default {
	exists,
	url: exists === true ? `${ encodeURIComponent(name) }` : '',
	path: exists === true ? `${ sanitizeFilename(name) }` : '',
}
