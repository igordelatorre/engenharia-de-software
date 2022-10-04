import React, { useState } from 'react'
import Player, {IncompletePlayerFactory, PlayerFactory} from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService, { PayloadPlayer } from '../../../Services/PlayerService'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";


type Props = {
    isOpen : boolean
    onClose: () => void
}

function AddPlayer({
	isOpen, 
    onClose, 
}: Props) {

    const onSubmit = async (
      values:PayloadPlayer,
      formik: FormikHelpers<PayloadPlayer>
    ) => {
      const newPlayer: PayloadPlayer = {
        card: values.card,
        name: values.name,
        username: "USERNAME",
        cellphone: values.cellphone,
        email: values.email
      }
      formik.resetForm();
      addPlayer(newPlayer);
      onClose();
    };

    const addPlayer = async (newPlayer: PayloadPlayer) => {
      await PlayerService.addPlayer(newPlayer);
    };


    const formik = useFormik<PayloadPlayer>({
      initialValues: {card: "", cellphone: "", email: "", name: "", username: ""},
      onSubmit,
      validate: (values: Partial<Player>) => validate(values),
      enableReinitialize: true,
    });




	return (
        <Modal 
            title={"Novo Jogador"}
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
            <Form.Item label={"Email"}>
              <Input  font-size={1.0} height={2} {...handlers.string(formik, "email")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Telefone"}>
              <Input font-size={1.0} height={2} {...handlers.string(formik, "cellphone")} />
            </Form.Item>
          </Col>
          <Col xs={12} lg={12}>
            <Form.Item label={"Cartão"}>
              <Input font-size={1.0} height={2} {...handlers.string(formik, "card")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

        </Modal>
        
	)
}

export default AddPlayer
