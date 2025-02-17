import PropTypes from 'prop-types'
import { createElement as h } from 'react'
import Loader from './Loader.js'
import Updater from './Updater.js'


export const ICON_LOADER = Loader
export const ICON_UPDATER = Updater

const Status = (props) => {
	return (
		h('div', { className: 'status' },
			props.icon != null && h(props.icon, {}),
			props.children,
		)
	)
}

Status.propTypes = {
	icon: PropTypes.oneOf([ ICON_LOADER, ICON_UPDATER ]),
	children: PropTypes.node.isRequired,
}

export default Status