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
import Prize from "../../../Domain/Prize";
import PrizesTable from "./PrizesTable";
import AddPrize from "./AddPrize";
import EditPrize from "./EditPrize";
import RemovePrize from "./RemovePrize";


const {Search} = Input
const id = "prizes-page";

function PrizesPage() {


  const [prizes, setPrizes] = useState<Prize[]>([{id: 4, name: 'boneco', amount: 10, price : 4}])
  const [selectedPrize, setSelectedPrize] = useState<Prize | undefined>()
  const [isAddingPrize, setIsAddingPrize] = useState<boolean>(false)
  const [isRemovingPrize, setIsRemovingPrize] = useState<boolean>(false)
  const [isEditingPrize, setIsEditingPrize] = useState<boolean>(false)

  const handleClickEdit = (prize: Prize) => {
    setIsEditingPrize(true)
    setSelectedPrize(prize)
  }

  const handleClickRemove = (prize: Prize) => {
    setIsRemovingPrize(true)
    setSelectedPrize(prize)
  }

  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Prêmios"}</PageTitle>
        </PageTitleContainer>
        <FixedCard>
            <AlignedPageButtonContainer>
              <Button onClick={() => setIsAddingPrize(true)}>
                {"Novo Prêmio"}
              </Button> 
            </AlignedPageButtonContainer>

          <ContentMenu>
            <PrizesTable prizes={prizes} onClickEdit={handleClickEdit} onClickRemove={handleClickRemove}/>
          </ContentMenu>

          <AddPrize 
            isOpen={isAddingPrize}
            onClose={() => setIsAddingPrize(false)}
            />

            <EditPrize
                isOpen={isEditingPrize}
                onClose={() => setIsEditingPrize(false)}
                prize={selectedPrize}
            />

            <RemovePrize
                isOpen={isRemovingPrize}
                onClose={() => setIsRemovingPrize(false)}
                prize={selectedPrize}
            />

        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PrizesPage;


