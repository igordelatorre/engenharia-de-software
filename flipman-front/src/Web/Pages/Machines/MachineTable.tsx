import React from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import {DeleteOutlined, EditOutlined, FormOutlined} from '@ant-design/icons'
import Machine from '../../../Domain/Machine';
import { GetMachineResponse } from '../../../Services/MachineService';
import { report } from 'process';
import { MachinesReportService } from '../../../Services/MachinesReportService';
import { useState } from 'react';


type Props = {
    machines: GetMachineResponse[]
    onClickEdit: (machine: GetMachineResponse) => void 
    onClickRemove: (machine: GetMachineResponse) => void 
}

function MachineTable({machines, onClickEdit, onClickRemove} : Props){


    const handleEditClick = (id : number) => {
        const machine = machines.find(p => p.id === id)
        if (machine)
        {
            onClickEdit(machine) 
        }
    }

    const handleDeleteClick = (id : number) => {
        const machine = machines.find(p => p.id === id)
        if (machine)
        {
            onClickRemove(machine) 
        }

    }


    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Preço para Jogar',
            dataIndex: 'playCost',
            key: 'playCost',
        },
        {
            title: '',
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
            dataSource={machines}
        /> 
    )

}

export default MachineTable