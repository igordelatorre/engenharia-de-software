import React, { useState } from 'react'
import Player from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Service/PlayerService'
import Input from '../../Components/Input/Input'


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
        PlayerService.update({...player!, tickets : newTickets})
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
            <input 
                value={tickets}  
                type="number" 
                onChange={(e) => setTickets(parseInt(e.target.value))}
            >
            </input>
            <p>Quantia Atual: {player?.tickets}</p>

        </Modal>
        
	)
}

export default AddTicket
