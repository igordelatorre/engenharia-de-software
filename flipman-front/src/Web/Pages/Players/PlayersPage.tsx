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
import { ResponsePlayer } from '../../../Service/PlayerService'


const id = 'holidays-page'

function PlayersPage() {

	const [sidebar, setSidebar] = useState<boolean>(false)

	const openAddSidebar = () => setSidebar(true)

	const handleCloseSidebar = () => setSidebar(false)

	const [players, setPlayers] = useState<ResponsePlayer[]>([])
	
	const getAllPlayers = async () => 
	{
		const response = await PlayerService.getAll()
		setPlayers(response.results)

	}


	const addPlayer = async (newPlayer: Player) => 
	{
		await PlayerService.add(newPlayer);
		getAllPlayers()
	}

	getAllPlayers()

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
								players={players}
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