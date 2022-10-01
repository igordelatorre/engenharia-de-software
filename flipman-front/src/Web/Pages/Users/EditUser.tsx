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
    user?: User
}

function EditUser({
	isOpen, 
    onClose, 
    user
}: Props) {

    const onSubmit = async (
      values: Partial<User>,
      formik: FormikHelpers<Partial<User>>
    ) => {
      const newUser = UserFactory(values);
      formik.resetForm();
      editUser(newUser);
      onClose();
    };

    const editUser = async (newUser: User) => {
      // Edita o novo usuário aqui
    };


    const formik = useFormik<Partial<User>>({
      initialValues: IncompleteUserFactory({}),
      onSubmit,
      validate: (values: Partial<User>) => validate(values),
      enableReinitialize: true,
    });

	return (
        <Modal 
            title={"Editar Funcionário"}
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
        </Row>
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Senha"}>
              <Input font-size={1.0} height={2} {...handlers.string(formik, "password")} />
            </Form.Item>
          </Col>

        </Row>
      </Form>

        </Modal>
        
	)
}

export default EditUser
