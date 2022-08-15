import BaseService from './BaseService'
import Player, {PlayerFactory} from '../Domain/Player'

export type ResponsePlayer = {
    id: number
	name: string
	card: number
	email: string 
	cellphone: string
}

type PayloadPlayer = {
	name: string
	card: number
	email: string
	cellphone: string
}

type GetCollaboratorsResponse = {
	results: ResponsePlayer[]
	totalResults: number
}

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

	static async update(player: Player): Promise<Player> {
		const response = (
			await BaseService.put<PayloadPlayer, ResponsePlayer>(
				this.model,
				this.into(player),
				`/${player.id}`
			)
		).data

		return this.from(response)
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
