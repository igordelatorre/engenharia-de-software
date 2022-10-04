
import BaseService from "./BaseService";


export class PrizeTransaction {

    static async add(transaction: any) {
        const response = await BaseService.post<any, any>('/prize-transaction', transaction)
    }

}