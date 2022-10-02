import AppRoutes from "./Web/Routes/AppRoutes";
import Theme from "./Web/MUI_config/Theme"
import NewNavbar from "./Web/Components/Navbar/NewNavbar"
import { UserContextProvider } from "./Web/Contexts/UserContext";

function App() {
  return (
    <>
    <UserContextProvider>
      <Theme>
          <NewNavbar />
            <AppRoutes />
      </Theme>
    </UserContextProvider>
    </>
  );
}

export default App;
