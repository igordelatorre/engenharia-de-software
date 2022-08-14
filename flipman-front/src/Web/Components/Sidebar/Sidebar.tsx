
import React from 'react'
import { Drawer, HeaderContainer, ChildrenContainer } from './style'
import {IconClose} from '../../Styles/icons'

type Props = {
	isOpen?: boolean
	onClose(): void
	header?: string | JSX.Element
	children?: JSX.Element | JSX.Element[]
	width?: string
	padding?: { mobile: string; desktop: string }
	className?: string
}

export function Sidebar({
	isOpen,
	onClose,
	header,
	children,
	width,
	padding,
	className
}: Props) {


	return (
		<Drawer
			placement="right"
            width={'34%'}
			padding={'6rem'}
			onClose={onClose}
			visible={isOpen}
			closable
			destroyOnClose
			className={className}
			title={<HeaderContainer>{header}</HeaderContainer>}
		>
			<ChildrenContainer style={{'paddingTop': 50}}>{children}</ChildrenContainer>
		</Drawer>
	)
}
