import Incomplete from "../Common/Incomplete"



class Prize {
	constructor(
		public id: number,
		public name: string,
		public amount: number, 
        public price: number
	) {}
}


export function PrizeFactory(obj: Partial<Prize>): Prize {
return new Prize(
	obj.id || 0,
	obj.name || "",
	obj.amount || 0, 
    obj.price || 0
)
}

export function IncompletePrizeFactory(
obj: Partial<Prize>
): Incomplete<Prize> {
	obj.id = undefined
	obj.name = undefined
	obj.amount = undefined 
    obj.price = undefined 
	return Object.setPrototypeOf(obj, Prize.prototype)
}


export default Prize
