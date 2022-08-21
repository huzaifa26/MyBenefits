import BrandInfo from "./Components/Registeration/BrandInfo";
import ClubOffer from "./Components/Registeration/ClubOffer";
import Registeration from "./Components/Registeration/Registeration";
import Login from "./Components/Login";
import {BrowserRouter,Routes,Route, Navigate,} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth,db} from "./Components/Firebase/firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, query, where, getDocs,addDoc,setDoc,doc } from "firebase/firestore";
import Home from "./Components/Home/Home";
import Main from "./Components/Home/Main";
import DailyReport from "./Components/Home/DailyReport";
import AddBenefit from "./Components/Home/AddBenefit";
import Protected from "./Components/Protected/Protected";
import { useState } from "react";


function App() {

  let data={};

  const getDataFromRegisteration=async (rdata)=>{
    data=rdata;
    console.log(data);
  }

  const [benefitArrayFC,setBenefitArrayFC]=useState([]);
  const getDataFromClubOffer=(benefitArray)=>{
    setBenefitArrayFC(benefitArray);
  }

  const getDataFromBrandInfo=(bdata)=>{
    data.brandInfo=bdata;
    console.log(data);

    toast.dismiss();
    toast.loading("Registering User");
    createUserWithEmailAndPassword(auth, data.brandInfo.email, data.brandInfo.password)
    .then(async (response) => {
      try{
        const userdocRef=await setDoc(doc(db, "users", response.user.uid), data);
        
        toast.dismiss();
        toast.success("User Registeration Success.");
        return <Navigate to={"/"}/>;
      }catch(e){
        console.log(e)
        toast.dismiss();
        toast.error("User Registeration fail.")
      }
    }).catch((e)=>{
      console.log(e)
      toast.dismiss();
      toast.error("User Registeration fail of user already exists.")
    })
  }
  
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="registeration" element={<Registeration getDataFromRegisteration={getDataFromRegisteration}/>}/>
      <Route path="brandinfo" element={<BrandInfo benefitArrayFC={benefitArrayFC} getDataFromBrandInfo={getDataFromBrandInfo}/>}></Route>
      <Route path="cluboffer" element={<ClubOffer getDataFromClubOffer={getDataFromClubOffer}/>}></Route>

      <Route path="/" element={<Protected/>}>  
        <Route path="home" element={<Home />}>
          <Route path="code" element={<Main/>}/>
          <Route path="history" element={<DailyReport/>}/>
          <Route path="Add_Benefit_To_Client" element={<AddBenefit/>}/>
        </Route>
      </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="dark"/>
    </>
  );
}

export default App;