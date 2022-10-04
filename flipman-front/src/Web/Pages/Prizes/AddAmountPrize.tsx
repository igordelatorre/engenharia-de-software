import React, { useState } from 'react'
import Prize, {IncompletePrizeFactory, PrizeFactory} from '../../../Domain/Prize'
import {Modal} from 'antd'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";
import PrizeService from '../../../Services/PrizeService'
import { InputNumber } from 'antd'


type Props = {
    isOpen : boolean
    onClose: () => void
    prize?: Prize
}

function AddAmountPrize({
	  isOpen, 
    onClose, 
    prize
}: Props) {

    const [amount, setAmount] = useState<number>(0)

      const addAmountPrize = async () => {
        await PrizeService.addAmount(prize?.id!, amount)
        onClose()
    };

	return (
        <Modal 
            title={"Adicionar Quantia do prêmio: " + prize?.name}
            visible={isOpen}
            onCancel={onClose}
            onOk={(e) => addAmountPrize()}
            okText={'Adicionar'}
            cancelText={'Cancelar'}
        >
            <InputNumber onChange={(number : number) => setAmount(number)}/>

        </Modal>
        
	)
}

export default AddAmountPrize
