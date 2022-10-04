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

function SubtractAmountPrize({
	isOpen, 
    onClose, 
    prize
}: Props) {

    
  const [amount, setAmount] = useState<number>(0)

  const subAmountPrize = async () => {
    const newAmount = amount > prize?.amount! ? prize?.amount : amount
    await PrizeService.subtractAmount(prize?.id!, newAmount!)
    onClose()
};

return (
    <Modal 
        title={"Diminiur Quantia do Prêmio: " + prize?.name}
        visible={isOpen}
        onCancel={onClose}
        onOk={(e) => subAmountPrize()}
        okText={'Diminuir'}
        cancelText={'Cancelar'}
    >
        <InputNumber onChange={(number : number) => setAmount(number)}/>

    </Modal>
    
)
}

export default SubtractAmountPrize
