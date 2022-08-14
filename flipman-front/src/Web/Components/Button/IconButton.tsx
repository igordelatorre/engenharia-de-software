import React from 'react'
import styled from 'styled-components'

const DefaultButton = styled.button`
	border: none;
	outline: unset;
	padding: 0 1rem;
	line-height: 1.4rem;
	font-size: 1.4rem;
	background: var(--primary-green);
	color: var(--text-over-primary);
	cursor: pointer;

	&[disabled],
	&[disabled]:hover {
		background: var(--secondary-green);
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
function IconButton({ className, disabled, onClick, children }: Props) {
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

export default IconButton
