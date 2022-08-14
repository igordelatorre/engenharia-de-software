import React from 'react'
import styled from 'styled-components'

const DefaultButton = styled.button`
	border: none;
	outline: unset;
	min-width: 12rem;
	padding: 0 2rem;
	font-size: 1.5rem;
	background: var(--tertiary-darker-gray);
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
	fontWeight: 500,
	borderRadius: '4px',
	height: '3.6rem'
}
type Props = {
	className?: string
	disabled?: boolean
	onClick(): void
	children: string
	elStyle?: React.CSSProperties
}
function ConfirmButton({
	className,
	disabled,
	onClick,
	children,
	elStyle
}: Props) {
	const stylePass = elStyle == null ? elementStyle : elStyle

	return (
		<DefaultButton
			className={className}
			onClick={onClick}
			disabled={disabled}
			style={stylePass}
		>
			{children}
		</DefaultButton>
	)
}

export default ConfirmButton
