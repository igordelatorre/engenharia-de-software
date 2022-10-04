import PrizeReportService  from "../../../Services/PrizeReportService";
import {Modal, Table} from 'antd'
import { useEffect, useState } from "react";



type Props = {
    onClose: () => void
    isOpen: boolean
}

export default function PrizesReport({onClose, isOpen} : Props){

    const [relatorio, setRelatorio] = useState<any>([])

    const getReport = async () => {
        const response = await PrizeReportService.getAll()
        console.log(response)
        setRelatorio(response)
    }

    useEffect(() => {getReport()}, [])


    const columns = [
        {
            title: 'Cartão do Jogador',
            dataIndex: 'playerCard',
            key: 'playerCard',
            sorter: true
        },
        {
            title: 'Id do Prêmio',
            dataIndex: 'prizeId',
            key: 'prizeId',
            sorter: true
        },
        {
            title: 'Quantia',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: true
        }
    ] 

    return (
        <Modal
            title={'Relatório de Prêmios'}
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
