import Incomplete from "../Common/Incomplete"



class Player {
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public cellphone: string, 
		public card: number
	) {}
}


export function PlayerFactory(obj: Partial<Player>): Player {
return new Player(
	obj.id || 0,
	obj.name || "",
	obj.email || "",
	obj.cellphone || "",
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
	obj.card = undefined 
	return Object.setPrototypeOf(obj, Player.prototype)
}


export default Player
