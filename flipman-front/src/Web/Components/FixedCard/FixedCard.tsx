import React from 'react'
import { CardTitle } from './style'
import { Card } from 'antd'

type Props = {
	header?: JSX.Element | string
	children: JSX.Element | JSX.Element[]
	className?: string
}

function FixedCard({ header, children, className }: Props) {
	return (
		<Card className={className}>
			{header ? <CardTitle>{header}</CardTitle> : null}
			{children}
		</Card>
	)
}

export default FixedCard
