import BaseService from './BaseService'
import Prize, {PrizeFactory} from '../Domain/Prize'

export type ResponsePrize = {
    id: number,
    name: string,
    amount: number, 
    price: number
}

type PayloadPrize = {
    name: string,
    amount: number, 
    price: number
}

type GetPrizesResponse = ResponsePrize[];

class PrizeService {
	private static model = '/prizes'

	static from(data: ResponsePrize): Prize {
		return PrizeFactory({
            id: data.id,
			name: data.name
		})
	}

	static into(data: Prize): PayloadPrize {
		return {
			name: data.name,
            amount: data.amount, 
            price: data.price
		}
	}

	static async getAll(): Promise<GetPrizesResponse> {
		const response = (
			await BaseService.get<GetPrizesResponse, void>(
				this.model,
				undefined
			)
		).data

		return response
	}

	static async get(id: number): Promise<Prize> {
		const response = await BaseService.get<ResponsePrize, void>(
			this.model,
			`/${id}`
		)

		return this.from(response.data)
	}

	static async update(prize: Prize): Promise<Prize> {
		const response = (
			await BaseService.put<PayloadPrize, ResponsePrize>(
				this.model,
				this.into(prize),
				`/${prize.id}`
			)
		).data

		return this.from(response)
	}

	static async remove(prize: Prize): Promise<Prize> {
		const response = (
			await BaseService.remove<PayloadPrize, ResponsePrize>(
				this.model,
				this.into(prize),
				`/${prize.id}`
			)
		).data

		return this.from(response)
	}


	static async add(prize: Prize): Promise<number> {
			const response = await BaseService.post<
				PayloadPrize,
				ResponsePrize
			>(this.model, this.into(prize))
			return response.data.id
	}
}
export default PrizeService
