import styled from 'styled-components'
import { color } from '../..//Styles/colors'
import Input from './Input'

type Props = {
	error?: string
	touched?: boolean
	height?: number
	search?: boolean
}

export const CustomInput = styled.input<Props>`
	background: ${color.primary.white};
	border: 1px solid
		${({ error, touched }) =>
			error && touched ? 'var(--error)' : 'var(--input-border)'} !important;
	border-radius: 0.4rem;
	height: ${({ height }) => (height ? `${height}rem` : '4rem')};
	width: 100%;
	padding: 0 1.2rem;
	padding-right: ${({ search }) => search && '30px'};
	outline: none;
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

	:disabled {
		background-color: var(--disabled-background);
		color: ${color.secondary.gray};
	}

	::placeholder {
		color: #bfbfbf;
	}
`

export const InputContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
`

export const SearchContainer = styled.div`
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;
`
