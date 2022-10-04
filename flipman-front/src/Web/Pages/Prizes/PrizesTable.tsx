import React from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import Prize from '../../../Domain/Prize';
import {MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons'


type Props = {
    prizes: Prize[]
    onClickSubtract: (prize: Prize) => void 
    onClickAdd: (prize: Prize) => void 
}

function PrizesTable({prizes, onClickSubtract, onClickAdd} : Props){

    const handleSubtractClick = (id : number) => {
        const prize = prizes.find(p => p.id === id)
        if (prize)
        {
            onClickSubtract(prize) 
        }
    }

    const handleAddClick = (id : number) => {
        const prize = prizes.find(p => p.id === id)
        if (prize)
        {
            onClickAdd(prize) 
        }

    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
            sorter: true
        },
        {
            title: 'Estoque',
            dataIndex: 'amount',
            key: 'amount',
            sorter: true
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (id : number) => (
                <>
                  <MinusCircleOutlined style={{paddingLeft: '1rem'}} onClick={() => handleSubtractClick(id)}/>
                  <PlusCircleOutlined style={{paddingLeft: '1rem'}} onClick={() => handleAddClick(id)}/>                  
                </>)
        }
    ]

    return (
        <Table 
            style={{'paddingTop' : '3rem'}} 
            size={'small'} 
            columns={columns} 
            dataSource={prizes}
        /> 
    )

}

export default PrizesTable