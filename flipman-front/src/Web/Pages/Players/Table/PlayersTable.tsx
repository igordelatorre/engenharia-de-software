import React from 'react'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import MaterialUITableHead from '../../../Components/MaterialUITable/MaterialUITableHead'
import MaterialUITableContainer from '../../../Components/MaterialUITable/MaterialUITableContainer'
import Row from './PlayersRow'
import Player from '../../../../Domain/Player'


type Props = {
	players : Player[]
	removePlayer: (player: Player) => void
}

type ColumnHead<T> = {
	label?: string
	width: string
}

function PlayersTable({ players, removePlayer}: Props) {

	const columnHeads: ColumnHead<Player>[] = [
		{
			label: 'Nome',
			width: '20%',
		},
		{
			label: 'Email',
			width: '20%',
		},
		{
			label: 'Telefone',
			width: '20%',
		},
		{
			label: 'Cartão',
			width: '20%'
		},
		{
			width: '20%'
		}
	]

	return (
		<>
			<MaterialUITableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columnHeads.map((head, idx) => {
									return (
										<MaterialUITableHead
											key={idx}
											width={head.width}
											label={head.label}
										/>
									)
								})}
						</TableRow>
					</TableHead>

					<TableBody>
						{players.map((player, idx) => (
							<Row
								key={idx}
								player={player}
								removePlayer={removePlayer}
							/>
						))}
					</TableBody>
				</Table>
			</MaterialUITableContainer>
		</>
	)
}

export default PlayersTable
