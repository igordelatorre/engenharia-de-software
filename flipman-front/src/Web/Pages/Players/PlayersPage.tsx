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
import ConfirmButton from "../../Components/Button/ConfirmButton";
import AddPlayer from "./AddPlayer";
import FixedCard from "../../Components/FixedCard/FixedCard";
import PlayerService from "../../../Service/PlayerService";
import { ResponsePlayer } from "../../../Service/PlayerService";
import AddTicket from "./AddTicket";
import useDebounce from "../../../Hooks/useDebounce";
import { NameSearch } from "../../Styles/style";
import { Input } from "antd";

const {Search} = Input
const id = "holidays-page";

function PlayersPage() {

  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [isAddingTicket, setIsAddingTicket] = useState<boolean>(false)
  const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false)
  const [players, setPlayers] = useState<ResponsePlayer[]>([{id: 5, name: 'joao', card: '1231', email: 'joao@email.com', tickets: 5, tokens: 4}])

  const getAllPlayers = async () => {
    const response = await PlayerService.getAll();
    setPlayers(response);
  };

  const handleAddTicket = (player : Player) => {
	  setSelectedPlayer(player)
	  setIsAddingTicket(true)
  }

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
            <AlignedPageButtonContainer>
              <ConfirmButton onClick={() => setIsAddingPlayer(true)}>
                {"Novo Jogador"}
              </ConfirmButton> 
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
              players={players}
              onRowClick={handleAddTicket}


			      />
      <AddPlayer
        isOpen={isAddingPlayer}
				onClose={() => setIsAddingPlayer(false)}
      />

			<AddTicket
				isOpen={isAddingTicket}
				onClose={() => setIsAddingTicket(false)}
				player={selectedPlayer}
			/>

          </ContentMenu>
        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PlayersPage;


