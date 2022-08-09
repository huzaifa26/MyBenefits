import "./BrandInfo.css";
import {db} from "./Firebase/firebase";
import { useLocation,useNavigate,Navigate} from "react-router-dom";

export default function BrandInfo(props){
    const location =useLocation();
    const navigate=useNavigate();
    if(location.state === null){
        console.log("hahah")
        return <Navigate to="/registeration" />
    }

    console.log(db);

    return(
    <div className="max-w-[1920px] w-[calc(100vw - 100%)] h-[100%] min-h-[1080px] overflow-y-hidden linearBG">
        
        <div className="flex justify-center items-center gap-[20px] max-w-[1920px] w-[calc(100vw - 100%)] h-[99.63px]">
                <div className="flex gap-[4px]">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">1</span>
                    <h2 className="text-[25px] text-[#1D262D] font-bold">Building loyalty club</h2>
                </div>

                <span className="w-[37px] h-[2px] bg-[#707070]"></span>

                <div className="flex gap-[4px]">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">2</span>
                    <h2 className="text-[25px] text-[#1D262D] font-bold">Adding Business to club</h2>
                </div>

                <span className="w-[37px] h-[2px] bg-[#707070]"></span>


                <div className="flex gap-[4px]">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#FDC11F] text-[15px] text-center rounded-full">3</span>
                    <h2 className="text-[25px] text-[#1D262D] font-bold">Define Brand</h2>
                </div>
            </div>
        
        <div className="flex w-[82.58vw] py-[20px] bg-[#1D262D] m-auto rounded-[57px]">
            <div className="flex w-[80%] m-auto">
                <div className="flex-1 flex flex-col gap-[10px] w-[80%] m-auto">
                    <h2 className="text-[35px] text-[#FDC11F] font-bold">Create Business Account</h2>
                    <input placeholder="Email" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Password" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Account Name" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Brand ID" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Business Name" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Business Address" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Phone No" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Opening Hours" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Special Opening Hours" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Contact Name" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input placeholder="Description" className="indent-[15px] w-[301px] h-[60px]"/>
                </div>
                <div className="flex-1 flex flex-col gap-[20px]">
                    <h2 className="text-[35px] text-[#FDC11F] font-bold">Brand Information</h2>
                    <input placeholder="Brand Name" className="indent-[15px] w-[301px] h-[60px]"/>
                    <textarea placeholder="Long Description" className="indent-[15px] pt-[20px] w-[539.12px] h-[181.2px]"></textarea>
                    <div className="text-[#fff]">
                        <h2 className="font-[25px] font-bold">Small Logo</h2>
                        <div className="flex justify-center items-center w-[113px] h-[89px] bg-white rounded-[18px]">
                            <input id="file1" type={"file"} className="hidden w-[301px] h-[42.76px]"/>
                            <label className="w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="file1">Upload</label>
                        </div>
                        <h2 className="font-[15px] font-bold">1:3 or square</h2>
                    </div>
                    <button className="w-[168.01px] rounded-[57px] h-[64.87px] text-[30px] bg-[#FDC11F] text-[#1D262D] font-bold">Register</button>
                </div>
            </div>
        </div>
    </div>
    )
}