import React, { useState } from 'react'
import Player from '../../../Domain/Player'
import {Modal} from 'antd'
import PlayerService from '../../../Services/PlayerService'
import {InputNumber, Input} from 'antd'
import Prize from '../../../Domain/Prize'
import { PrizeTransaction } from '../../../Services/PrizeTransaction'
import {Row, Col, Form} from 'antd'
import { FormikHelpers, useFormik } from "formik";


type Props = {
    isOpen : boolean
    onClose: () => void
    player?: Player
    prize?: Prize
}

function BuyPrize({
	isOpen, 
    onClose, 
    player,
    prize
}: Props) {

    const buyPrize = async () => {
        await PrizeTransaction.add({playerCard: card?.toString(), prizeId: prize?.id, quantity: parseInt(quantity!)})
        onClose()
    }

    const [quantity, setQuantity] = useState<string>()
    const [card, setCard] = useState<string>()

	return (
        <Modal 
            title={"Comprar Prêmio " + prize?.name}
            visible={isOpen}
            onCancel={onClose}
            onOk={buyPrize}
            okText={'Comprar'}
            cancelText={'Cancelar'}
        >
        <Form onSubmitCapture={(e) => e.preventDefault()} layout="vertical">
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Cartão do Jogador"}>
              <InputNumber font-size={1.0} height={2} onChange={(e) => setCard(e.toString())} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={12}>
            <Form.Item label={"Quantidade"}>
              <InputNumber font-size={1.0} height={2} onChange={(e) => setQuantity(e.toString())} />
            </Form.Item>
          </Col>
        </Row>
      </Form>


        </Modal>
        
	)
}

export default BuyPrize
