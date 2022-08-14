import { TableCellProps } from '@material-ui/core'
import React from 'react'
import { StyledStickyTableCell, StyledTableCell } from './style'

type Props = {
	value?: string
} & TableCellProps

function MaterialUITableCell(props: Props) {
	return (
		<StyledTableCell {...props}>
			{props.value || props.children}
		</StyledTableCell>
	)
}

export default MaterialUITableCell

export function MaterialUITableStickyCell(props: Props) {
	return (
		<StyledStickyTableCell {...props}>
			{props.value || props.children}
		</StyledStickyTableCell>
	)
}
