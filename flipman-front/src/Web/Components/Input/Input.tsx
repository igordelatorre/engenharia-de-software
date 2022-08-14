import React from 'react'
import Error from '../Error/Error'
import { CustomInput, InputContainer, SearchContainer } from './style'
import { IconSearch } from '../../Styles/icons'

type Props = {
	value?: string
	onChange?:
		| ((value?: string) => void)
		| React.Dispatch<React.SetStateAction<string>>
	placeholder?: string
	disabled?: boolean
	touched?: boolean
	error?: string
	className?: string
	search?: boolean
	type?: 'number'
	maxLength?: number
	height?: number
	name?: string
}

function Input({
	value,
	onChange,
	placeholder,
	touched,
	error,
	className,
	search,
	type,
	maxLength,
	height,
	disabled,
	name
}: Props) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(e.target.value || '')
	}

	return (
		<>
			<InputContainer className={className}>
				<CustomInput
					placeholder={placeholder}
					touched={touched}
					error={error}
					className={className}
					type={type}
					maxLength={maxLength}
					onChange={handleChange}
					value={value || ''}
					height={height}
					disabled={disabled}
					search={search}
					name={name}
				/>
				{search ? (
					<SearchContainer>
						<IconSearch />
					</SearchContainer>
				) : null}
				<Error touched={touched} error={error} />
			</InputContainer>
		</>
	)
}

export default Input
