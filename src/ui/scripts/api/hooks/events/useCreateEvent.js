import { gql, useMutation } from '@apollo/client'
import eventFields from '../../fragments/eventFields.js'
import addAndSortModify from '../../utils/addAndSortModify.js'

const MUTATION = gql`
	mutation createEvent($input: CreateEventInput!) {
		createEvent(input: $input) {
			payload {
				...eventFields
			}
		}
	}

	${ eventFields }
`

const update = (cache, result) => {
	const data = result.data.createEvent.payload
	const fragment = eventFields

	cache.modify({
		fields: {
			events: (...args) => {
				const newRef = cache.writeFragment({ data, fragment })
				return addAndSortModify(newRef, 'title')(...args)
			},
		},
	})
}

export default () => {
	const [ mutate, { loading, error }] = useMutation(MUTATION)

	return {
		mutate: (options) => mutate({
			update,
			...options,
		}),
		loading,
		error,
	}
}