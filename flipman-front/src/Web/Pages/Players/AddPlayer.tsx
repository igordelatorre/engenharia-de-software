import React, { useState } from 'react'
import Player, {IncompletePlayerFactory, PlayerFactory} from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Service/PlayerService'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";


type Props = {
    isOpen : boolean
    onClose: () => void
    player?: Player
}

function AddPlayer({
	isOpen, 
    onClose, 
    player
}: Props) {

    const onSubmit = async (
      values: Partial<Player>,
      formik: FormikHelpers<Partial<Player>>
    ) => {
      const newPlayer = PlayerFactory(values);
      formik.resetForm();
      addPlayer(newPlayer);
      onClose();
    };

    const addPlayer = async (newPlayer: Player) => {
      await PlayerService.add(newPlayer);
    };


    const formik = useFormik<Partial<Player>>({
      initialValues: IncompletePlayerFactory({}),
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
              <Input {...handlers.string(formik, "name")} />
            </Form.Item>
          </Col>
          <Col xs={12} lg={12}>
            <Form.Item label={"Email"}>
              <Input {...handlers.string(formik, "email")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Telefone"}>
              <Input {...handlers.string(formik, "cellphone")} />
            </Form.Item>
          </Col>
          <Col xs={12} lg={12}>
            <Form.Item label={"Cartão"}>
              <Input {...handlers.string(formik, "card")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

        </Modal>
        
	)
}

export default AddPlayer
