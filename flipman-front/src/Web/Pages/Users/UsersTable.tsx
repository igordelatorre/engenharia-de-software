import React from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import User from '../../../Domain/User';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import { GetEmployeesReponse } from '../../../Services/EmployeeService';


type Props = {
    users: any
}

function UsersTable({users} : Props){


    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'username',
            key: 'username',
            sorter: true
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