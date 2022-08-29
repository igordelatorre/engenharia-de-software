import {Route, Navigate} from "react-router-dom"
import {ReactNode} from "react"
import {UserAuth} from "../../Domain/User"
import {RoutePath} from "./RoutesEnum"
 
interface PrivateRouteProps {
    redirectPath?: RoutePath;
    auth: Array<UserAuth>;
    children: ReactNode;
}

function PrivateRoute({auth, redirectPath="/", children}: PrivateRouteProps) {

    //Depois será trocado pra pegar o user logado
    const userAuth: UserAuth = UserAuth.NO_AUTH


    const isLoggedIn: boolean = userAuth !== undefined
    const isAllowed: boolean = auth.includes(userAuth)

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }
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