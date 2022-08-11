import { Link, NavLink, Outlet } from "react-router-dom";

export default function Home(){
    return(
        <>
            <div className="w-[calc(100vw - 100%)] h-[80px] bg-zinc-800">
                <div>
                    <NavLink to={"/home/code"}>Enter a code</NavLink>
                    <NavLink to={"/home/history"}>Daily report</NavLink>
                    <NavLink to={"/home/Add_Benefit_To_Client"}>Add Benefit</NavLink>
                </div>
            </div>
            <Outlet />
        </>
    )
}