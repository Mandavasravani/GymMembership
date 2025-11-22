import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { TabsDefault } from "./components/Tabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App(){
  return(
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<TabsDefault/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
          position="bottom-center"
          bodyClassName="font-bold text-blue-900 text-center"
        />
    </div>
  )
}
export default App;