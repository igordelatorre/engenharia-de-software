import {Route, Navigate} from "react-router-dom"
import {ReactNode} from "react"
import {UserAuth} from "../../Domain/User"
import {RoutePath} from "./RoutesEnum"
import {useContext} from "react"
import { UserContext } from "../Contexts/UserContext"
 
interface PrivateRouteProps {
    redirectPath?: RoutePath;
    auth: Array<UserAuth>;
    children: ReactNode;
}

function PrivateRoute({auth, redirectPath="/", children}: PrivateRouteProps) {

    const userContextObject = useContext(UserContext)
    const tempUserAuth: UserAuth | undefined = userContextObject?.getUser()?.auth
    if (tempUserAuth === undefined) {
        return <Navigate to="/login" />
    }
    const userAuth: UserAuth = tempUserAuth
    const isAllowed: boolean = auth.includes(userAuth)
    
    if (!isAllowed) {
        return <Navigate to={redirectPath} />
    }

    return (
        <>
           {children}
        </>
    )
}
export default PrivateRoute