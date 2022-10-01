import React, { useState } from 'react'
import Player from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Services/ApiCalls/PlayerService'
import {InputNumber} from 'antd'


type Props = {
    isOpen : boolean
    onClose: () => void
    player?: Player
}

function AddTokens({
	isOpen, 
    onClose, 
    player
}: Props) {

    const addTokens = () => {
        const newTokens = (tokens || 0) + (player?.tokens || 0)
        PlayerService.putTokens(player!, newTokens)
        setTokens(undefined)
        onClose()
    }

    const [tokens, setTokens] = useState<number>()


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

export default AddTokens
