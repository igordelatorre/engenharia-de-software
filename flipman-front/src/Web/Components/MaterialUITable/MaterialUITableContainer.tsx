import {
	makeStyles,
	Paper,
	TableContainer,
	TableContainerProps
} from '@material-ui/core'
import React from 'react'
import { StyledPaper } from './style'

export type MaterialUITableContainerProps = {
	disableMinHeight?: boolean
} & TableContainerProps

function MaterialUITableContainer({
	disableMinHeight,
	...props
}: MaterialUITableContainerProps) {
	const useStyles = makeStyles({
		container: {
			maxHeight: '500',
			boxShadow: 'none',
			'&::-webkit-scrollbar': {
				width: 8,
				height: 10
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: ' #b2b2b2',
				border: '2px solid #fff',
				borderRadius: 5
			}
		}
	})().container

	return (
		<TableContainer
			{...props}
			component={disableMinHeight ? Paper : StyledPaper}
			className={useStyles}
		/>
	)
}

export default MaterialUITableContainer
