import React from 'react'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import MaterialUITableHead from '../../../Components/MaterialUITable/MaterialUITableHead'
import MaterialUITableContainer from '../../../Components/MaterialUITable/MaterialUITableContainer'
import Row from './PrizesRow'
import Player from '../../../../Domain/Player'
import Prize from '../../../../Domain/Prize'


type Props = {
	player : Player;
	prizes : Array<Prize>;
	sellPrize : (player : Player, prize : Prize, amount : number) => void;
}

type ColumnHead<T> = {
	label?: string
	width: string
}

function PrizesTable({ player, prizes, sellPrize}: Props) {

	const columnHeads: ColumnHead<Prize>[] = [
		{
			label: 'Nome',
			width: '25%',
		},
		{
			label: 'Preço',
			width: '25%',
		},
		{
			label: 'Estoque',
			width: '25%',
		},
		{
			label: 'Ações',
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
						{prizes.map((prize, idx) => (
							<Row
								prize={prize}
								player={player}
								sellPrize={sellPrize}
								key={idx}
							/>
						))}
					</TableBody>
				</Table>
			</MaterialUITableContainer>
		</>
	)
}

export default PrizesTable
