import BrandInfo from "./Components/BrandInfo";
import ClubOffer from "./Components/ClubOffer";
import Registeration from "./Components/Registeration";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let data;

  const getDataFromRegisteration=(rdata)=>{
    data=rdata;
    console.log(data);
  }
  
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="registeration" element={<Registeration getDataFromRegisteration={getDataFromRegisteration}/>}/>
          <Route path="brandinfo" element={<BrandInfo />}></Route>
          <Route path="cluboffer" element={<ClubOffer />}></Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="dark"/>
    </>
  );
}

export default App;
