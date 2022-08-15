import { Col, Form, Row } from 'antd'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import handlers from '../../Components/handlers'
import validate from './validate'
import { SidebarButtonContainer } from '../../Styles/style'
import Player, {PlayerFactory, IncompletePlayerFactory} from '../../../Domain/Player'
import {SidebarPlayer} from '../../Components/Sidebar/style'
import Input from '../../Components/Input/Input'
import ConfirmButton from '../../Components/Button/ConfirmButton'
import CancelButton from '../../Components/Button/CancelButton'

type Props = {
	isOpen: boolean
	onClose(): void
    addPlayer: (player: Player) => void
}

function PlayerSidebar({ isOpen, onClose, addPlayer}: Props) {

	const onSubmit = async (
		values: Partial<Player>,
		formik: FormikHelpers<Partial<Player>>
	) => {
		const newPlayer = PlayerFactory(values)
		formik.resetForm()
		addPlayer(newPlayer)
		onClose()
	}

	const formik = useFormik<Partial<Player>>({
		initialValues: IncompletePlayerFactory({}),
		onSubmit,
		validate: (values: Partial<Player>) => validate(values),
		enableReinitialize: true
	})

	return (
		<SidebarPlayer
			header={'Novo Jogador'}
			isOpen={isOpen}
			onClose={onClose}
			width={'47.5rem'}
		>
			<Form onSubmitCapture={e => e.preventDefault()} layout="vertical">
				<Row gutter={16}>
					<Col xs={12} lg={12}>
						<Form.Item label={'Nome'}>
							<Input {...handlers.string(formik, 'name')} />
						</Form.Item>
					</Col>
					<Col xs={12} lg={12}>
						<Form.Item label={'Email'}>
							<Input {...handlers.string(formik, 'email')} />
						</Form.Item>
					</Col>
                </Row>
				<Row gutter={16}>
					<Col xs={12} lg={12}>
						<Form.Item label={'Telefone'}>
							<Input {...handlers.number(formik, 'cellphone')} />
						</Form.Item>
					</Col>
					<Col xs={12} lg={12}>
						<Form.Item label={'Cartão'}>
							<Input {...handlers.number(formik, 'card')} />
						</Form.Item>
					</Col>
                </Row>

				
			</Form>
			<SidebarButtonContainer>
				<CancelButton onClick={onClose} children={"Cancel"} />
				<ConfirmButton onClick={formik.submitForm} children={"Salvar"} />
			</SidebarButtonContainer>
		</SidebarPlayer>
	)
}
export default PlayerSidebar