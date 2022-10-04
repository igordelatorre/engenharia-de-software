import { MachinesReportService } from "../../../Services/MachinesReportService";
import {Modal, Table} from 'antd'
import { useEffect, useState } from "react";



type Props = {
    onClose: () => void
    isOpen: boolean
}

export default function MachineReport({onClose, isOpen} : Props){

    const [relatorio, setRelatorio] = useState<any>([])

    const getReport = async () => {
        const response = await MachinesReportService.getAll(1000000)
        setRelatorio(response)
    }

    useEffect(() => {getReport()}, [])

    const columns = [
        {
            title: 'Nome da Máquina',
            dataIndex: 'machineName',
            key: 'machineName',
            sorter: true
        },
        {
            title: 'Tickets Emitidos Pela Máquina',
            dataIndex: 'tickets',
            key: 'tickets',
            sorter: true
        },
        {
            title: 'Horas Jogadas',
            dataIndex: 'hoursPlayed',
            key: 'hoursPlayed',
            sorter: true
        }
    ] 

    return (
        <Modal
            title={'Relatório de Máquinas'}
            visible={isOpen}
            onOk={onClose}
            onCancel={onClose}
        >
            <Table
                columns={columns}
                dataSource={relatorio}
            />

        </Modal>


    )

}
