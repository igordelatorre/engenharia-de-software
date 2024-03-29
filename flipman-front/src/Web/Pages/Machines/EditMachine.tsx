import React, { useState } from 'react'
import Machine, {IncompleteMachineFactory, MachineFactory} from '../../../Domain/Machine'
import {Modal} from 'antd'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";
import { GetMachineResponse } from '../../../Services/MachineService'
import MachineService from '../../../Services/MachineService'


type Props = {
    isOpen : boolean
    onClose: () => void
    machine?: GetMachineResponse
}

function AddMachine({
	  isOpen, 
    onClose, 
    machine
}: Props) {

    const onSubmit = async (
      values: Partial<Machine>,
      formik: FormikHelpers<Partial<Machine>>
    ) => {
      const newMachine = {id: machine?.id, name: values?.name, playCost: values?.playCost}
      formik.resetForm();
      editMachine(newMachine);
      onClose();
    };

    const editMachine = async (newMachine: any) => {
      await MachineService.update(newMachine)
      onClose()
    };


    const formik = useFormik<Partial<Machine>>({
      initialValues: IncompleteMachineFactory({}),
      onSubmit,
      validate: (values: Partial<Machine>) => validate(values),
      enableReinitialize: true,
    });




	return (
        <Modal 
            title={"Editar Máquina"}
            visible={isOpen}
            onCancel={onClose}
            onOk={formik.submitForm}
            okText={'Editar'}
            cancelText={'Cancelar'}
        >
            <Form onSubmitCapture={(e) => e.preventDefault()} layout="vertical">
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Nome"}>
              <Input font-size={1.0} height={2} {...handlers.string(formik, "name")} />
            </Form.Item>
          </Col>
          <Col xs={12} lg={12}>
            <Form.Item label={"Preço"}>
              <Input  font-size={1.0} height={2} {...handlers.number(formik, "playCost")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

        </Modal>
        
	)
}

export default AddMachine
