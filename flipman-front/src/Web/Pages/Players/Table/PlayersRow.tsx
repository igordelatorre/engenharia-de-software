import React from 'react'
import Cell from '../../../Components/MaterialUITable/MaterialUITableCell'
import Row from '@material-ui/core/TableRow'
import Player from '../../../../Domain/Player'
import {ReactComponent as RemoveIcon} from '../../../Assets/remove_icon.svg'

type Props = {
	player: Player
}

function HolidaysRow({ player }: Props) {

	return (
		<Row>
			<Cell>{player.name}</Cell>
			<Cell>{player.email}</Cell>
			<Cell>{player.cellphone}</Cell>
			<Cell>{player.card}</Cell>
		</Row>
	)
}

export default HolidaysRow