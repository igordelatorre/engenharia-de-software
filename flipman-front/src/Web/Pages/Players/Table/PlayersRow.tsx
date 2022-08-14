import React from 'react'
import Cell from '../../../Components/MaterialUITable/MaterialUITableCell'
import Row from '@material-ui/core/TableRow'
import Player from '../../../../Domain/Player'
import {ReactComponent as RemoveIcon} from '../../../Assets/remove_icon.svg'

type Props = {
	player: Player
	removePlayer: (player: Player) => void
}

function HolidaysRow({ player, removePlayer }: Props) {

	return (
		<Row>
			<Cell>{player.name}</Cell>
			<Cell>{player.email}</Cell>
			<Cell>{player.cellphone}</Cell>
			<Cell>{player.card}</Cell>
			<Cell><RemoveIcon onClick={() => removePlayer(player)}/></Cell>
		</Row>
	)
}

export default HolidaysRow