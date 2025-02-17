import PropTypes from 'prop-types'
import { createElement as h } from 'react'
import CurrentStatus from '../CurrentStatus.js'
import Headline from '../Headline.js'
import PresentationCounterList from '../presentations/PresentationCounterList.js'
import Text from '../Text.js'
import useCombinedDurations from '../../api/hooks/durations/useCombinedDurations.js'
import commonModalProps from '../../utils/commonModalProps.js'
import formatDuration from '../../utils/formatDuration.js'
import relativeFn from '../../utils/relativeFn.js'

const ModalDurations = (props) => {
	const { value, status } = useCombinedDurations({
		interval: props.interval,
		limit: props.limit,
	})

	return (
		h('div', { className: 'card' },
			h('div', { className: 'card__inner' },

				h(Headline, {
					type: 'h2',
					size: 'medium',
				}, 'Durations'),
				h(Text, {
					type: 'div',
					spacing: false,
				},
					h(CurrentStatus, status, relativeFn(props.interval)(props.index)),
				),
				h(PresentationCounterList, {
					items: value[props.index],
					formatter: formatDuration,
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

ModalDurations.propTypes = {
	...commonModalProps,
	index: PropTypes.number.isRequired,
	interval: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
}

export default ModalDurations