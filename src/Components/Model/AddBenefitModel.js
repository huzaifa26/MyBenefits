import { useRef, useState } from "react";
import {toast} from "react-toastify";
import { addBenefit, userService } from "../../_services";

export default function AddBenefitModel(props){

    const [code,setCode]=useState("");

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
    console.log(props);


    const formSubmitHandler=(e)=>{
        e.preventDefault();
        if(code === ""){
            toast("Please enter code to proceed");
        }
        let data={
            pointsStatus:props.pointValue,
            code:code,
            benefitOfferId:props.item.id
        }
        
        const fetch=async()=>{
            let res=await addBenefit(data)
            res=JSON.parse(res)
            console.log(res);
            if(res.hasOwnProperty("id")){
                toast("Request Approved");
                props.closeModal();
            }else{
                toast("Request approval error");
            }
        }
        fetch();
    }

    return(
        <div className="absolute w-[100vw]">
            <div className="w-[100vw] h-[100vh] fixed bg-[#000] opacity-50 top-0 z-10 "></div>
            <form onSubmit={formSubmitHandler} className="w-[600px] m-auto flex flex-col items-center relative z-20 bg-white rounded-[0.3rem]">
                <h2 className="pt-[5px] mb-[16px] text-[32px] text-[#0c5460] rounded-[0.25rem] w-[100%] h-[65px]  bg-[#d1ecf1] border border-[#bee5eb]">Enter or scan a code</h2>
                <input required name="code" className="text-[24px] pl-[20px] w-[95%] h-[70px] !rounded-[0.3rem] border-[1px] border-black bg-[#e9ecef]" type={"text"} disabled value={code}></input>

                <div className=" flex flex-wrap border-collapse justify-center">
                    <button type="button" onClick={numericBtnHandler} value={"1"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">1</button>
                    <button type="button" onClick={numericBtnHandler} value={"2"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">2</button>
                    <button type="button" onClick={numericBtnHandler} value={"3"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">3</button>
                    <button type="button" onClick={numericBtnHandler} value={"4"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">4</button>
                    <button type="button" onClick={numericBtnHandler} value={"5"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">5</button>
                    <button type="button" onClick={numericBtnHandler} value={"6"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">6</button>
                    <button type="button" onClick={numericBtnHandler} value={"7"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">7</button>
                    <button type="button" onClick={numericBtnHandler} value={"8"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">8</button>
                    <button type="button" onClick={numericBtnHandler} value={"9"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">9</button>
                    <button type="button" onClick={numericBtnHandler} value={"clear"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529] bg-[#DC3545] py-[6px] px-[12px]">Clear</button>
                    <button type="button" onClick={numericBtnHandler} value={"delete"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">Delete</button>
                    <button type="button" onClick={numericBtnHandler} value={"0"} className="hover:text-white py-[6px] px-[12px] w-[190px] h-[74px] border-[1px] border-black border-collapse hover:bg-[#343a40] transition-all duration-200 text-[40px] text-[#212529]">0</button>
                </div>
                <div className="flex gap-[15px] py-[16px] text-[20px]">
                    <button type="button" onClick={()=>{props.closeModal()}} className="flex-1 border h-[51px] py-[8px] px-[16px] text-[#6c757d] border-[#6c757d]">Cancel</button>
                    <button type="submit" className="flex-1 border h-[51px] py-[8px] px-[16px] text-[#007bff] border-[#007bff]">Confirm</button>
                </div>
            </form>
    </div>
    )
}