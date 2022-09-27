import AppRoutes from "./Web/Routes/AppRoutes";
import Navbar from "./Web/Components/Navbar/Navbar";
import NewNavbar from "./Web/Components/Navbar/NewNavbar"

function App() {
  return (
    <>
      <NewNavbar />
      <AppRoutes />
    </>
  );
}

export default App;
