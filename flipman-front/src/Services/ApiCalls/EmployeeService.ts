import BaseService from "./BaseService";
import User from "../../Domain/User";


export type GetEmployeesReponse = {
    employeeId: number, 
    name: string, 
    isAdmin: boolean

}

class EmployeeService {
    private static model = '/employees'

	static async getAll(): Promise<GetEmployeesReponse[]> {
		const response = (
			await BaseService.get<GetEmployeesReponse[], void>(this.model, undefined)
		).data

		return response
	}

    static async get(id: number) : Promise<GetEmployeesReponse> {
        const response = (
			await BaseService.get<GetEmployeesReponse, void>(this.model, '/' + id)
		).data 

        return response
    }

    static async add(employee: User): Promise<GetEmployeesReponse> {
        const response = await BaseService.post<
            User,
            GetEmployeesReponse
        >(this.model, employee)
        return response.data
}




}

export default EmployeeService