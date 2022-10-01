import BaseService from "./BaseService";


export type GameStats = {
    machineId: number, 
    hoursPlayed: number
}

export type GetPlayersInfoResponse = {
    name: string, 
    tokens: number, 
    tickets: number, 
    gameStats: GameStats[]

}

class PlayersInfoService {

    static async getAll(playerCard: string): Promise<GetPlayersInfoResponse[]> {
		const response = (
			await BaseService.get<GetPlayersInfoResponse[], void>(
				'/player-info/' + playerCard,
				undefined
			)
		).data

		return response
	}

}