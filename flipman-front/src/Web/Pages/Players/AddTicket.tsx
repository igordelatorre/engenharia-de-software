import React, { useState } from 'react'
import Player from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Service/PlayerService'
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

    const addTickets = () => {
        const newTickets = (tickets || 0) + (player?.tickets || 0)
        //Chama o transaction Service aqui
        setTickets(undefined)
        onClose()
    }

    const [tickets, setTickets] = useState<number>()


	return (
        <Modal 
            title={"Adicionar Tickets ao Jogador"}
            visible={isOpen}
            onCancel={onClose}
            onOk={addTickets}
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
