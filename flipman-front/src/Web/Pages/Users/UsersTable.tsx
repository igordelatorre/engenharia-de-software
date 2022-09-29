import React from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import User from '../../../Domain/User';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'


type Props = {
    users: User[]
    onClickEdit: (user: User) => void 
    onClickRemove: (user: User) => void 
}

function UsersTable({users, onClickEdit, onClickRemove} : Props){

    const handleEditClick = (id : number) => {
        const user = users.find(u => u.id === id)
        if (user)
        {
            onClickEdit(user) 
        }
    }

    const handleDeleteClick = (id : number) => {
        const user = users.find(u => u.id === id)
        if (user)
        {
            onClickRemove(user) 
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
            dataSource={users}
        /> 
    )

}

export default UsersTable