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
            dataIndex: 'machineId',  //MUDAR PRA MACHINE NAME   
            key: 'machineName',
            sorter: true
        },
        {
            title: 'Horas Jogadas',
            dataIndex: 'hoursPlayed',
            key: 'hoursPlayed',
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