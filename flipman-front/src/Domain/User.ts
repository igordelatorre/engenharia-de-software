import Incomplete from "../Common/Incomplete"


export enum UserAuth {
    NO_AUTH,
    EMPLOYEE,
    MANAGER,
    DEVELOPER
}

class User {
	constructor(
		public id: number,
		public name: string,
        public email: string,
		public password: string, 
        public isAdmin: boolean
	) {}
}


export function UserFactory(obj: Partial<User>): User {
return new User(
	obj.id || 0,
	obj.name || "",
    obj.email || "",
	obj.password || "", 
    obj.isAdmin || false
)
}

export function IncompleteUserFactory(
obj: Partial<User>
): Incomplete<User> {
	obj.id = undefined
	obj.name = undefined
    obj.email = undefined
	obj.password = undefined 
    obj.isAdmin = undefined 
	return Object.setPrototypeOf(obj, User.prototype)
}


export default User
