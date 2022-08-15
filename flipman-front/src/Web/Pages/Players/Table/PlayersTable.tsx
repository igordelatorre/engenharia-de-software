import React from 'react'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import MaterialUITableHead from '../../../Components/MaterialUITable/MaterialUITableHead'
import MaterialUITableContainer from '../../../Components/MaterialUITable/MaterialUITableContainer'
import Row from './PlayersRow'
import Player from '../../../../Domain/Player'


type Props = {
	players : Player[]
}

type ColumnHead<T> = {
	label?: string
	width: string
}

function PlayersTable({ players}: Props) {

	const columnHeads: ColumnHead<Player>[] = [
		{
			label: 'Nome',
			width: '25%',
		},
		{
			label: 'Email',
			width: '25%',
		},
		{
			label: 'Telefone',
			width: '25%',
		},
		{
			label: 'Cartão',
			width: '25%'
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
							/>
						))}
					</TableBody>
				</Table>
			</MaterialUITableContainer>
		</>
	)
}

export default PlayersTable
