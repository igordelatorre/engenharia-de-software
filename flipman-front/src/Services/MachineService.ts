import BaseService from './BaseService'
import Machine, {MachineFactory} from '../Domain/Machine'

export type GetMachineResponse = {
    id: number
	name: string
	playCost: number 
	isActive: boolean 
	hoursPlayed: number,
	tickets: number
}

type PayloadPostMachine = {
	name: string
	playCost: number 
}

type PayloadPutMachine = {
	name: string 
	playCost: number 
	isActive: boolean
}

class MachineService {
	private static model = '/machine'


	static intoPost(data: Machine): PayloadPostMachine {
		return {
			name: data.name,
			playCost: data.playCost, 
		}
	}

	static intoPut(data: Machine): PayloadPutMachine {
		return {
			name: data.name,
			playCost: data.playCost, 
			isActive: data.isActive
		}
	}

	static async getAll(): Promise<GetMachineResponse[]> {
		const response = (
			await BaseService.get<GetMachineResponse[], void>(
				'/machines',
				undefined
			)
		).data

		return response
	}


	static async update(machine: Machine): Promise<void> {
		const response = (
			await BaseService.put<PayloadPutMachine, void>(
				this.model,
				this.intoPut(machine),
				`/${machine.id}`
			)
		).data

	}

	static async remove(machine: Machine): Promise<void> {
		const response = (
			await BaseService.remove<number, void>(
				this.model,
				machine.id,
				`/${machine.id}`
			)
		).data
	}


	static async add(machine: Machine): Promise<void> {
			const response = await BaseService.post<
				PayloadPostMachine, void
			>(this.model, this.intoPost(machine))
	}
}
export default MachineService
