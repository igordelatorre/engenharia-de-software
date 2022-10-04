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
import PlayersTable from "./PlayersTable";
import AddPlayer from "./AddPlayer";
import FixedCard from "../../Components/FixedCard/FixedCard";
import PlayerService from "../../../Services/PlayerService";
import { ResponsePlayer } from "../../../Services/PlayerService";
import AddTicket from "./AddTicket";
import useDebounce from "../../../Hooks/useDebounce";
import { NameSearch } from "../../Styles/style";
import { Input, Button } from "antd";

const {Search} = Input
const id = "players-page";

function PlayersPage() {

  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [isAddingTicket, setIsAddingTicket] = useState<boolean>(false)
  const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false)
  const [players, setPlayers] = useState<ResponsePlayer[]>([])

  const getAllPlayers = async () => {
    const response = await PlayerService.getAll();
    setPlayers(response);
  };

  const handleAddTicket = (player : Player) => {
	  setSelectedPlayer(player)
	  setIsAddingTicket(true)
  }

  const onCardSearch = (card: string) => {
      const filteredPlayers = players.filter(p => p.player.card.includes(card))
      setPlayers(filteredPlayers)
    
  }

  const onNameSearch = (name: string) => {
    const filteredPlayers = players.filter(p => p.player.name.includes(name))
    setPlayers(filteredPlayers)
  }

  function parsedResponsePlayers() : Player[] {
    let parsedPlayers: Player[] = []
    players.forEach((p) => {
      parsedPlayers.push({hoursPlayed: p.hoursPlayed, ticketsEarned: p.ticketsEarned, name: p.player.name, email: p.player.email, cellphone: p.player.cellphone, card: p.player.card, tickets: p.player.tickets, tokens: p.player.tokens})
    })
    return parsedPlayers
  }

  useEffect(() => {getAllPlayers()}, [isAddingPlayer, isAddingTicket])

  const handleClose = (action: any) => {
    action()
    getAllPlayers()
  }


  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Jogadores"}</PageTitle>
        </PageTitleContainer>
        <FixedCard>
          <ContentMenu>
            <AlignedPageButtonContainer>
              <Button onClick={() => setIsAddingPlayer(true)}>
                {"Novo Jogador"}
              </Button> 
            </AlignedPageButtonContainer>
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

            <PlayersTable
              players={parsedResponsePlayers()}
              onRowClick={handleAddTicket}
			      />
            <AddPlayer
              isOpen={isAddingPlayer}
              onClose={() => handleClose(() => setIsAddingPlayer(false))}
            />

            <AddTicket
              isOpen={isAddingTicket}
              onClose={() => handleClose(() => setIsAddingTicket(false))}
              player={selectedPlayer}
            />

          </ContentMenu>
        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PlayersPage;


