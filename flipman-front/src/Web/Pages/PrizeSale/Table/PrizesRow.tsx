import React from 'react'
import { FormEvent, useState } from 'react'
import Cell from '../../../Components/MaterialUITable/MaterialUITableCell'
import Row from '@material-ui/core/TableRow'
import Player from '../../../../Domain/Player'
import Prize from '../../../../Domain/Prize'
import {TableActions, ActionContainer} from './style'
import { Button } from '@chakra-ui/react'
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
  } from '@chakra-ui/react'

type Props = {
	player : Player;
	prize : Prize;
	sellPrize : (player : Player, prize : Prize, amount : number) => void;
}


function PrizesRow({ prize, player, sellPrize}: Props) {

	const [saleAmount, setSaleAmount] = useState<number>(0)

	const canNotBuy : boolean = (player.tickets < prize.price) || (prize.amount === 0)
	const disabledStyle = {backgroundColor: "lightgray"}

	return (
		<Row style={canNotBuy ? disabledStyle : {}}>
			<Cell>{prize.name}</Cell>
			<Cell>{prize.price}</Cell>
			<Cell>{prize.amount}</Cell>
			<Cell>
				<TableActions amount={3}>
					<ActionContainer>
						<Button disabled={canNotBuy || saleAmount === 0} onClick={() => {sellPrize(player, prize, saleAmount)}}>COMPRAR</Button>
					</ActionContainer>
					<ActionContainer>
					<NumberInput onChange={(valueString) => {setSaleAmount(Number(valueString))}} defaultValue={0} min={0} max={prize.amount}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					</ActionContainer>
				</TableActions>
			</Cell>
			
		</Row>
	)
}

export default PrizesRow