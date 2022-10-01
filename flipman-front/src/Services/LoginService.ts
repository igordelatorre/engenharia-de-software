import BaseService from "./BaseService";


export type PayloadEmployee = {
    username: string, 
    password: string

}

class LoginService {

    static async add(newUser: PayloadEmployee): Promise<string> {
        const response = await BaseService.post<
            PayloadEmployee, string
        >('/login/employee', newUser)

        return response.data
    }
}