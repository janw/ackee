import { setContext } from '@apollo/client/link/context'
import { get as getToken } from '../../hooks/useToken.js'


export default () => {
	return setContext((request, { headers }) => {
		const token = getToken()

		return {
			headers: {
				...headers,
				Authorization: `Bearer ${ token }`,
			},
		}
	})
}