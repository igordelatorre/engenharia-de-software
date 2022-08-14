import { TableCellBaseProps, TableSortLabel } from '@material-ui/core'
import React from 'react'
import { StyledTableCell } from './style'

type Props = {
	style?: React.CSSProperties
	width?: string
	padding?: 'none' | 'checkbox' | 'default'
	label?: string | React.ReactNode
	component?: React.ElementType<TableCellBaseProps>
	align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
	className?: string
	colSpan?: number
	orderId?: React.Key
	orderBy?: React.Key | React.Key[]
	direction?: 'desc' | 'asc'
	onOrderClick?(orderId?: string | number): void
}

function MaterialUITableHead({
	style,
	width,
	padding,
	label,
	component,
	align,
	className,
	colSpan,
	orderId,
	orderBy,
	direction,
	onOrderClick
}: Props) {
	return (
		<StyledTableCell
			width={width}
			padding={padding}
			component={component}
			colSpan={colSpan}
			className={className}
			align={align}
			style={style}
			sortDirection={orderId && orderBy === orderId ? direction : false}
		>
			{onOrderClick && orderId ? (
				<TableSortLabel
					active={orderBy === orderId}
					direction={orderBy === orderId ? direction : 'asc'}
					onClick={() => onOrderClick(orderId)}
				>
					{label}
				</TableSortLabel>
			) : (
				label
			)}
		</StyledTableCell>
	)
}

export default MaterialUITableHead
