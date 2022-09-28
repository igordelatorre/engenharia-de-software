import BaseService from './BaseService'
import Machine, {MachineFactory} from '../Domain/Machine'

export type ResponseMachine = {
    id: number
	name: string
	playCost: number 
	pointsPerToken: number
}

type PayloadMachine = {
	name: string
	playCost: number 
	pointsPerToken: number
}

type GetMachinesResponse = ResponseMachine[];

class MachineService {
	private static model = '/machines'

	static from(data: ResponseMachine): Machine {
		return MachineFactory({
            id: data.id,
			name: data.name
		})
	}

	static into(data: Machine): PayloadMachine {
		return {
			name: data.name,
			playCost: data.playCost, 
			pointsPerToken: data.pointsPerToken
		}
	}

	static async getAll(): Promise<GetMachinesResponse> {
		const response = (
			await BaseService.get<GetMachinesResponse, void>(
				this.model,
				undefined
			)
		).data

		return response
	}

	static async get(id: number): Promise<Machine> {
		const response = await BaseService.get<ResponseMachine, void>(
			this.model,
			`/${id}`
		)

		return this.from(response.data)
	}

	static async update(machine: Machine): Promise<Machine> {
		const response = (
			await BaseService.put<PayloadMachine, ResponseMachine>(
				this.model,
				this.into(machine),
				`/${machine.id}`
			)
		).data

		return this.from(response)
	}

	static async remove(machine: Machine): Promise<Machine> {
		const response = (
			await BaseService.remove<PayloadMachine, ResponseMachine>(
				this.model,
				this.into(machine),
				`/${machine.id}`
			)
		).data

		return this.from(response)
	}


	static async add(machine: Machine): Promise<number> {
			const response = await BaseService.post<
				PayloadMachine,
				ResponseMachine
			>(this.model, this.into(machine))
			return response.data.id
	}
}
export default MachineService
