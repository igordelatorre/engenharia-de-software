import { SettingsBackupRestoreRounded } from "@material-ui/icons";
import { RestartProcess } from "concurrently";
import { createContext, useState } from "react"
import { LocalUserType } from "../../Domain/User"
import { UserAuth } from "../../Domain/User";
import { setToken } from "../../Services/BaseService";

export type UserContextType = {
    logoutUser: () => void;
    getUser: () => LocalUserType;
    saveUser: (token: string) => void; 
} | null

type Props = {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>(null)

export function UserContextProvider({children}: Props): JSX.Element {
    const [user, setUser] = useState<LocalUserType>(undefined)

    function logoutUser() {
        setUser(undefined)
    }

    function getUser(): LocalUserType {
        return user
    }
    function saveUser(token: string) {
        //Mudar depois o auth e o name pros valores que a API vai mandar
        setUser({token, auth: UserAuth.MANAGER, name: "Bruno"})
        setToken(token)
    }

    return (
        <UserContext.Provider value={{logoutUser, getUser, saveUser}}>
            {children}
        </UserContext.Provider>
    )

}
