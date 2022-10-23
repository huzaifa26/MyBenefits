import { getDoc ,getDocs ,doc ,collection } from "firebase/firestore";
import { useState,useEffect } from "react"
import { toast } from "react-toastify";
import AddBenefitModel from "../Model/AddBenefitModel";
import { db } from "../Firebase/firebase";
import { getMetadata } from "firebase/storage";
import { userService } from "../../_services";

export default function AddBenefit(){

    const [getDetail,setDetails]=useState("");
    const [showModal,setShowModal]=useState(false);
    const [pointValue,setPointValue]=useState();
    const [benefitsArray,setBenefitArray]=useState([]);

    const addbenefitComfirmHandler=()=>{
        if(pointValue === undefined || pointValue === ""){
            toast.warning("Please Enter Points");
            return;
        }

        if(pointValue > getDetail.points){
            toast.warning("Points value cannot be greater than benefits points.");
            return;
        }
        setShowModal(true);
        console.log(pointValue);
    }

    const closeModal=()=>{
        setShowModal(false);
    }

    useEffect(()=>{
        const fetch=async()=>{
            // const res=await userService.getRequsts();
            const res=await userService.allBusinessBenefitOffer();
            console.log(res)
            setBenefitArray(res);
        }
        fetch();
    },[])

    return(
        <>
        {showModal &&
            <AddBenefitModel item={getDetail} pointValue={pointValue} closeModal={closeModal}/>
        }
        <div className="flex xsm:flex-col-reverse justify-around xsm:gap-[50px] gap-[15px] m-auto xsm:w-[90.06295754026354vw] w-[79.06295754026354vw] pt-[30px] xsm:pb-[50px]">
            <div className="w-[30.60029282576867vw] xsm:w-[100%] rounded-[0.25rem]">
                <div className="w-[100%] h-[75px] bg-[#343440] rounded-[0.25rem] xsm:text-[18px] text-[28px] text-[#fff] font-bold flex justify-center items-center">
                    The details of the benefit
                </div>

                <div className="w-[100%] bg-white p-[16px] rounded-[0.25rem] ">
                    {getDetail === "" &&
                        <p className="pt-[16px] text-center ">Select a benefit to see its details</p>
                    }
                    {getDetail !== "" &&
                    <>
                        <h2 className="my-[16px]">
                            <span className="xsm:text-[18px] text-[28px] font-bold text-[#212529]">Benefit description:</span>
                            {getDetail.description}
                        </h2>
                        <h2 className="my-[16px]">
                            <span className="xsm:text-[18px] text-[28px] font-bold text-[#212529]">Original price:</span>
                            {getDetail.price}
                        </h2>
                        <h2 className="my-[16px]">
                            <span className="xsm:text-[18px] text-[28px] font-bold text-[#212529]">Original balance:</span>
                            {getDetail.points}
                        </h2>
                        <input max={10} onChange={(e)=>{setPointValue(e.target.value)}} className="w-[100%] focus:shadow-md my-[16px] rounded-[0.25rem] border-[1px] h-[38px] py-[6px] px-[12px] mb-[16px]" placeholder="A balance of point is desired" type={"number"}></input>
                        <div className="flex gap-[15px] py-[16px] text-[20px]">
                            <button onClick={()=>{setDetails("")}} className="flex-1 border h-[51px] py-[8px] px-[16px] text-[#6c757d] border-[#6c757d]">Cancel</button>
                            <button onClick={addbenefitComfirmHandler} className="flex-1 border h-[51px] py-[8px] px-[16px] text-[#007bff] border-[#007bff]">Confirm</button>
                        </div>
                    </>
                    }
                    <div className="p-[16px]"></div>
                </div>
            </div>
            <div className="xsm:w-[100%] w-[43.92386530014641vw] flex flex-col gap-[15px]">
                <div className="flex pl-[10px] items-center w-[100%] h-[65px] bg-[#d1ecf1] text-[#0C5460] xsm:text-[24px] text-[32px] rounded-[0.25rem]">
                    Select Benefit
                </div>
                {benefitsArray.length > 0 && 
                    benefitsArray?.map((item)=>{
                        return(
                            <div key={item.id} onClick={()=>{setDetails(item);}} className="cursor-pointer flex justify-center items-center w-[100%] h-[65px] bg-[#0069d9] text-[#fff] text-[20px] rounded-[0.25rem]">
                                {item.description}
                            </div>
                        )
                    })
                } 
            </div>
        </div>
        </>
    )
}
