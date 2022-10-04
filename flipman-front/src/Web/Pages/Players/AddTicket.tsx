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
        const newTickets = (tokens || 0) + (player?.tokens || 0)
        //Chama o transaction Service aqui
        if (player === undefined) {
            return
        }
        await PlayerService.putTokens(player, tokens)
        setTokens(1)
        onClose()
    }

    const [tokens, setTokens] = useState<number>(1)


	return (
        <Modal 
            title={"Adicionar Fichas ao Jogador"}
            visible={isOpen}
            onCancel={onClose}
            onOk={addTokens}
            okText={'Adicionar'}
            cancelText={'Cancelar'}
        >
            <InputNumber style={{'width' : '6rem'}}
                value={tokens}  
                type="number" 
                onChange={(e) => setTokens(e)}
            >
            </InputNumber>
        </Modal>
        
	)
}

export default AddTicket
