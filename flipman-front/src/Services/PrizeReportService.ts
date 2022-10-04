import BaseService from "./BaseService";



export default class PrizeReportService {

    static async getAll() : Promise<any> {
        const response = (
            await BaseService.get<any, any>('/prizes-transactions', undefined)
        ).data
        return response

        
    }
}