import React, { useEffect, useState } from "react";
import {
  ContentContainer,
  ContentMenu,
  AlignedPageButtonContainer,
  PageContainer,
  PageTitle,
  PageTitleContainer,
} from "../../Styles/style";
import Player, {PlayerFactory} from "../../../Domain/Player";
import PlayersTable from "./Table/PlayersTable";
import ConfirmButton from "../../Components/Button/ConfirmButton";
import AddPlayerSidebar from "./AddPlayerSidebar";
import FixedCard from "../../Components/FixedCard/FixedCard";
import PlayerService from "../../../Service/PlayerService";
import { ResponsePlayer } from "../../../Service/PlayerService";
import EditPlayerSidebar from "./EditPlayerSidebar";
import RemovePlayerModal from "./RemovePlayerModal";
import AddTicketModal from "./AddTicketModal";

const id = "holidays-page";

function PlayersPage() {

  enum Displays {
	ADD = 'Add',
	EDIT = 'Edit',
	REMOVE = 'Remove',
	TICKET = 'Ticket'

  }

  const [display, setDisplay] = useState<Displays>();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [players, setPlayers] = useState<ResponsePlayer[]>([]);

  const getAllPlayers = async () => {
    const response = await PlayerService.getAll();
    setPlayers(response);
  };

  const handleRemovePlayer = (player : Player) => {
	  setSelectedPlayer(player)
	  setDisplay(Displays.REMOVE)
  }

  const handleEditPlayer = (player : Player) => {
	setSelectedPlayer(player)
	setDisplay(Displays.EDIT)
  }

  const handleAddTicket = (player : Player) => {
	setSelectedPlayer(player)
	setDisplay(Displays.TICKET)
  }


  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Jogadores"}</PageTitle>
        </PageTitleContainer>
        <FixedCard>
          <ContentMenu>
            <AlignedPageButtonContainer>
              <ConfirmButton onClick={() => setDisplay(Displays.ADD)}>
                {"Novo Jogador"}
              </ConfirmButton>
            </AlignedPageButtonContainer>
            <PlayersTable 
				        players={players}
				        removePlayer={handleRemovePlayer}
				        editPlayer={handleEditPlayer}
				        addTicket={handleAddTicket}
			/>
            <AddPlayerSidebar
              isOpen={Displays.ADD === display}
              onClose={() => setDisplay(undefined)}
              setPlayers={setPlayers}
              players={players}
            />
			<EditPlayerSidebar
				isOpen={Displays.EDIT === display}
				onClose={() => setDisplay(undefined)}
				player={selectedPlayer}
		  />
			<RemovePlayerModal
				isOpen={Displays.REMOVE === display}
				onClose={() => setDisplay(undefined)}
				player={selectedPlayer}
			/>
			<AddTicketModal
				isOpen={Displays.TICKET === display}
				onClose={() => setDisplay(undefined)}
				player={selectedPlayer}
			/>

          </ContentMenu>
        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default PlayersPage;
