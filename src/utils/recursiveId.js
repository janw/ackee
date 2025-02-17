import { v5 as uuid } from 'uuid'


// Randomly generated UUID that should never change
const DEFAULT_NAMESPACE = 'faea8d75-e9c5-45fe-a436-4a906d44b88e'

const recursiveId = (ids) => {
	const [ current, ...rest ] = ids
	return uuid(current, rest.length === 0 ? DEFAULT_NAMESPACE : recursiveId(rest))
}

export default recursiveId