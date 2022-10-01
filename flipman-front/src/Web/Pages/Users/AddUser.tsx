import React, { useState } from 'react'
import {Modal} from 'antd'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";
import User, {UserFactory, IncompleteUserFactory} from '../../../Domain/User'

type Props = {
    isOpen : boolean
    onClose: () => void
}

function AddUser({
	isOpen, 
    onClose, 
}: Props) {

    const onSubmit = async (
      values: Partial<User>,
      formik: FormikHelpers<Partial<User>>
    ) => {
      const newUser = UserFactory(values);
      formik.resetForm();
      addUser(newUser);
      onClose();
    };

    const addUser = async (newUser: User) => {
      // ADICIONA O NOVO USUÁRIO AQUI
    };


    const formik = useFormik<Partial<User>>({
      initialValues: IncompleteUserFactory({}),
      onSubmit,
      validate: (values: Partial<User>) => validate(values),
      enableReinitialize: true,
    });

	return (
        <Modal 
            title={"Novo Funcionário"}
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
        </Row>
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Senha"}>
              <Input font-size={1.0} height={2} {...handlers.string(formik, "password")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Email"}>
              <Input font-size={1.0} height={2} {...handlers.string(formik, "email")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

        </Modal>
        
	)
}

export default AddUser
