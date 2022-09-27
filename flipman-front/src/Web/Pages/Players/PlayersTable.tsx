import React from 'react';
import 'antd/dist/antd.css';
import { Space, Table, Input} from 'antd';
import Player from '../../../Domain/Player';

type Props = {
    onRowClick: (player: Player) => void
    players: Player[]
}

function NewTable({onRowClick, players} : Props){


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
        }
    ]

    return (
        <Table 
            style={{'paddingTop' : '3rem'}} 
            size={'small'} 
            columns={columns} 
            dataSource={players} 
            onRow={(columns, rowIndex) => {
                return {
                    onClick: () => onRowClick(players[rowIndex || 0])
                }
            }} />
    )

}

export default NewTable