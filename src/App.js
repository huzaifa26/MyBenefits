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

function App() {

  let data={};
  let benefitArray=[];

  const getDataFromRegisteration=(rdata)=>{
    data=rdata;
    console.log(data);
  }

  const getDataFromClubOffer=(cdata)=>{
    benefitArray.push(cdata);
  }

  const getDataFromBrandInfo=(bdata)=>{
    data.brandInfo=bdata;
    console.log(data);
    console.log(benefitArray);

    toast.dismiss();
    toast.loading("Registering User");
    createUserWithEmailAndPassword(auth, data.brandInfo.email, data.brandInfo.password)
    .then(async (response) => {
      console.log(response.user.uid)
      for(let i=0;i<benefitArray.length;i++){
        benefitArray[i].uid=response.user.uid;
      }
      // const docRef = await setDoc(collection(db, "user", data,));
      try{
        const userdocRef=await setDoc(doc(db, "users", response.user.uid), data);
        try{
          for(let i = 0;i<benefitArray.length;i++){
            const benefitdocRef = await addDoc(collection(db, "benefits"), benefitArray[i]);
          }
        }catch(e){
          console.log(e)
        }
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
      <Route path="brandinfo" element={<BrandInfo getDataFromBrandInfo={getDataFromBrandInfo}/>}></Route>
      <Route path="cluboffer" element={<ClubOffer benefitArray={benefitArray} getDataFromClubOffer={getDataFromClubOffer}/>}></Route>

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
