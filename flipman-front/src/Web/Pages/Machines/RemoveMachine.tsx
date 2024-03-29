import React, { useState } from 'react'
import Prize, {IncompletePrizeFactory, PrizeFactory} from '../../../Domain/Prize'
import {Modal} from 'antd'
import Input from '../../Components/Input/Input'
import handlers from '../../Components/handlers'
import validate from './validate'
import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";
import Machine, {MachineFactory} from '../../../Domain/Machine'
import { GetMachineResponse } from '../../../Services/MachineService'
import MachineService from '../../../Services/MachineService'


type Props = {
    isOpen : boolean
    onClose: () => void
    machine?: GetMachineResponse
}

function RemoveMachine({
	isOpen, 
    onClose, 
    machine
}: Props) {


    const removeMachine = async () => {
      await MachineService.remove(machine?.id!)
      onClose()
    };


	return (
        <Modal 
            title={"Remover Máquina"}
            visible={isOpen}
            onCancel={onClose}
            onOk={(e) => removeMachine()}
            okText={'Remover'}
            cancelText={'Cancelar'}
        >
            <p>{'Tem certeza que deseja remover a máquina ' + machine?.name + '?'}</p>

        </Modal>
        
	)
}

export default RemoveMachine
