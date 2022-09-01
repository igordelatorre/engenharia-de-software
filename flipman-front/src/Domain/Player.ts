import Incomplete from "../Common/Incomplete"



class Player {
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public card: string,
		public tickets: number,
		public tokens: number,
		public cellphone?: string
	) {}
}


export function PlayerFactory(obj: Partial<Player>): Player {
return new Player(
	obj.id || 0,
	obj.name || "",
	obj.email || "",
	obj.card || "",
	obj.tickets || 0,
	obj.tokens || 0,
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
	obj.tokens = undefined
	obj.card = undefined 
	return Object.setPrototypeOf(obj, Player.prototype)
}


export default Player
