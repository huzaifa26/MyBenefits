import { useRef } from "react";
import { userService } from "../../_services";
import {toast, ToastContainer} from "react-toastify";

export default function EnterCodeModal(props){
    const formRef=useRef();
    console.log(props);

    const approveRequestSubmitHandler=(e)=>{
        e.preventDefault();
        const fetch=async()=>{
            const res=await userService.approveRequestByID(props?.codeRes?.id,formRef.current.points.value);
            console.log(res);
            if(res.length === 0){
                toast("Invalid code");
                return
            }
            toast("Benefit redeemed for "+props?.codeRes?.customer?.firstName+" for "+formRef.current.points.value+" points",{autoClose:false});
            // console.log(props.codeRes.benefitOfferId,props.codeRes.code,formRef.current.points.value)
            // const res2=await userService.postAddBenefitToUser(props.codeRes.benefitOfferId,props.codeRes.code,formRef.current.points.value);
            // console.log(res2);
            props.hideModalHandler();
        }
        fetch();
    }

    return(
        <>
        <div className="absolute w-[100vw] ">
            <div className="w-[100vw] h-[100vh] fixed bg-[#000] opacity-50 top-0 z-10 "></div>

            <form ref={formRef} onSubmit={approveRequestSubmitHandler} className="xsm:mt-[-5%] xsm:w-[85vw] w-[43.92386530014641vw] m-auto flex flex-col items-start mt-[30px] relative z-20 bg-white rounded-[0.3rem]">
                <h2 className="font-medium pt-[5px] mb-[16px] text-[28px] p-[15px] text-[#0c5460] rounded-[0.25rem] w-[100%]  bg-[#d1ecf1] border border-[#bee5eb] xsm:text-[18px] break-words">The details of the application must be verified and approved</h2>

                <div className="flex flex-col gap-[15px] px-[15px] ">
                    <h2 className="font-bold text-[18px]">Application Details:</h2>

                    <div className="flex gap-[8px]">
                        <label className="font-medium text-[18px]">Customer Name: </label><h2>{props?.codeRes?.customer?.firstName}</h2>
                    </div>

                    <div className="flex gap-[8px]">
                        <label className="font-medium text-[18px]">Request: </label><h2>{props?.codeRes?.type}</h2>
                    </div>

                    <div className="flex gap-[8px]">
                        <label className="font-medium text-[18px]">Benefit description: </label><h2>{props?.codeRes?.offerDescription}</h2>
                    </div>

                    <div className="flex gap-[8px]">
                        <label className="font-medium text-[18px]">Remaining Points: </label><h2>{props?.codeRes?.pointsStatus}</h2>
                    </div>

                    <div className="flex gap-[8px]">
                        <label className="font-medium text-[18px]">Ammount of points: </label><input className="h-[30px] w-[15.373352855051245vw] min-w-[150px] border focus:shadow-md py-[6px] px-[12px]" required name="points" type={"number"}></input>
                    </div>
                </div>
               
                <div className="flex gap-[15px] py-[16px] text-[20px] self-center">
                    <button onClick={()=>{props.hideModalHandler()}} className="flex-1 border h-[51px] py-[8px] px-[16px]  text-[#6c757d] border-[#6c757d]">Cancel</button>
                    <button className="flex-1 border h-[51px] py-[8px] px-[16px] text-[#007bff] border-[#007bff]">Confirm</button>
                </div>
            </form>
    </div>
    </>
    )
}