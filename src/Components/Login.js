import { useRef,useState } from "react";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth,db } from "./Firebase/firebase";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../_services/index.js";



export default function Login(){
    const navigate=useNavigate();

    const loginFormRef=useRef();
    
    const loginFormSubmitHandler=async (e)=>{
        e.preventDefault();
        let email=loginFormRef.current.email.value;
        let password=loginFormRef.current.password.value;
        try{
            toast.loading("Signing in.");
            const userData=await login(email,password);
            if(userData.error === "unauthorized"){
                toast.dismiss()
                toast("No user found")
                return
            }
            localStorage.setItem('user', JSON.stringify(userData));
            toast.dismiss()
            toast.success("Signing in Successfull");
            navigate("/home/code");
        }catch(err){
            toast.dismiss()
            toast.error("Signing in failed");
            console.log(err);
        }
    }

    return(
        <div className="bg-[#00b9bf] w-[calc(100vw - 100%)] h-[100vh] pt-[30px] gradientBackground">
            <div className="flex flex-col w-[555px] h-[384px] bg-white rounded-[10px] m-auto p-[20px]">
                <h2 className="font-bold text-[32px] text-[#212529] my-[12px]">Login to MyBenefitz</h2>
                <form onSubmit={loginFormSubmitHandler} ref={loginFormRef} className="flex flex-col" >
                    <div className="flex flex-col mb-[20px]">
                        <label className="text-[18px] font-medium" htmlFor="email">Email</label>
                        <input className="h-[38px] border focus:shadow-md py-[6px] px-[12px]" type="text" name="email" />
                    </div>
                    <div className="flex flex-col mb-[20px]">
                        <label className="text-[18px] font-medium" htmlFor="password">Password</label>
                        <input className="h-[38px] border focus:shadow-md py-[6px] px-[12px]" type="password" name="password"/>
                    </div>
                    <button className="text-[22px] text-white mt-[10px] flex-1 h-[50px] rounded-full  shadow-md py-[8px] px-[12px] bg-[#0069d9]">Login</button>
                    {/* {error &&
                    <div>Error Logging In.</div>
                    } */}
                    <Link to={"/registeration"}><p className="text-[14px] text-[#777] hover:text-[#6ec1d6] mt-[5px]">Create Account.</p></Link>
                </form>
            </div>
        </div>
    )
}