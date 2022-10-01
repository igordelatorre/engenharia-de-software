import React, { useState } from 'react'
import Player from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Services/PlayerService'
import {InputNumber} from 'antd'
import Prize from '../../../Domain/Prize'


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

    const buyPrize = () => {
        //Chama o Transaction Service aqui. 
        onClose()
    }

    const [tickets, setTickets] = useState<number>()


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
                value={tickets}  
                type="number" 
                onChange={(e) => setTickets(e)}
            >
            </InputNumber>
        </Modal>
        
	)
}

export default BuyPrize
