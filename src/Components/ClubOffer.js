import "./ClubOffer.css";
import { useLocation,useNavigate,Navigate} from "react-router-dom";
import { useRef, useState } from "react";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { Storage } from "./Firebase/firebase";
import { ToastContainer, toast } from 'react-toastify';


export default function ClubOffer(){
    const location =useLocation();
    const navigate=useNavigate();
    const clubOfferRef=useRef();

    const [button1IsActive,setButton1IsActive]=useState(false);
    const [button2IsActive,setButton2IsActive]=useState(false);
    const [button3IsActive,setButton3IsActive]=useState(false);

    const setAllFalse=()=>{
        setButton1IsActive(false);
        setButton2IsActive(false);
        setButton3IsActive(false);
    }

    const [smallimageURL , setsmallImageURL] = useState('');
    const smallImageHandler= async (e)=>{
        console.log(e.target.files);
        
        if(e.target.files[0] == null)
            return;

        const storageRef = ref(Storage, `/logos/${e.target.files[0].name}`);

        toast.loading("Uploading Image");
        try{
            const uploadTask = await uploadBytes(storageRef, e.target.files[0]);
            toast.dismiss();
            toast.success("Image Uploaded")
        }catch(e){
            toast.dismiss();
            toast.error("Failed");
        }
        
        getDownloadURL(ref(Storage, `/logo/${e.target.files[0].name}`)).then((url) => {
            console.log(url);
            setsmallImageURL(url);
        }).catch((err)=>{

        });
    }


    const [largeimageURL , setlargeImageURL] = useState('');
    const largeImageHandler= async (e)=>{
        console.log(e.target.files);
        
        if(e.target.files[0] == null)
            return;

        const storageRef = ref(Storage, `/logo/${e.target.files[0].name}`);
        toast.loading("Uploading Image");
        try{
            const uploadTask = await uploadBytes(storageRef, e.target.files[0]);
            toast.dismiss();
            toast.success("Image Uploaded")
        }catch(e){
            toast.dismiss();
            toast.error("Failed");
        }
        
        getDownloadURL(ref(Storage, `/logo/${e.target.files[0].name}`)).then((url) => {
            console.log(url);
            setlargeImageURL(url);
        });
    }

    const clubOfferSubmitHandler=(e)=>{
        e.preventDefault();
        console.log(clubOfferRef.current.possiblePurchase.value);
    }

    if(location.state === null){
        return <Navigate to="/registeration" />
    }
    return(
        <div className="max-w-[1920px] w-[calc(100vw - 100%)] h-[100%] max-h-[1080px] overflow-y-hidden linearBG">
            <div className="flex justify-center items-center gap-[20px] max-w-[1920px] w-[calc(100vw - 100%)] h-[99.63px]">
                <div className="flex gap-[4px]">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">1</span>
                    <h2 className="text-[clamp(16px,1.302vw,25px)] text-[#1D262D] font-bold">Building loyalty club</h2>
                </div>

                <span className="w-[37px] h-[2px] bg-[#707070]"></span>

                <div className="flex gap-[4px]">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#FDC11F] text-[15px] text-center rounded-full">2</span>
                    <h2 className="text-[clamp(16px,1.302vw,25px)] text-[#1D262D] font-bold">Adding Business to club</h2>
                </div>

                <span className="w-[37px] h-[2px] bg-[#707070]"></span>

                <div className="flex gap-[4px]">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">3</span>
                    <h2 className="text-[clamp(16px,1.302vw,25px)] text-[#1D262D] font-bold">Define Brand</h2>
                </div>
            </div>


            <div className="relative z-50 m-auto pt-[60px] pb-[21px] flex justify-between items-start w-[80%]">
            <div className="w-[43.51vw] h-[909.25px] bg-[#1D262D] rounded-[57px]">
                    <form ref={clubOfferRef} onSubmit={clubOfferSubmitHandler} className="flex flex-wrap items-center x gap-x-[4.1666vw] xl:w-[95%] w-[80%] h-[100%] m-auto">
                        <div className="flex justify-between gap-[10px]">
                            <button onClick={()=>{setAllFalse();setButton1IsActive(true);}} className={button1IsActive ?"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px]":"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Prepaid</button>
                            <button onClick={()=>{setAllFalse();setButton2IsActive(true);}} className={button2IsActive ?"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px]":"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Punchchard</button>
                            <button onClick={()=>{setAllFalse();setButton3IsActive(true);}} className={button3IsActive ?"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px]":"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Free</button>
                        </div>
                        <div className="inline-block">
                            <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Price</label>
                            <input name="price" required className="indent-[27px] w-[14.85vw] h-[42.76px]"/>
                        </div>

                        <div className="inline-block">
                            <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Points</label>
                            <input name="points" required className="indent-[27px] w-[14.85vw] h-[42.76px]"/>
                        </div>

                        <div>
                            <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Possible Purchase</label>
                            {/* <input name="possiblePurchase" required className="w-[14.85vw] h-[42.76px]"/> */}
                            <select name="possiblePurchase" required className="indent-[27px] rounded-[57px] w-[14.85vw] h-[42.76px]">
                                <option disabled selected value={"choose option"}>Choose Option</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Discount Ammount</label>
                            <input name="discount" required className="indent-[27px] w-[14.85vw] h-[42.76px]"/>
                        </div>

                        <div>
                            <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Description</label>
                            <textarea rows='3' className="indent-[27px] pt-[10px] w-[29.21vw]"></textarea>
                        </div>

                        <div>
                            <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Long Description</label>
                            <textarea rows='6' className="indent-[27px] pt-[10px] w-[29.21vw]"></textarea>
                        </div>

                        
                        <div className="flex justify-between w-[100%]">
                            <div className="flex gap-[20px]">
                                <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                                    <h2 className="font-[25px] font-bold ">Bid Logo</h2>
                                    <div className="flex justify-center items-center w-[119px] h-[89px] bg-white rounded-[18px]">
                                        <input onChange={smallImageHandler} name="img1" id="files1" type={"file"} className="hidden w-[301px] h-[42.76px]"/>
                                        <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files1">Upload</label>
                                    </div>
                                    <h2 className="font-[15px] font-bold text-center">80*80 or square</h2>
                                </div>

                                <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                                    <h2 className="font-[25px] font-bold ">Bid Logo</h2>
                                    <div className="flex justify-center items-center w-[129px] h-[119px] bg-white rounded-[18px]">
                                        <input onChange={largeImageHandler} name="img2" id="files2" type={"file"} className="hidden w-[301px] h-[42.76px]"/>
                                        <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files2">Upload</label>
                                    </div>
                                    <h2 className="font-[15px] font-bold text-center">80*80 or square</h2>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-[10px]">
                                <button type="submit" className="w-[140px] h-[34px] bg-[#FDC11F] border-[1px] border-[#707070]">Add Benefits</button>
                                <img src="/images/Group 771.png" alt=""/>
                            </div>
                        </div>
                    </form>
                </div>
                
                <img className="w-[37.13vw] sm:hidden xsm:hidden md:hidden self-center" src="/images/Repeat Grid 3.svg" alt=""/>
            </div>
        </div>
    )
}