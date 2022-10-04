import Incomplete from "../Common/Incomplete"



class PlayerStats {
	constructor(
        public machineName: string, //MUDAR ISSO PRA NAME: STRING DEPOIS QUE DER PRA PEGAR DO BACK 
        public hoursPlayed: number,
	) {}
}


export function PlayerStatsFactory(obj: Partial<PlayerStats>): PlayerStats {
return new PlayerStats(
	obj.machineName || "",
    obj.hoursPlayed || 0,
)
}

export function IncompletePlayerFactory(
obj: Partial<PlayerStats>
): Incomplete<PlayerStats> {
	obj.machineName = undefined 
	obj.hoursPlayed = undefined 
	return Object.setPrototypeOf(obj, PlayerStats.prototype)
}


export default PlayerStats
