import AppRoutes from "./Web/Routes/AppRoutes";
import Theme from "./Web/MUI_config/Theme"
import NewNavbar from "./Web/Components/Navbar/NewNavbar"

function App() {
  return (
    <>
      <Theme>
          <NewNavbar />
            <AppRoutes />
      </Theme>
    </>
  );
}

export default App;
