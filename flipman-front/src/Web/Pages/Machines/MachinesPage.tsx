import React, {useEffect, useState } from "react";
import {
  ContentContainer,
  ContentMenu,
  AlignedPageButtonContainer,
  PageContainer,
  PageTitle,
  PageTitleContainer,
  Label
} from "../../Styles/style";

import Player, {PlayerFactory} from "../../../Domain/Player";
import FixedCard from "../../Components/FixedCard/FixedCard";
import { Input, Button } from "antd";
import Machine from "../../../Domain/Machine";
import MachineTable from "./MachineTable";
import AddMachine from "./AddMachine";
import EditMachine from "./EditMachine";
import RemoveMachine from "./RemoveMachine";
import MachineService from "../../../Services/MachineService";
import { GetMachineResponse } from "../../../Services/MachineService";


const {Search} = Input
const id = "machine-page";

function MachinesPage() {


  const [machines, setMachines] = useState<GetMachineResponse[]>([])
  const [selectedMachine, setSelectedMachine] = useState<GetMachineResponse | undefined>()
  const [isAddingMachine, setIsAddingMachine] = useState<boolean>(false)
  const [isRemovingMachine, setIsRemovingMachine] = useState<boolean>(false)
  const [isEditingMachine, setIsEditingMachine] = useState<boolean>(false)

  const handleClickEdit = (machine: GetMachineResponse) => {
    setIsEditingMachine(true)
    setSelectedMachine(machine)
  }

  const handleClickRemove = (machine: GetMachineResponse) => {
    setIsRemovingMachine(true)
    setSelectedMachine(machine)
  }

  const handleGenerateReport = async () => {
    //CHAMA O SERVICE PRA GERAR O REPORT
  }

  const getAllMachines = async () => {
    const response = await MachineService.getAll()
   // response.filter
    setMachines(response)
  }

  const handleClose = (action: () => void) =>
  {
    action()
    getAllMachines()
  }

  useEffect(() => {getAllMachines()}, [])

  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Máquinas"}</PageTitle>
        </PageTitleContainer>
        <FixedCard>
            <AlignedPageButtonContainer>
              <Button onClick={() => setIsAddingMachine(true)}>
                {"Nova Máquina"}
              </Button> 
            </AlignedPageButtonContainer>

          <ContentMenu>
            <MachineTable machines={machines} onClickEdit={handleClickEdit} onClickRemove={handleClickRemove}/>
          </ContentMenu>

          <AddMachine 
            isOpen={isAddingMachine}
            onClose={() => handleClose(() => setIsAddingMachine(false))}
            />

            <EditMachine
                isOpen={isEditingMachine}
                onClose={() => handleClose(() => setIsEditingMachine(false))}
                machine={selectedMachine}
            />

            <RemoveMachine
                isOpen={isRemovingMachine}
                onClose={() => handleClose(() => setIsRemovingMachine(false))}
                machine={selectedMachine}
            />

        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default MachinesPage;


