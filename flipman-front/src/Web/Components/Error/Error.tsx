import React from 'react'
import { ErrorLabel } from './styled'

type Props = {
	touched?: boolean
	error?: string
	style?: React.CSSProperties
}

function Error({ error, touched, style }: Props) {
	if (error && touched) return <ErrorLabel style={style}>{error}</ErrorLabel>
	return null
}

export default Error
