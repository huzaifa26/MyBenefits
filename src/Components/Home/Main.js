import {useState} from "react";
import { userService } from "../../_services";
import { toast } from "react-toastify";
import EnterCodeModal from "../Model/EnterCodeModal";

export default function Main(){

    const [codeRes,setCodeRes]=useState();
    const [code,setCode]=useState('');

    const numericBtnHandler=(e)=>{
        if(e.target.value === "clear"){
            setCode("");
            return
        }

        if(e.target.value === "delete"){
            setCode(code.substring(0,code.length-1));
            return
        }

        setCode((prevState)=>{
            return prevState+=e.target.value;
        })
    }

    const [showMainModal,setShowMainModal]=useState(false);

    const hideModalHandler=()=>{
        setShowMainModal(false);
    }

    const submitCodeHandler=()=>{
        const fetch=async()=>{
            const res=await userService.getRequestByCode(code)
            console.log(res);
            if(res.status === "NOT_FOUND" || res.length === 0){
                toast("Invalid code");
                return
            }
            setCodeRes(res);
            setShowMainModal(true);
            // setTodayHistory(await userService.getRequestByCode(code));
        }
        fetch();
    }

    return(
        <>
        {showMainModal  &&
            <EnterCodeModal codeRes={codeRes} hideModalHandler={hideModalHandler}/>
        }
        <div  className="xsm:w-[85vw] w-[43.92386530014641vw] m-auto flex flex-col items-center">
            <h2 className="mt-[30px] flex items-center mb-[16px] xsm:text-[24px] text-[32px] text-[#0c5460] rounded-[0.25rem] w-[100%] h-[65px] bg-[#d1ecf1] border border-[#bee5eb]">Enter or scan a code</h2>
            <input className="w-[285px] h-[70px] !rounded-[0.3rem] border-[1px] border-black bg-[#e9ecef] text-[32px] indent-2" type={"text"} disabled value={code}></input>

            <div className="xsm:mt-[30px] mt-[1.5rem] xsm:w-[85vw] w-[43.92386530014641vw] flex flex-wrap border-collapse justify-center">
                <button onClick={numericBtnHandler} value={"1"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">1</button>
                <button onClick={numericBtnHandler} value={"2"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">2</button>
                <button onClick={numericBtnHandler} value={"3"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">3</button>
                <button onClick={numericBtnHandler} value={"4"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">4</button>
                <button onClick={numericBtnHandler} value={"5"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">5</button>
                <button onClick={numericBtnHandler} value={"6"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">6</button>
                <button onClick={numericBtnHandler} value={"7"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">7</button>
                <button onClick={numericBtnHandler} value={"8"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">8</button>
                <button onClick={numericBtnHandler} value={"9"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">9</button>
                <button onClick={numericBtnHandler} value={"clear"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 xsm:text-[24px] text-[40px] text-[#212529] bg-[#DC3545] py-[6px] px-[12px]">Clear</button>
                <button onClick={numericBtnHandler} value={"delete"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 xsm:text-[24px] text-[40px] text-[#212529]">Delete</button>
                <button onClick={numericBtnHandler} value={"0"} className="w-1/3 hover:text-white xsm:py-[0px] py-[6px] xsm:px-[0px] px-[12px] min-w-[90.6px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">0</button>
            </div>
            <button onClick={submitCodeHandler} className="rounded-full mt-[20px] xsm:w-[85vw] w-[43.92386530014641vw] h-[50px] bg-[#EBBC33] text-[22px] text-white">Submit</button>
        
        </div>
        </>
    )
}