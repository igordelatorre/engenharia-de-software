import React, { useEffect, useState } from 'react'
import {
	ContentContainer,
	ContentMenu,
	AlignedPageButtonContainer,
	PageContainer,
	PageTitle,
	PageTitleContainer
} from '../../Styles/style'
import Player from '../../../Domain/Player'
import PlayersTable from './Table/PlayersTable'
import ConfirmButton from '../../Components/Button/ConfirmButton'
import PlayerSidebar from './PlayerSidebar'
import FixedCard from '../../Components/FixedCard/FixedCard'
import PlayerService from '../../../Service/PlayerService'


const id = 'holidays-page'

function PlayersPage() {

    const [Players, setPlayers] = useState<Player[]>([])

	const [sidebar, setSidebar] = useState<boolean>(false)

	const openAddSidebar = () => setSidebar(true)

	const handleCloseSidebar = () => setSidebar(false)

	const addPlayer = async (newPlayer: Player) => 
	{
		const newPlayers = Players 
		newPlayers.push(newPlayer)
		setPlayers(newPlayers)
		await PlayerService.add(newPlayer);
	}

	const removePlayer = (player: Player) => 
	{
		setPlayers(Players.filter((p) => p.card != player.card))
	}


	return (
			<PageContainer id={id}>
				<ContentContainer id={id}>
					<PageTitleContainer>
						<PageTitle>{'Jogadores'}</PageTitle>
					</PageTitleContainer>
					<FixedCard>
						<ContentMenu>
							<AlignedPageButtonContainer>
								<ConfirmButton onClick={openAddSidebar}>
									{'Novo Jogador'}
								</ConfirmButton>
							</AlignedPageButtonContainer>
							<PlayersTable
								players={Players}
								removePlayer={removePlayer}
							/>
							<PlayerSidebar
								isOpen={sidebar}
								onClose={handleCloseSidebar}
                                addPlayer={addPlayer}
							/>
						</ContentMenu>
					</FixedCard>
				</ContentContainer>
			</PageContainer>
	)
}

export default PlayersPage