import { gql, useMutation } from '@apollo/client'
import permanentTokenFields from '../../fragments/permanentTokenFields.js'
import addAndSortModify from '../../utils/addAndSortModify.js'

const MUTATION = gql`
	mutation createPermanentToken($input: CreatePermanentTokenInput!) {
		createPermanentToken(input: $input) {
			payload {
				...permanentTokenFields
			}
		}
	}

	${ permanentTokenFields }
`

const update = (cache, result) => {
	const data = result.data.createPermanentToken.payload
	const fragment = permanentTokenFields

	cache.modify({
		fields: {
			permanentTokens: (...args) => {
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