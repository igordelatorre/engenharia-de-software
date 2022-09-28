import React, { useState } from 'react'
import Prize, {IncompletePrizeFactory, PrizeFactory} from '../../../Domain/Prize'
import {Modal} from 'antd'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";


type Props = {
    isOpen : boolean
    onClose: () => void
    prize?: Prize
}

function RemovePrize({
	isOpen, 
    onClose, 
    prize
}: Props) {

    const onSubmit = async (
      values: Partial<Prize>,
      formik: FormikHelpers<Partial<Prize>>
    ) => {
      const newPrize = PrizeFactory(values);
      formik.resetForm();
      removePrize(newPrize);
      onClose();
    };

    const removePrize = async (newPrier: Prize) => {
      // Remove o Prize Aqui
    };


    const formik = useFormik<Partial<Prize>>({
      initialValues: IncompletePrizeFactory({}),
      onSubmit,
      validate: (values: Partial<Prize>) => validate(values),
      enableReinitialize: true,
    });




	return (
        <Modal 
            title={"Remover Prêmio:"}
            visible={isOpen}
            onCancel={onClose}
            onOk={formik.submitForm}
            okText={'Remover'}
            cancelText={'Cancelar'}
        >
            <p>{'Tem certeza que deseja remover o prêmio ' + prize?.name + '?'}</p>

        </Modal>
        
	)
}

export default RemovePrize
