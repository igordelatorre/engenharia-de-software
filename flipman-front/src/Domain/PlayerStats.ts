import Incomplete from "../Common/Incomplete"



class PlayerStats {
	constructor(
        public machineId: number, //MUDAR ISSO PRA NAME: STRING DEPOIS QUE DER PRA PEGAR DO BACK 
        public hoursPlayed: number,
		public machineName: string,
	) {}
}


export function PlayerStatsFactory(obj: Partial<PlayerStats>): PlayerStats {
return new PlayerStats(
	obj.machineId || 0,
    obj.hoursPlayed || 0,
    obj.machineName || "",
)
}

export function IncompletePlayerFactory(
obj: Partial<PlayerStats>
): Incomplete<PlayerStats> {
	obj.machineId = undefined 
	obj.hoursPlayed = undefined 
	return Object.setPrototypeOf(obj, PlayerStats.prototype)
}


export default PlayerStats
