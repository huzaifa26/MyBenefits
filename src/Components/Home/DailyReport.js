import { useEffect, useState } from "react";
import { userService } from "../../_services";
export default function DailyReport(){

    const [todayHistory,setTodayHistory]=useState();

    useEffect(()=>{
        userService.getDailyHistory()
    },)

    return(
        <div>DailyReport</div>
    )
}