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


const {Search} = Input
const id = "prizes-page";

function MachinesPage() {


  const [machines, setMachines] = useState<Machine[]>([{id: 4, name: 'Pacman', playCost: 5, pointsPerToken: 10}])
  const [selectedMachine, setSelectedMachine] = useState<Machine | undefined>()
  const [isAddingMachine, setIsAddingMachine] = useState<boolean>(false)
  const [isRemovingMachine, setIsRemovingMachine] = useState<boolean>(false)
  const [isEditingMachine, setIsEditingMachine] = useState<boolean>(false)

  const handleClickEdit = (machine: Machine) => {
    setIsEditingMachine(true)
    setSelectedMachine(machine)
  }

  const handleClickRemove = (machine: Machine) => {
    setIsRemovingMachine(true)
    setSelectedMachine(machine)
  }

  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Prêmios"}</PageTitle>
        </PageTitleContainer>
        <FixedCard>
            <AlignedPageButtonContainer>
              <Button onClick={() => setIsAddingMachine(true)}>
                {"Novo Prêmio"}
              </Button> 
            </AlignedPageButtonContainer>

          <ContentMenu>
            <MachineTable machines={machines} onClickEdit={handleClickEdit} onClickRemove={handleClickRemove}/>
          </ContentMenu>

          <AddMachine 
            isOpen={isAddingMachine}
            onClose={() => setIsAddingMachine(false)}
            />

            <EditMachine
                isOpen={isEditingMachine}
                onClose={() => setIsEditingMachine(false)}
                machine={selectedMachine}
            />

            <RemoveMachine
                isOpen={isRemovingMachine}
                onClose={() => setIsRemovingMachine(false)}
                machine={selectedMachine}
            />

        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default MachinesPage;


