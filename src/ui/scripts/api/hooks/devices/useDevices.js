import { gql } from '@apollo/client'
import enhanceDevices from '../../../enhancers/enhanceDevices.js'
import devicesField from '../../fragments/devicesField.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
	query fetchDevices($id: ID!, $sorting: Sorting!, $type: DeviceType!, $range: Range) {
		domain(id: $id) {
			id
			statistics {
				id
				...devicesField
			}
		}
	}

	${ devicesField }
`

export default (id, filters) => {
	const selector = (data) => data?.domain.statistics.devices
	const enhancer = enhanceDevices

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id,
		},
	})
}