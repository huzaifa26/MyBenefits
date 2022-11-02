import { useEffect, useState } from "react";
import { userService } from "../../_services";
import moment from "moment-timezone";

export default function DailyReport(){
    let user=localStorage.getItem("user")
    user=JSON.parse(user);

    const [todayHistory,setTodayHistory]=useState();

    useEffect(()=>{
        const fetch=async()=>{
            setTodayHistory(await userService.getDailyHistory({prevDays:1}));
        }
        fetch();
    },[])

    const undoOnclick=async(id,type)=>{
        const result=await userService.undoTransaction(type,id);
    }


    return(
        <div className="flex justify-center flex-col items-center">
            {todayHistory?.length===0 &&
                <h2>No history found.</h2>
            }

            {todayHistory?.length > 0 && todayHistory.map((t,index)=>{
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const currentTime = moment(t.createDate).tz(timezone).format();
                let datetime = currentTime.slice(0, 19).replace('T', ' ');
                datetime=datetime.split(" ")
                let d=datetime[0]
                let hours=datetime[1]

                console.log(t);


                return(
                <div className="xsm:w-[80vw] w-[50vw] p-[10px] rounded-[0.25rem] border-[1px] py-[30px] mt-[35px] mb-[35px] bg-white flex flex-col gap-[15px]">
                    {t.objectType === "canceled" && 
                        <div className="flex gap-[8px] items-center w-[80%] h-[30px] bg-[#DC3545] m-auto my-0">
                            <h2 className=" text-white font-bold text-center w-[100%]">Action cancelled</h2>
                        </div>
                    }
                    
                    <div className="flex gap-[8px]">
                        <label className="font-bold xsm:text-[14px] text-[18px]">Date: </label><h2 className="xsm:text-[14px]">{d+" | "+hours}</h2>
                    </div>

                    {t.objectType !== "canceled" && 
                        <div className="flex gap-[8px]">
                            <label className="font-bold xsm:text-[14px] text-[18px]">Action: </label><h2 className="xsm:text-[14px]">{t.objectType}</h2>
                        </div>
                    }
                    
                    {t.objectType !== "canceled" && 
                        <div className="flex gap-[8px]">
                            <label className="font-bold xsm:text-[14px] text-[18px]">Bonus: </label><h2 className="xsm:text-[14px]">{t.offerDescription}</h2>
                        </div>
                    }

                    {t.objectType === "canceled" && 
                        <div className="flex gap-[8px]">
                            <label className="font-bold xsm:text-[14px] text-[18px]">Bonus: </label><h2 className="xsm:text-[14px]">{t.benefitOffer.description}</h2>
                        </div>
                    }


                    <div className="flex gap-[8px]">
                        <label className="font-bold xsm:text-[14px] text-[18px]">Customer Name: </label><h2 className="xsm:text-[14px]">{t?.customer?.firstName}</h2>
                    </div>

                    <div className="flex gap-[8px]">
                        <label className="font-bold xsm:text-[14px] text-[18px]">Phone Number: </label><h2 className="xsm:text-[14px]">{t?.customer?.phoneNo}</h2>
                    </div>

                    <div className="flex gap-[8px]">
                        <label className="font-bold xsm:text-[14px] text-[18px]">Points Reduced: </label><h2 className="xsm:text-[14px]">{t.pointsReduced || t.pointsPurchased}</h2>
                    </div>

                    <div className="flex gap-[8px]">
                        <label className="font-bold xsm:text-[14px] text-[18px]">Points left: </label><h2 className="xsm:text-[14px]">{t.pointsStatus}</h2>
                    </div>

                    {(index === 0 && t.objectType !== "canceled" && user.business_id === t.businessId) && 
                        <div className="flex place-content-center gap-[8px]">
                            <button onClick={()=>undoOnclick(t.id,t.objectType)} className="w-[50%] bg-[#DC3545] rounded-[100px] h-[40px] text-white font-bold">Undo Action</button>
                        </div>
                    }
                </div>
                )
            })

            }
        </div>
    )
}