import {Routes, Route} from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import PlayersPage from "../Pages/Players/PlayersPage";
import HomePage from "../Pages/Home/HomePage";
import MachinesPage from "../Pages/Machines/MachinesPage";
import PlayerStatsPage from "../Pages/PlayerStats/PlayerStatsPage";
import ErrorPage from "../Pages/Error/ErrorPage";
import PrizesPage from "../Pages/Prizes/PrizesPage";
import PrizeSalePage from "../Pages/PrizeSale/PrizeSalePage";
import LoginPage from "../Pages/Login/LoginPage";
import { UserAuth } from "../../Domain/User";
import { RoutePath } from "./RoutesEnum"

function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={
                <PrivateRoute redirectPath="/login" auth={[UserAuth.MANAGER, UserAuth.EMPLOYEE]}>
                    <HomePage />
                </PrivateRoute>}
            />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/players" element={
                <PrivateRoute auth={[UserAuth.EMPLOYEE]}>
                    <PlayersPage />
                </PrivateRoute>}
            />
            <Route path="/prizeSale" element={
                <PrivateRoute auth={[UserAuth.EMPLOYEE]}>
                    <PrizeSalePage />
                </PrivateRoute>}
            />
            <Route path="/playerStats" element={<PlayerStatsPage />}/>
            <Route path="/machines" element={
                <PrivateRoute auth={[UserAuth.MANAGER]}>
                    <MachinesPage />
                </PrivateRoute>}
            />
            <Route path="/prizes" element={
                <PrivateRoute auth={[UserAuth.MANAGER]}>
                    <PrizesPage />
                </PrivateRoute>}
            />
            <Route path="*" element={<ErrorPage />}/>
        </Routes>
    )
}
export default AppRoutes