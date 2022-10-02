import BaseService from "./BaseService";


export type PayloadEmployee = {
    username: string, 
    password: string

}

type ReturnLogin = {
    token: string;
    isManager: boolean;
    name: string
}

export class LoginService {

    static async add(newUser: PayloadEmployee): Promise<ReturnLogin> {
        const response = await BaseService.post<
            PayloadEmployee, ReturnLogin
        >('/login/employee', newUser)

        return response.data
    }
}