import Incomplete from "../Common/Incomplete"



class Player {
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public card: number,
		public tickets: number, 
		public cellphone?: string
	) {}
}


export function PlayerFactory(obj: Partial<Player>): Player {
return new Player(
	obj.id || 0,
	obj.name || "",
	obj.email || "",
	obj.tickets || 0,
	obj.card || 0
)
}

export function IncompletePlayerFactory(
obj: Partial<Player>
): Incomplete<Player> {
	obj.id = undefined
	obj.name = undefined
	obj.email = undefined 
	obj.cellphone = undefined 
	obj.tickets = undefined
	obj.card = undefined 
	return Object.setPrototypeOf(obj, Player.prototype)
}


export default Player
