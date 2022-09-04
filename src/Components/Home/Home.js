import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate=useNavigate();
    const [user,setUser]=useState();
    useEffect(()=>{
        let u=JSON.parse(localStorage.getItem("user"));
        setUser(u);
    },[])

    const logoutHandler=()=>{
        localStorage.removeItem("user");
        auth.signOut();
        return navigate("/")
    }
    return(
        <div className="w-[calc(100vw - 100%)] h-[100vh] bg-[#00b9bf] gradientBackground overflow-y-auto">
            <div className="w-[calc(100vw - 100%)] h-[80px] bg-zinc-800 w-[1080px] m-auto">
                <div className="flex justify-between items-center h-[100%]">
                    <div className="flex gap-[20px] ml-[20px]">
                        <h3 className="text-[#ffffff80] hover:opacity-[0.5] cursor-pointer">Hello {user && user.clubName}!</h3>
                            <NavLink className="text-[#ffffff80] hover:opacity-[0.5]" to={"/home/code"}>Enter a code</NavLink>
                            <NavLink className="text-[#ffffff80] hover:opacity-[0.5]" to={"/home/history"}>Daily report</NavLink>
                            <NavLink className="text-[#ffffff80] hover:opacity-[0.5]" to={"/home/Add_Benefit_To_Client"}>Add Benefit</NavLink>
                    </div>
                    <h3 onClick={logoutHandler} className="text-[#ffffff80] mr-[20px] cursor-pointer hover:opacity-[0.5]">Logout</h3>
                </div>
            </div>
            <main className="w-[calc(100vw - 100%)] h-[calc(100%)] ">
                <Outlet />
            </main>
            
        </div>
    )
}