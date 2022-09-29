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


const {Search} = Input
const id = "holidays-page";

function PrizeSalePage() {


  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>()
  const [selectedPrize, setSelectedPrize] = useState<Prize | undefined>()
  const [isBuyingPrize, setIsBuyingPrize] = useState<boolean>(false)
  const [prizes, setPrizes] = useState<Prize[]>([{id: 4, name: 'boneco', amount: 10, price : 4}])


  const onCardSearch = async (card: String) => {
    // GET DO JOGADOR.
    // GET ALL DOS ITEMS QUE O JOGADOR PODE COMPRAR
   // setPlayerStats(....);
   // setPlayer(...)
   if (card === '123')
   {
        setSelectedPlayer({id: 5, name: 'joao', card: '123', email: 'joao@email.com', tickets: 5, tokens: 4})
   }
  }

  const handleRowClick = (prize: Prize) => {
    setIsBuyingPrize(true)
    setSelectedPrize(prize)
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

        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PrizeSalePage;


