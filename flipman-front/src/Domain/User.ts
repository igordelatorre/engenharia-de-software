import Incomplete from "../Common/Incomplete"


export enum UserAuth {
    NO_AUTH,
    EMPLOYEE,
    MANAGER,
    DEVELOPER
}

export type LocalUserType = {
	token : string;
	auth: UserAuth;
	name: string;
} | undefined

class User {
	constructor(
		public id: number,
		public name: string,
		public username: string, 
		public password: string, 
        public isAdmin: boolean
	) {}
}


export function UserFactory(obj: Partial<User>): User {
return new User(
	obj.id || 0,
	obj.name || "",
	obj.username || "",
	obj.password || "", 
    obj.isAdmin || false
)
}

export function IncompleteUserFactory(
obj: Partial<User>
): Incomplete<User> {
	obj.id = undefined
	obj.name = undefined
	obj.username = undefined 
	obj.password = undefined 
    obj.isAdmin = undefined 
	return Object.setPrototypeOf(obj, User.prototype)
}


export default User
