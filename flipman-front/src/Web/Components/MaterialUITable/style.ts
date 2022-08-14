import { createStyles, Paper, TableCell, withStyles } from '@material-ui/core'
import styled from 'styled-components'
import { color } from '../../Styles/colors'

export const StyledTableCell = withStyles(() =>
	createStyles({
		head: {
			color: 'var(--tertiary-darker-gray)',
			fontFamily: 'Noto Sans',
			fontSize: '1.2rem',
			fontWeight: 700,
			'& .MuiTableSortLabel-root.MuiTableSortLabel-active': {
				color: 'var(--tertiary-darker-gray)',
				'&.MuiTableSortLabel-root.MuiTableSortLabel-active  .MuiTableSortLabel-icon': {
					color: 'var(--tertiary-darker-gray)'
				}
			}
		},
		body: {
			fontFamily: 'Noto Sans',
			fontSize: '1.3rem',
			fontWeight: 400,
			color: color.primary.darkGray,
			height: '6rem'
		}
	})
)(TableCell)

export const StyledStickyTableCell = withStyles(() =>
	createStyles({
		head: {
			color: 'var(--tertiary-darker-gray)',
			fontFamily: 'Noto Sans',
			fontSize: '1.2rem',
			fontWeight: 700,
			'& .MuiTableSortLabel-root.MuiTableSortLabel-active': {
				color: 'var(--tertiary-darker-gray)',
				'&.MuiTableSortLabel-root.MuiTableSortLabel-active  .MuiTableSortLabel-icon': {
					color: 'var(--tertiary-darker-gray)'
				}
			},
			position: 'sticky',
			left: 0,
			zIndex: 2,
			background: '#fff'
		},
		body: {
			fontFamily: 'Noto Sans',
			fontSize: '1.3rem',
			fontWeight: 400,
			color: color.primary.darkGray,
			height: '6rem',
			position: 'sticky',
			left: 0,
			zIndex: 2,
			background: '#fff'
		}
	})
)(TableCell)

export const StyledPaper = styled(Paper)`
	min-height: 10rem;
`
export const StyledPaperNoHeight = styled(Paper)`
	min-height: 0rem;
`
