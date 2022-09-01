import Incomplete from "../Common/Incomplete"



class Machine {
	constructor(
		public id: number,
		public name: string,
        public playCost: number, 
        public pointsPerTicket: number
	) {}
}


export function MachineFactory(obj: Partial<Machine>): Machine 
{
return new Machine(
	obj.id || 0,
	obj.name || "",
	obj.playCost || 0, 
    obj.pointsPerTicket || 0
)
}

export function IncompleteMachineFactory(
obj: Partial<Machine>
): Incomplete<Machine> {
	obj.id = undefined
	obj.name = undefined
	obj.playCost = undefined 
    obj.pointsPerTicket = undefined
	return Object.setPrototypeOf(obj, Machine.prototype)
}


export default Machine
