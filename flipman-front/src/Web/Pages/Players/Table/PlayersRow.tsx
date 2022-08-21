import React from 'react'
import Cell from '../../../Components/MaterialUITable/MaterialUITableCell'
import Row from '@material-ui/core/TableRow'
import Player from '../../../../Domain/Player'
import {TableActions, ActionContainer} from './style'
import {ReactComponent as RemoveIcon} from '../../../Assets/remove_icon.svg'
import {ReactComponent as EditIcon} from '../../../Assets/edit_icon.svg'
import {ReactComponent as AddTicketIcon} from '../../../Assets/add_icon.svg'

type Props = {
	player: Player
	removePlayer: (player: Player) => void 
	editPlayer: (player : Player) => void 
	addTicket: (player: Player) => void
}

function HolidaysRow({ player, removePlayer, editPlayer, addTicket }: Props) {

	return (
		<Row>
			<Cell>{player.name}</Cell>
			<Cell>{player.email}</Cell>
			<Cell>{player.cellphone}</Cell>
			<Cell>{player.card}</Cell>
			<Cell>
				<TableActions amount={3}>
					<ActionContainer>
						<RemoveIcon onClick={() => removePlayer(player)}/>
					</ActionContainer>
					<ActionContainer>
						<EditIcon onClick={() => editPlayer(player)}/>
					</ActionContainer>
					<ActionContainer>
						<AddTicketIcon onClick={() => addTicket(player)}/>
					</ActionContainer>
				</TableActions>
			</Cell>
			
		</Row>
	)
}

export default HolidaysRow