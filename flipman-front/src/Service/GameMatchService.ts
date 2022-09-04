import BaseService from './BaseService'

export type ResponseGameMatch = {
    id: number
	playerId: number 
    machineId: number 
    ticketsSpent: number 
	tokensEarned: number 
    secondsSpent: number
}


type GetGameMatchResponse = ResponseGameMatch[];

class GameMatchService {
	private static model = '/Matches'

	static async getAll(): Promise<GetGameMatchResponse> {
		const response = (
			await BaseService.get<GetGameMatchResponse, void>(
				this.model,
				undefined
			)
		).data

		return response
	}

	static async getAllByPlayer(id: number): Promise<GetGameMatchResponse> {
		const response = await BaseService.get<GetGameMatchResponse, void>(
			this.model,
			`/${id}/player`
		)

		return response.data
	}

    static async getAllByMachine(id: number): Promise<GetGameMatchResponse> {
		const response = await BaseService.get<GetGameMatchResponse, void>(
			this.model,
			`/${id}/machine`
		)

		return response.data
	}

}
export default GameMatchService