import React from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import Prize from '../../../Domain/Prize';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'


type Props = {
    prizes: Prize[]
    onClickEdit: (prize: Prize) => void 
    onClickRemove: (prize: Prize) => void 
}

function PrizesTable({prizes, onClickEdit, onClickRemove} : Props){

    const handleEditClick = (id : number) => {
        const prize = prizes.find(p => p.id === id)
        if (prize)
        {
            onClickEdit(prize) 
        }
    }

    const handleDeleteClick = (id : number) => {
        const prize = prizes.find(p => p.id === id)
        if (prize)
        {
            onClickRemove(prize) 
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
            title: 'Actions',
            dataIndex: 'id',
            key: 'id',
            render: (id : number) => (
                <>
                  <DeleteOutlined style={{paddingLeft: '1rem'}} onClick={() => handleDeleteClick(id)}/>
                  <EditOutlined style={{paddingLeft: '1rem'}} onClick={() => handleEditClick(id)}/>                  
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