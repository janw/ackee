import PropTypes from 'prop-types'
import { createElement as h, useCallback, useEffect, useState } from 'react'
import sortings from '../../../../constants/sortings.js'
import rangeLabel from '../../utils/rangeLabel.js'
import relativeDate from '../../utils/relativeDate.js'
import PresentationIconList from '../presentations/PresentationIconList.js'

const textLabel = (item, range, isRecent, isNew) => {
	if (item && item.date) return relativeDate(item.date)
	if (item && item.count) return `${ item.count } ${ item.count === 1 ? 'visit' : 'visits' }`

	if (isRecent) return 'Recent'
	if (isNew) return 'New'

	return rangeLabel(range)
}

const RendererReferrers = (props) => {
	// Index of the active element
	const [ active, setActive ] = useState()

	const onItemEnter = useCallback((index) => setActive(index), [ setActive ])
	const onItemLeave = useCallback(() => setActive(), [ setActive ])

	const label = textLabel(props.items[active], props.range, props.sorting === sortings.SORTINGS_RECENT, props.sorting === sortings.SORTINGS_NEW)
	useEffect(() => props.setStatusLabel(label), [ label ])

	return h(PresentationIconList, {
		items: props.items,
		onItemEnter,
		onItemLeave,
	})
}

RendererReferrers.propTypes = {
	items: PropTypes.array.isRequired,
	sorting: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	setStatusLabel: PropTypes.func.isRequired,
}

export default RendererReferrers