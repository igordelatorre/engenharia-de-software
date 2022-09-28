import React, { useState } from 'react'
import Prize, {IncompletePrizeFactory, PrizeFactory} from '../../../Domain/Prize'
import {Modal} from 'antd'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";
import Machine, {MachineFactory} from '../../../Domain/Machine'


type Props = {
    isOpen : boolean
    onClose: () => void
    machine?: Machine
}

function RemoveMachine({
	isOpen, 
    onClose, 
    machine
}: Props) {

    const onSubmit = async (
      values: Partial<Machine>,
      formik: FormikHelpers<Partial<Machine>>
    ) => {
      const newMachine = MachineFactory(values);
      formik.resetForm();
      removePrize(newMachine);
      onClose();
    };

    const removePrize = async (machine: Machine) => {
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
            title={"Remover Máquina"}
            visible={isOpen}
            onCancel={onClose}
            onOk={formik.submitForm}
            okText={'Remover'}
            cancelText={'Cancelar'}
        >
            <p>{'Tem certeza que deseja remover a máquina ' + machine?.name + '?'}</p>

        </Modal>
        
	)
}

export default RemoveMachine
