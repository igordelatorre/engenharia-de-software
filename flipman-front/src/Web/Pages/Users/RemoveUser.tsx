import React, { useState } from 'react'
import {Modal} from 'antd'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";
import User, {UserFactory, IncompleteUserFactory} from '../../../Domain/User'
import EmployeeService from '../../../Services/ApiCalls/EmployeeService'

type Props = {
    isOpen : boolean
    onClose: () => void
    user?: User
}

function RemoveUser({
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
      removeUser(newUser);
      onClose();
    };

    const removeUser = async (userToRemove: User) => {
      //FALTA REMOVER FUNCIOANRIO
    };


    const formik = useFormik<Partial<User>>({
      initialValues: IncompleteUserFactory({}),
      onSubmit,
      validate: (values: Partial<User>) => validate(values),
      enableReinitialize: true,
    });




	return (
        <Modal 
            title={"Remover Funcionário:"}
            visible={isOpen}
            onCancel={onClose}
            onOk={formik.submitForm}
            okText={'Remover'}
            cancelText={'Cancelar'}
        >
            <p>{'Tem certeza que deseja remover o funcionário ' + user?.name + '?'}</p>

        </Modal>
        
	)
}

export default RemoveUser
