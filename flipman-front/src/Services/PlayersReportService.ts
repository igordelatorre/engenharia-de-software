import BaseService from "./BaseService";


export type GetPlayerReportService = {
    playerName: string, 
    playerCard: string, 
    hoursPlayed: number
}

class PlayerReportService{
    
    static async getAll(): Promise<GetPlayerReportService[]> {
		const response = (
			await BaseService.get<GetPlayerReportService[], void>(
				'/playes-report',
				undefined
			)
		).data

		return response
	}


}