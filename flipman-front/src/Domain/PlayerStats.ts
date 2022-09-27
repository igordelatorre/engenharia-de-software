import Incomplete from "../Common/Incomplete"



class PlayerStats {
	constructor(
		public id: number,
		public playerCard: string, 
        public machineName: string, 
        public hoursPlayed: number,
        public spentTokens: number,
        public earnedTickets: number,
	) {}
}


export function PlayerStatsFactory(obj: Partial<PlayerStats>): PlayerStats {
return new PlayerStats(
	obj.id || 0,
	obj.playerCard || "",
    obj.machineName || "",
    obj.hoursPlayed || 0,
    obj.spentTokens || 0,
    obj.earnedTickets || 0
)
}

export function IncompletePlayerFactory(
obj: Partial<PlayerStats>
): Incomplete<PlayerStats> {
	obj.id = undefined
	obj.playerCard = undefined
	obj.machineName = undefined 
	obj.hoursPlayed = undefined 
	obj.spentTokens = undefined
	obj.hoursPlayed = undefined
	obj.earnedTickets = undefined 
	return Object.setPrototypeOf(obj, PlayerStats.prototype)
}


export default PlayerStats
