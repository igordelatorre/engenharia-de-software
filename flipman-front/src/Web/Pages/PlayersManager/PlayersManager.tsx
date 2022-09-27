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
import PlayerService from "../../../Service/PlayerService";
import { ResponsePlayer } from "../../../Service/PlayerService";
import useDebounce from "../../../Hooks/useDebounce";
import { NameSearch } from "../../Styles/style";
import { Input, Button } from "antd";
import PlayersManagerTable from "./PlayersManagerTable";

const {Search} = Input
const id = "holidays-page";

function PlayersManager() {

  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [isAddingTicket, setIsAddingTicket] = useState<boolean>(false)
  const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false)
  const [players, setPlayers] = useState<ResponsePlayer[]>([{id: 5, name: 'joao', card: '1231', email: 'joao@email.com', tickets: 5, tokens: 4}])

  const getAllPlayers = async () => {
    const response = await PlayerService.getAll();
    setPlayers(response);
  };


  const onCardSearch = (card: string) => {
    const filteredPlayers = players.filter(p => p.card.includes(card))
    setPlayers(filteredPlayers)
  }

  const onNameSearch = (name: string) => {
    const filteredPlayers = players.filter(p => p.name.includes(name))
    setPlayers(filteredPlayers)
  }


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
              players={players}
			/>
          </ContentMenu>
        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PlayersManager;


