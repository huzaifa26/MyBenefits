import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { userService } from "../../_services";

export default function Home(){
    const navigate=useNavigate();
    const [user,setUser]=useState();
    useEffect(()=>{
        const fetch=async()=>{
            const res=await userService.getInfo();
            console.log(res)
            setUser(res);
        }
        fetch();
    },[])

    const logoutHandler=()=>{
        localStorage.removeItem("user");
        auth.signOut();
        return navigate("/")
    }

    let style1={
        maxHeight:500,
        opacity:1,
        backgroun:"aqua"
    }

    const [navStyle,setNavStyle]=useState(false)
    const showMobileNav=()=>{
        setNavStyle(!navStyle);
    }

    return(
        <div className="w-[calc(100vw - 100%)] h-[100vh] bg-[#00b9bf] gradientBackground overflow-y-auto">
            <div className="w-[calc(100vw - 100%)] min-h-[80px] bg-zinc-800 xsm:w-[100%] w-[79.06295754026354vw] m-auto">
                <div className="flex flex-col justify-between items-center h-[100%]">
                    <div className="w-[100%] flex justify-between items-center min-h-[80px]">
                        <div className="flex gap-[20px] ml-[20px]">
                                <div onClick={showMobileNav} className="cursor-pointer hidden xsm:flex flex-col gap-[5px] shadow-[0_0px_1px_rgba(255,255,255,0.3)] rounded-[10px] p-[10px]">
                                    <div className="w-[30px] h-[2px] rounded-lg bg-[#ffffff80]"></div>
                                    <div className="w-[30px] h-[2px] rounded-lg bg-[#ffffff80]"></div>
                                    <div className="w-[30px] h-[2px] rounded-lg bg-[#ffffff80]"></div>
                                </div>
                                <h3 className="text-[#ffffff80] hover:opacity-[0.5] cursor-pointer xsm:hidden">Hello {user && user?.name}!</h3>
                                <NavLink className="text-[#ffffff80] hover:opacity-[0.5] xsm:hidden" to={"/home/code"}>Enter a code</NavLink>
                                <NavLink className="text-[#ffffff80] hover:opacity-[0.5] xsm:hidden" to={"/home/history"}>Daily report</NavLink>
                                <NavLink className="text-[#ffffff80] hover:opacity-[0.5] xsm:hidden" to={"/home/Add_Benefit_To_Client"}>Add Benefit</NavLink>
                        </div>
                        <h3 onClick={logoutHandler} className="xsm:hidden text-[#ffffff80] mr-[20px] cursor-pointer hover:opacity-[0.5]">Logout</h3>
                        <h3 className="text-[#ffffff80] hover:opacity-[0.5] cursor-pointer xsm:flex hidden mr-[1%]">Hello {user && user?.name}!</h3>
                    </div>
                    <div style={navStyle ? style1 : {}} className="flex flex-col gap-[10px] mb-[10px] animation">
                        <NavLink className="text-[#ffffff80] hidden xsm:flex text-center hover:opacity-[0.5]" to={"/home/code"}>Enter a code</NavLink>
                        <NavLink className="text-[#ffffff80] hidden xsm:flex text-center hover:opacity-[0.5]" to={"/home/history"}>Daily report</NavLink>
                        <NavLink className="text-[#ffffff80] hidden xsm:flex text-center hover:opacity-[0.5]" to={"/home/Add_Benefit_To_Client"}>Add Benefit</NavLink>
                        <h3 onClick={logoutHandler} className="hidden xsm:flex text-center text-[#ffffff80] mr-[20px] cursor-pointer hover:opacity-[0.5]">Logout</h3>
                    </div>
                </div>
            </div>
            <main className="w-[calc(100vw - 100%)] h-[calc(100%)] ">
                <Outlet />
            </main>
            
        </div>
    )
}