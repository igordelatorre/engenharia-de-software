import React, {useEffect, useState } from "react";
import {
  ContentContainer,
  ContentMenu,
  AlignedPageButtonContainer,
  PageContainer,
  PageTitle,
  PageTitleContainer,
} from "../../Styles/style";
import Player, {PlayerFactory} from "../../../Domain/Player";
import FixedCard from "../../Components/FixedCard/FixedCard";
import PlayerService from "../../../Services/PlayerService";
import { ResponsePlayer } from "../../../Services/PlayerService";
import useDebounce from "../../../Hooks/useDebounce";
import { NameSearch } from "../../Styles/style";
import { Input, Button } from "antd";
import PlayersManagerTable from "./PlayersManagerTable";

const {Search} = Input
const id = "player-manager-page";

function PlayersManager() {

  const [players, setPlayers] = useState<ResponsePlayer[]>([])

  const getAllPlayers = async () => {
    const response = await PlayerService.getAll();
    console.log(response)
    setPlayers(response);
  };

  function parsedResponsePlayers() : Player[] {
    let parsedPlayers: Player[] = []
    players.forEach((p) => {
      parsedPlayers.push({hoursPlayed: p.hoursPlayed, ticketsEarned: p.ticketsEarned, name: p.player.name, email: p.player.email, cellphone: p.player.cellphone, card: p.player.card, tickets: p.player.tickets, tokens: p.player.tokens})
    })
    return parsedPlayers
  }


  const onCardSearch = (card: string) => {
    const filteredPlayers = players.filter(p => p.player.card.includes(card))
    setPlayers(filteredPlayers)
  }

  const onNameSearch = (name: string) => {
    console.log(name)
    const filteredPlayers = players.filter(p => p.player.name.includes(name))
    setPlayers(filteredPlayers)
  }

  useEffect(() => {
    getAllPlayers()
  }, [])

  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Jogadores"}</PageTitle>
        </PageTitleContainer>
        <FixedCard>
          <ContentMenu>
            <div style={{'display': 'flex', }}> 
                <div style={{'marginRight' : '2rem'}}>
                  <Search
                    placeholder="Busca por nome"
                    allowClear
                    onSearch={onNameSearch}
                    style={{
                      width: 200,
                    }}
                  />
                  </div>

                  <Search
                    placeholder="Busca por Cartão"
                    allowClear
                    onSearch={onCardSearch}
                    style={{
                       width: 200,
                      }}
                  />
            </div> 

            <PlayersManagerTable
              players={parsedResponsePlayers()}
			/>
          </ContentMenu>
        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PlayersManager;


