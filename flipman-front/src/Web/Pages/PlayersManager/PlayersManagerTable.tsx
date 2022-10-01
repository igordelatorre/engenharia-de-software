import React from 'react';
import 'antd/dist/antd.css';
import { Space, Table, Input} from 'antd';
import Player from '../../../Domain/Player';
import PlayerService from '../../../Services/ApiCalls/PlayerService';

type Props = {
    players: Player[]
}

function PlayersManagerTable({players} : Props){


    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'cellphone',
            key: 'cellphone',
        },
        {
            title: 'Cartão',
            dataIndex: 'card',
            key: 'card',
            sorter: true
        },
        {
            title: 'Tickets Obtidos',
            dataIndex: 'tickets',
            key: 'tickets',
            sorter: true
        }
    ]

    const playersWithTotalTickets = players



    return (
        <Table 
            style={{'paddingTop' : '3rem'}} 
            size={'small'} 
            columns={columns} 
            dataSource={playersWithTotalTickets} 
        />)
    
}

export default PlayersManagerTable