import PropTypes from 'prop-types'
import { createElement as h } from 'react'
import views from '../../../../constants/views.js'
import CurrentStatus from '../CurrentStatus.js'
import Headline from '../Headline.js'
import PresentationCounterList from '../presentations/PresentationCounterList.js'
import Text from '../Text.js'
import useCombinedViews from '../../api/hooks/views/useCombinedViews.js'
import commonModalProps from '../../utils/commonModalProps.js'
import formatCount from '../../utils/formatCount.js'
import relativeFn from '../../utils/relativeFn.js'

const ModalViews = (props) => {
	const { value, status } = useCombinedViews({
		interval: props.interval,
		type: props.type,
		limit: props.limit,
	})

	const headline = ({
		[views.VIEWS_TYPE_UNIQUE]: 'Site Views',
		[views.VIEWS_TYPE_TOTAL]: 'Page Views',
	})[props.type]

	return (
		h('div', { className: 'card' },
			h('div', { className: 'card__inner' },

				h(Headline, {
					type: 'h2',
					size: 'medium',
				}, headline),
				h(Text, {
					type: 'div',
					spacing: false,
				},
					h(CurrentStatus, status, relativeFn(props.interval)(props.index)),
				),
				h(PresentationCounterList, {
					items: value[props.index],
					formatter: formatCount,
				}),

			),
			h('div', { className: 'card__footer' },

				h('button', {
					type: 'button',
					className: 'card__button card__button--primary link',
					onClick: props.closeModal,
				}, 'Close'),

			),
		)
	)
}

ModalViews.propTypes = {
	...commonModalProps,
	index: PropTypes.number.isRequired,
	interval: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
}

export default ModalViews