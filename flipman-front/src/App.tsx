import AppRoutes from "./Web/Routes/AppRoutes";
import Navbar from "./Web/Components/Navbar/Navbar";
import Theme from "./Web/MUI_config/Theme"

function App() {
  return (
    <>
      <Theme>
        <Navbar />
        <AppRoutes />
      </Theme>
        
    </>
  );
}

export default App;
