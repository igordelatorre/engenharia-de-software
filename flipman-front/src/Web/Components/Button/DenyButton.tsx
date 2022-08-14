import React from 'react'
import styled from 'styled-components'
import { color } from '../../Styles/colors'

const DefaultButton = styled.button`
	border: none;
	outline: unset;
	min-width: 12rem;
	padding: 0 2rem;
	line-height: 1.4rem;
	font-size: 1.4rem;
	background: ${color.secondary.red};
	color: var(--text-over-primary);
	cursor: pointer;

	&[disabled],
	&[disabled]:hover {
		background: var(--disabled-button);
		color: var(--text-over-primary);
		cursor: default;
	}
`
const elementStyle = {
	fontFamily: 'Montserrat',
	borderRadius: '4px',
	height: '3.6rem'
}
type Props = {
	className?: string
	disabled?: boolean
	onClick(): void
	children: JSX.Element
}
function DenyButton({ className, disabled, onClick, children }: Props) {
	return (
		<DefaultButton
			className={className}
			onClick={onClick}
			disabled={disabled}
			style={elementStyle}
		>
			{children}
		</DefaultButton>
	)
}

export default DenyButton
