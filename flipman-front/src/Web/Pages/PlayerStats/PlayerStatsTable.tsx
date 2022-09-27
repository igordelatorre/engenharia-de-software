import React from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import PlayerStats from '../../../Domain/PlayerStats';


type Props = {
    playerStats: PlayerStats[]
}

function PlayersStatsTable({playerStats} : Props){


    const columns = [
        {
            title: 'Máquina',
            dataIndex: 'machineName',
            key: 'machineName',
            sorter: true
        },
        {
            title: 'Horas Jogadas',
            dataIndex: 'hoursPlayed',
            key: 'hoursPlayed',
        },
        {
            title: 'Fichas Gastas',
            dataIndex: 'spentTokens',
            key: 'spentTokens',
        },
        {
            title: 'Tickets Ganhos',
            dataIndex: 'earnedTickets',
            key: 'earnedTickets',
            sorter: true
        }
    ]

    return (
        <Table 
            style={{'paddingTop' : '3rem'}} 
            size={'small'} 
            columns={columns} 
            dataSource={playerStats}
        /> 
    )

}

export default PlayersStatsTable