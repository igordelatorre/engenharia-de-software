import BaseService from './BaseService'
import Player, {PlayerFactory} from '../../Domain/Player'

export type ResponsePlayer = {
    id: number
	name: string
	card: string
	email: string 
	cellphone?: string
	tickets: number
	tokens: number
}

type PayloadPlayer = {
	name: string
	card: string
	email: string
	cellphone?: string
}

type GetPlayerTicketsResponse = {
	name: string, 
	tickets: number 
}

type GetCollaboratorsResponse = ResponsePlayer[];

export class PlayerService {
	private static model = '/players'

	static from(data: ResponsePlayer): Player {
		return PlayerFactory({
            id: data.id,
			name: data.name
		})
	}

	static into(data: Player): PayloadPlayer {
		return {
			name: data.name,
			card: data.card,
			email: data.email,
			cellphone: data.cellphone
		}
	}

	static async getAll(): Promise<GetCollaboratorsResponse> {
		const response = (
			await BaseService.get<GetCollaboratorsResponse, void>(
				this.model,
				undefined
			)
		).data

		return response
	}

	static async get(id: number): Promise<Player> {
		const response = await BaseService.get<ResponsePlayer, void>(
			this.model,
			`/${id}`
		)

		return this.from(response.data)
	}

	static async getPlayerTickets(playerCard: number) : Promise<GetPlayerTicketsResponse> {
		const response = await BaseService.get<GetPlayerTicketsResponse, void>('/player-tickets/' + {playerCard}, undefined)
		return response.data
	}


	static async addPlayer(player: Player): Promise<void> {
			const response = await BaseService.post<
				PayloadPlayer,
				void
			>(this.model, this.into(player))

	}
	
	static async putTokens(player: Player, amount: number): Promise<void> {
		await BaseService.post<number, void>('/player-tokens/' + player.card, amount)
	}

}
export default PlayerService
