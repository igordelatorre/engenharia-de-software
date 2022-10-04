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
import SubtractAmountPrize from "./SubtractAmountPrize";
import AddAmountPrize from "./AddAmountPrize";
import { useEventCallback } from "@material-ui/core";
import PrizeService from "../../../Services/PrizeService";
import PrizesReport from "./PrizesReport";


const {Search} = Input
const id = "prizes-page";

function PrizesPage() {


  const [prizes, setPrizes] = useState<Prize[]>([])
  const [selectedPrize, setSelectedPrize] = useState<Prize | undefined>()
  const [isAddingPrize, setIsAddingPrize] = useState<boolean>(false)
  const [isAddingAmountPrize, setIsAddingAmountPrize] = useState<boolean>(false)
  const [isSubtractingAmountPrize, setIsSubtractingPrize] = useState<boolean>(false)

  const handleClickSubtract = (prize: Prize) => {
    setIsSubtractingPrize(true)
    setSelectedPrize(prize)
  }

  const handleClickAddAmount = (prize: Prize) => {
    setIsAddingAmountPrize(true)
    setSelectedPrize(prize)
  }



  const getAllPrizes = async () => {
    const responsePrizes = await PrizeService.getAll()
    setPrizes(responsePrizes)
  }

  const handleCloseCard = (action : () => void) => {
    action()
    getAllPrizes()

  }

  useEffect(() => {getAllPrizes()}, [isAddingPrize, selectedPrize, isSubtractingAmountPrize, isAddingAmountPrize])

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
            <PrizesTable prizes={prizes} onClickSubtract={handleClickSubtract} onClickAdd={handleClickAddAmount}/>
          </ContentMenu>

          <AddPrize 
            isOpen={isAddingPrize}
            onClose={() => handleCloseCard(() => setIsAddingPrize(false))}
            />

            <AddAmountPrize
                isOpen={isAddingAmountPrize}
                onClose={() => handleCloseCard(() => setIsAddingAmountPrize(false))}
                prize={selectedPrize}
            />

            <SubtractAmountPrize
                isOpen={isSubtractingAmountPrize}
                onClose={() => handleCloseCard(() => setIsSubtractingPrize(false))}
                prize={selectedPrize}
            />


        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PrizesPage;


