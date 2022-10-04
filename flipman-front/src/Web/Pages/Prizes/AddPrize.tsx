import React, { useState } from 'react'
import Prize, {IncompletePrizeFactory, PrizeFactory} from '../../../Domain/Prize'
import {Modal} from 'antd'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";
import PrizeService from '../../../Services/PrizeService'


type Props = {
    isOpen : boolean
    onClose: () => void
}

function AddPrize({
	isOpen, 
    onClose, 
}: Props) {

    const onSubmit = async (
      values: Partial<Prize>,
      formik: FormikHelpers<Partial<Prize>>
    ) => {
      const newPrize = PrizeFactory(values);
      formik.resetForm();
      addPrize(newPrize);
      onClose();
    };

    const addPrize = async (newPrize: Prize) => {
      PrizeService.add(newPrize)
    };


    const formik = useFormik<Partial<Prize>>({
      initialValues: IncompletePrizeFactory({}),
      onSubmit,
      validate: (values: Partial<Prize>) => validate(values),
      enableReinitialize: true,
    });




	return (
        <Modal 
            title={"Novo Prêmio"}
            visible={isOpen}
            onCancel={onClose}
            onOk={formik.submitForm}
            okText={'Adicionar'}
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
            <Form.Item label={"Quantidade"}>
              <Input  font-size={1.0} height={2} {...handlers.string(formik, "amount")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Preço"}>
              <Input font-size={1.0} height={2} {...handlers.string(formik, "price")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

        </Modal>
        
	)
}

export default AddPrize
