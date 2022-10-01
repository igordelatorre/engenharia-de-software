import BaseService from './BaseService'

export type ResponsePrizeTransaction = {
    id: number
	playerId: number 
    prizeId: number  
    quantity: number
}

export type GetPrizeTransactionsResponse = {
	id: number, 
	playerCard: number, 
	prizeId: number, 
	dateTime: string,
	quantity: number
}

type PayloadPrizeTransaction = {
	playerId: number 
    prizeId: number 
    quantity: number
}

class PrizeTransactionService {

	static async add(transaction: PayloadPrizeTransaction): Promise<void> {
			await BaseService.post<
				PayloadPrizeTransaction,
				void
			>('/prize-transaction', transaction)
	}

	static async getAll(): Promise<GetPrizeTransactionsResponse[]> {
		const response = (
			await BaseService.get<GetPrizeTransactionsResponse[], void>(
				'/prizes-transactions',
				undefined
			)
		).data

		return response 
	}

	static async getAllByPrizeId(prizeId: number) : Promise<GetPrizeTransactionsResponse[]> {
		const response = (
			await BaseService.get<GetPrizeTransactionsResponse[], void>(
				'/prizes-transactions/' + prizeId,
				undefined
			)
		).data

		return response
	}
	

}

export default PrizeTransactionService
