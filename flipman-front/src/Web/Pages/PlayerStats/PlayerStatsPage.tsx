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
import PlayersInfoService from "../../../Services/ApiCalls/PlayersInfoService";


const {Search} = Input
const id = "player-stats-page";

function PlayerStatsPage() {


  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined)
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([{id : 1, machineName : 'Pacman', hoursPlayed: 3.5, spentTokens : 10, earnedTickets: 5, playerCard: '123'}])


  const onCardSearch = async (card: string) => {
    const playerInfo = PlayersInfoService.getAll(card)

   if (card === '123')
   {
        setSelectedPlayer({id: 5, name: 'joao', card: '123', email: 'joao@email.com', tickets: 5, tokens: 4})
   }
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


