import BaseService from './BaseService'
import Player, {PlayerFactory} from '../Domain/Player'

export type RPlayer = {
	name: string
	card: string
	email: string 
	cellphone?: string
	tickets: number
	tokens: number
	username?: string
	isActive: boolean
	id?: number
}

export type ResponsePlayer = {
	hoursPlayed?: number
	ticketsEarned?: number
	player: RPlayer
}

export type PayloadPlayer = {
	name: string
	card: string
	email: string
	cellphone: string
	username: string
}

type GetPlayerTicketsResponse = {
	name: string, 
	tickets: number 
}

type PayloadTokens = {
	tokens: number
}

type GetCollaboratorsResponse = ResponsePlayer[];

class PlayerService {
	private static model = '/players'

	static from(data: ResponsePlayer): Player {
		return PlayerFactory({
            id: data.player.id,
			name: data.player.card
		})
	}

	static into(data: PayloadPlayer): PayloadPlayer {
		return {
			name: data.name,
			card: data.card,
			email: data.email,
			cellphone: data.cellphone,
			username: "USERNAME"
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


	static async addPlayer(player: PayloadPlayer): Promise<void> {
			const response = await BaseService.post<
				PayloadPlayer,
				void
			>("/player", this.into(player))

	}
	
	static async putTokens(player: Player, amount: number): Promise<void> {
		await BaseService.post<PayloadTokens, void>('/player-tokens/' + player.card, {tokens: amount})
	}

}
export default PlayerService
