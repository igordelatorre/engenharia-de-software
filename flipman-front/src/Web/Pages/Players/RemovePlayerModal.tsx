import React, { useState } from 'react'
import Player from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Service/PlayerService'

type Props = {
    isOpen : boolean
    onClose: () => void
    player?: Player
}

function RemovePlayerModal({
	isOpen, 
    onClose, 
    player
}: Props) {

    const removePlayer = () => {
        PlayerService.remove(player!)
        onClose()
    }


	return (
        <Modal 
            title={"Remover Jogador"}
            visible={isOpen}
            onCancel={onClose}
            onOk={removePlayer}
        >
            <p>Tem certeza que deseja remover o jogador {player?.name}?</p>

        </Modal>
        
	)
}

export default RemovePlayerModal
