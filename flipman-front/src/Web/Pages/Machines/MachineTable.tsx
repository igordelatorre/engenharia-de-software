import React from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import Machine from '../../../Domain/Machine';


type Props = {
    machines: Machine[]
    onClickEdit: (machine: Machine) => void 
    onClickRemove: (machine: Machine) => void 
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
            sorter: true
        },
        {
            title: 'Preço para Jogar',
            dataIndex: 'playCost',
            key: 'playCost',
            sorter: true
        },
        {
            title: 'Total de Tempo Jogado',
            dataIndex: 'totalHoursSpent',
            key: 'totalHoursSpent',
            sorter: true

        },
        {
            title: 'Total de Tickets Emitidos',
            dataIndex: 'totalTicketsEmitted',
            key: 'totalTicketsEmitted',
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
            dataSource={machines}
        /> 
    )

}

export default MachineTable