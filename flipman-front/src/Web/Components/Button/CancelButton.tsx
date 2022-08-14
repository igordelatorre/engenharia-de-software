import React from 'react'
import styled from 'styled-components'

const DefaultButton = styled.button`
	outline: unset;
	min-width: 12rem;
	padding: 0 2rem;
	line-height: 1.4rem;
	font-size: 1.4rem;
	cursor: pointer;
	border: 1px solid var(--primary-blue);
	color: var(--primary-blue);
	background: white;

	&[disabled],
	&[disabled]:hover {
		color: var(--disabled-button);
		border: 1px solid var(--disabled-button);
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
	children: string
}

function CancelButton({ className, disabled, onClick, children }: Props) {
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

export default CancelButton
