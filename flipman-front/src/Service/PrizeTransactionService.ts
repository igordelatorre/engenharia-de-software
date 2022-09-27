import BaseService from './BaseService'

export type ResponsePrizeTransaction = {
    id: number
	playerId: number 
    prizeId: number  
    date: Date
}

type PayloadPrizeTransaction = {
	playerId: number 
    prizeId: number 
    date: Date
}

type GetPrizeTransactionResponse = ResponsePrizeTransaction[];

class PrizeTransactionService {
	private static model = '/transactions/prizes'

	static async getAll(): Promise<GetPrizeTransactionResponse> {
		const response = (
			await BaseService.get<GetPrizeTransactionResponse, void>(
				this.model,
				undefined
			)
		).data

		return response
	}

	static async getAllByPlayer(id: number): Promise<GetPrizeTransactionResponse> {
		const response = await BaseService.get<GetPrizeTransactionResponse, void>(
			this.model,
			`/${id}/player`
		)

		return response.data
	}

    static async getAllByPrize(id: number): Promise<GetPrizeTransactionResponse> {
		const response = await BaseService.get<GetPrizeTransactionResponse, void>(
			this.model,
			`/${id}/prize`
		)

		return response.data
	}


	static async remove(id: number): Promise<ResponsePrizeTransaction> {
		const response = (
			await BaseService.remove<number, ResponsePrizeTransaction>(
				this.model,
				id,
				`/${id}`
			)
		).data

		return response
	}


	static async add(transaction: PayloadPrizeTransaction): Promise<number> {
			const response = await BaseService.post<
				PayloadPrizeTransaction,
				ResponsePrizeTransaction
			>(this.model, transaction)
			return response.data.id
	}
}
export default PrizeTransactionService
