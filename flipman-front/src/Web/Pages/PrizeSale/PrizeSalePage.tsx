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
import Prize, {PrizeFactory} from "../../../Domain/Prize";
import FixedCard from "../../Components/FixedCard/FixedCard";
import { Input, Button } from "antd";
import Player from "../../../Domain/Player";
import PrizeSaleTable from "./PrizeSaleTable";
import BuyPrize from "./BuyPrize";
import PrizesReport from "../Prizes/PrizesReport";
import PlayerService from "../../../Services/PlayerService";


const {Search} = Input
const id = "prize-sale-page";

function PrizeSalePage() {


  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>()
  const [selectedPrize, setSelectedPrize] = useState<Prize | undefined>()
  const [isBuyingPrize, setIsBuyingPrize] = useState<boolean>(false)
  const [prizes, setPrizes] = useState<Prize[]>([])


  const [relatorio, setRelatorio] = useState<boolean>(false)

  const onCardSearch = async (card: string) => {
      const player = await PlayerService.get(card)
      setSelectedPlayer(player)
  }

  const handleRowClick = (prize: Prize) => {
    setIsBuyingPrize(true)
    setSelectedPrize(prize)
  }
  const handleCloseCard = (action : () => void) => {
    action()

  }

  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Compra de Prêmios"}</PageTitle>
        </PageTitleContainer>
        <FixedCard>

        <div>
            <Search
                placeholder="Busca por Cartão"
                allowClear
                onSearch={onCardSearch}
                style={{width: 200}}
            /> 
            {selectedPlayer && <Label style={{paddingLeft: '3rem'}}>{'Jogador :  ' + selectedPlayer?.name}</Label>}
            {selectedPlayer && <Label style={{paddingLeft: '3rem'}}>{'Saldo de Tickets :  ' + selectedPlayer?.tickets}</Label>}
            <Button onClick={() => setRelatorio(true)}>
                {"Gerar Relatório"}
              </Button>
        </div>

          <ContentMenu>
            {selectedPlayer && <PrizeSaleTable prizes={prizes} onRowClick={handleRowClick} />}
          </ContentMenu>

          <BuyPrize 
            isOpen={isBuyingPrize}
            onClose={() => setIsBuyingPrize(false)}
            player={selectedPlayer}
            prize={selectedPrize}
            />

          <PrizesReport
              isOpen={relatorio}
              onClose={() => handleCloseCard(() => setRelatorio(false))}
            />

        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PrizeSalePage;


