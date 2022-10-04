import React, { useState } from 'react'
import Player from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Services/PlayerService'
import {InputNumber} from 'antd'


type Props = {
    isOpen : boolean
    onClose: () => void
    player?: Player
}

function AddTicket({
	isOpen, 
    onClose, 
    player
}: Props) {

    const addTokens = async () => {
        const newTickets = (tickets || 0) + (player?.tickets || 0)
        await PlayerService.putTokens(player!, newTickets)
        setTickets(undefined)
        onClose()
    }

    const [tickets, setTickets] = useState<number>()


	return (
        <Modal 
            title={"Adicionar Fichas ao Jogador " + player?.name}
            visible={isOpen}
            onCancel={onClose}
            onOk={addTokens}
            okText={'Adicionar'}
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

export default AddTicket
