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
import MachineService from "../../../Services/MachineService";

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
  const [count, setCount] = useState<number>(0)

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
    let parsedPlayerStats: PlayerStats[] = []
    playerData.gameStats.forEach(async (gs) => {
      const id = gs.machineId
      const machineData = await MachineService.getAll()
      machineData.forEach((m) => {
        if (m.id === id) {
            parsedPlayerStats.push({machineName: m.name, hoursPlayed: gs.hoursPlayed})
        }
      })
    })
    console.log(parsedPlayerStats)
    setPlayerStats(parsedPlayerStats)
  }

  useEffect(() => {
    console.log(playerStats)
  }, [playerStats])

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
            {JSON.stringify(playerStats)}
            <button onClick={() => {setCount((c) => c+1)}}>COUNT</button>
            <h1>{count}</h1>
          </ContentMenu>
        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PlayerStatsPage;


