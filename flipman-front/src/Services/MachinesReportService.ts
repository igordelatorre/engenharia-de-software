import BaseService from "./BaseService";


export type GetMachinesReport = {
    machineId: number, 
    machineNumber: string, 
    tickets: number, 
    hoursPlayed: number
}



class MachinesReportService {
    private static model = '/machines-report'

    static async getAll(intervalDays: number): Promise<GetMachinesReport[]> {
		const response = (
			await BaseService.get<GetMachinesReport[], void>(
				this.model + '/' + intervalDays,
				undefined
			)
		).data

		return response
	}

}