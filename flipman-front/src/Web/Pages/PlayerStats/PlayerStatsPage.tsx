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
import PlayersStatsTable from "./PlayerStatsTable";
import PlayerStats from "../../../Domain/PlayerStats";
import { PlayersInfoService } from "../../../Services/PlayersInfoService";

const {Search} = Input
const id = "player-stats-page";

function PlayerStatsPage() {

  type PartialPlayer = {
    name: string;
    tokens: number;
    tickets: number;
  }
  const [selectedPlayer, setSelectedPlayer] = useState<PartialPlayer | undefined>(undefined)
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([])


  const onCardSearch = async (card: string) => {
    // GET DO JOGADOR.
    // GET ALL DAS ESTATÍSTICAS DO JOGADOR SELECIONADO
   // setPlayerStats(....);
   // setPlayer(...)
   const playerData = await PlayersInfoService.get(card)
    setSelectedPlayer({
      name: playerData.name,
      tokens: playerData.tokens,
      tickets: playerData.tickets  
    })
    
    setPlayerStats(playerData.gameStats)
  }

  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Estatísticas dos Jogadores"}</PageTitle>
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
            {selectedPlayer && <Label style={{paddingLeft: '3rem'}}>{'Saldo de Tokens :  ' + selectedPlayer?.tokens}</Label>}
            {selectedPlayer && <Label style={{paddingLeft: '3rem'}}>{'Saldo de Tickets :  ' + selectedPlayer?.tickets}</Label>}
        </div>

          <ContentMenu>
            {selectedPlayer && <PlayersStatsTable playerStats={playerStats}/>}
          </ContentMenu>
        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PlayerStatsPage;


