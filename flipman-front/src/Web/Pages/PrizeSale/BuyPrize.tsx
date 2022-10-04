import React, { useState } from 'react'
import Player from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Services/PlayerService'
import {InputNumber} from 'antd'
import Prize from '../../../Domain/Prize'
import { PrizeTransaction } from '../../../Services/PrizeTransaction'


type Props = {
    isOpen : boolean
    onClose: () => void
    player?: Player
    prize?: Prize
}

function BuyPrize({
	isOpen, 
    onClose, 
    player,
    prize
}: Props) {

    const buyPrize = async () => {
        await PrizeTransaction.add({playerCard: player?.card!, prizeId: prize?.id, quantity: quantity})
        onClose()
    }

    const [quantity, setQuantity] = useState<number>()


	return (
        <Modal 
            title={"Comprar " + prize?.name + " para o jogador " + player?.name}
            visible={isOpen}
            onCancel={onClose}
            onOk={buyPrize}
            okText={'Comprar'}
            cancelText={'Cancelar'}
        >
            <InputNumber style={{'width' : '6rem'}}
                value={quantity}  
                type="number" 
                onChange={(e) => setQuantity(e)}
            >
            </InputNumber>
        </Modal>
        
	)
}

export default BuyPrize
