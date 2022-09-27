import BaseService from './BaseService'
import Player, {PlayerFactory} from '../Domain/Player'

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
	tickets: number
	tokens: number
	cellphone?: string
}

type GetCollaboratorsResponse = ResponsePlayer[];

class PlayerService {
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
			cellphone: data.cellphone,
			tickets: data.tickets,
			tokens: data.tokens
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


	static async getSelf(): Promise<Player> {
		const response = await BaseService.get<ResponsePlayer, null>(
			this.model,
			'/Self'
		)

		return this.from(response.data)
	}

	static async add(player: Player): Promise<number> {
			const response = await BaseService.post<
				PayloadPlayer,
				ResponsePlayer
			>(this.model, this.into(player))
			return response.data.id
	}
}
export default PlayerService
