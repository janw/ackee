import { createElement as h } from 'react'
import Input from '../Input.js'
import Label from '../Label.js'
import Spacer from '../Spacer.js'
import Spinner from '../Spinner.js'
import useCreatePermanentToken from '../../api/hooks/permanentTokens/useCreatePermanentToken.js'
import useInputs from '../../hooks/useInputs.js'
import commonModalProps from '../../utils/commonModalProps.js'
import shortId from '../../utils/shortId.js'

const ModalPermanentTokenAdd = (props) => {
	const createPermanentToken = useCreatePermanentToken()

	const loading = createPermanentToken.loading === true

	const [ inputs, onInputChange ] = useInputs({
		title: '',
	})

	const onSubmit = async (e) => {
		e.preventDefault()
		await createPermanentToken.mutate({
			variables: {
				input: inputs,
			},
		})
		props.closeModal()
	}

	const titleId = shortId()

	return (
		h('form', { className: 'card', onSubmit },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Permanent token title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					disabled: loading === true,
					focused: true,
					placeholder: 'Permanent token title',
					value: inputs.title,
					onChange: onInputChange('title'),
				}),

			),
			h('div', { className: 'card__footer' },

				h('button', {
					type: 'button',
					className: 'card__button link',
					onClick: props.closeModal,
				}, 'Close'),

				h('div', {
					className: 'card__separator ',
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: loading === true,
				}, loading === true ? h(Spinner) : 'Add'),

			),
		)
	)
}

ModalPermanentTokenAdd.propTypes = {
	...commonModalProps,
}

export default ModalPermanentTokenAdd