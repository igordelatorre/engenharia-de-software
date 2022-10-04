import React from 'react';
import { Table} from 'antd';
import Prize from '../../../Domain/Prize';
import Player from '../../../Domain/Player';

type Props = {
    prizes: Prize[]
    onRowClick: (prize : Prize) => void
}

function PrizeSaleTable({prizes, onRowClick} : Props){


    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Estoque',
            dataIndex: 'amount',
            key: 'amount',
        }]
    
    const test = () => console.log('okok')

    return (
        <Table 
            style={{'paddingTop' : '3rem'}} 
            size={'small'} 
            columns={columns} 
            dataSource={prizes}
            onRow={(columns, rowIndex) => {
                return {
                    onClick: () => onRowClick(prizes[rowIndex || 0])
                }
            }}
        /> 
    )

}

export default PrizeSaleTable