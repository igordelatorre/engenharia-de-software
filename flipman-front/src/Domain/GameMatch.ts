import Incomplete from "../Common/Incomplete"



class GameMatch {
	constructor(
		public playerId: number,
		public machineId: number,
        public tickets: number, 
        public playTimeSeconds: number
	) {}
}


export function GameMatchFactory(obj: Partial<GameMatch>): GameMatch
{
return new GameMatch(
	obj.playerId || 0,
    obj.machineId || 0, 
    obj.tickets || 0, 
    obj.playTimeSeconds || 0
	
)
}

export function IncompleteGameMatchFactory(
obj: Partial<GameMatch>
): Incomplete<GameMatch> {
	obj.playerId = undefined 
    obj.machineId = undefined 
    obj.tickets = undefined 
    obj.playTimeSeconds = undefined
	return Object.setPrototypeOf(obj, GameMatch.prototype)
}


export default GameMatch
