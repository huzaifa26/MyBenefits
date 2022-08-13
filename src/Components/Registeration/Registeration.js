import "./Registeration.css";
import {useRef,useState} from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { Storage } from "../Firebase/firebase";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate,Navigate, Link } from "react-router-dom";

export default function Registeration({getDataFromRegisteration}){
    const navigate=useNavigate();
    const [value, setValue] = useState()

    const registerationRef=useRef();
    const [status,setStatus]=useState("")
    let data={};

    const registerationFormSubmitHandler=(e)=>{
        e.preventDefault();

        if(status===""){
            console.log(status);
            toast.dark("Please select private or public");
            return
        }
        if(value === ""){
            toast.dark("please Enter Phone number");
            return
        }
        if(largeimageURL === "" || smallimageURL === ""){
            toast.dark("Please add both Logos");
            return
        }
        if(registerationRef.current.terms.checked === false){
            toast.dark("Please agree to Terms of service & Privacy Policy");
            return
        }

        data.clubName=registerationRef.current.clubName.value;
        data.email=registerationRef.current.email.value;
        data.phoneNumber=value;
        data.status=status;
        data.description=registerationRef.current.description.value;
        data.website=registerationRef.current.website.value;
        data.extraInfo=registerationRef.current.extraInfo.value;
        data.smallLogo=smallimageURL;
        data.largeLogo=largeimageURL

        getDataFromRegisteration(data);
        navigate("/cluboffer",{state:{prevRoute:"registeration"}});
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

    const [button1IsActive,setButton1IsActive]=useState(false);
    const [button2IsActive,setButton2IsActive]=useState(false);

    return(
        <>
        <div className="max-w-[1920px] w-[calc(100vw - 100%)] h-[100%] max-h-[1080px] overflow-y-hidden linearBG">
            <img className="absolute left-[86%] top-[-500px]" src="/images/Path 28.png" alt=""/>
            <img className="absolute top-[450px] left-[-256px]" src="/images/Path 18.png" alt=""/>
            <img className="absolute top-[119px] left-[205px]" src="/images/Repeat Grid 1.png" alt=""/>
            <img className="absolute top-[749px] left-[680px]" src="/images/Group 31.png" alt=""/>
            

            <div className=" flex items-center justify-center gap-[20px] max-w-[1920px] w-[calc(100vw - 100%)] h-[99.63px]">
                
                <Link to={"/"}><img className="self-center ml-[20px] cursor-pointer" src="/images/Group 757.png" alt=""/></Link>
                
                <div className="flex justify-center items-center flex-1"    >
                    <div className="flex gap-[4px] items-center">
                        <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#FDC11F] text-[15px] text-center rounded-full">1</span>
                        <h2 className="text-[clamp(16px,1.30vw,25px)] text-[#1D262D] font-bold">Building loyalty club</h2>
                    </div>
                    <span className="w-[37px] h-[2px] bg-[#707070]"></span>
                    <div className="flex gap-[4px] items-center">
                        <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">2</span>
                        <h2 className="text-[clamp(16px,1.30vw,25px)] text-[#1D262D] font-bold">Adding Business to club</h2>
                    </div>
                    <span className="w-[37px] h-[2px] bg-[#707070]"></span>
                    <div className="flex gap-[4px] items-center">
                        <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">3</span>
                        <h2 className="text-[clamp(16px,1.30vw,25px)] text-[#1D262D] font-bold">Define Brand</h2>
                    </div>
                </div>
            </div>

            <div className="flex-row-reverse relative z-50 m-auto pt-[60px] pb-[21px] flex justify-between items-start w-[80%]">
                <img className="w-[18.07vw] self-center " src="/images/Group 7571.png" alt=""/>
                <div className="pt-[30px] w-[34.047vw] h-[899.25px] bg-[#1D262D] rounded-[57px]">
                    <form onSubmit={registerationFormSubmitHandler} ref={registerationRef} className="flex flex-col w-[80%] gap-[15px] h-[100%] m-auto">
                        <div className="flex justify-between">
                            <button type="button" onClick={(e)=>{setStatus('public');setButton1IsActive(true);setButton2IsActive(false)}} className={button1IsActive?"bg-white w-[158.14px] h-[50.78px] text-[25px] font-bold rounded-[57px]":"w-[158.14px] h-[50.78px] text-[25px] font-bold bg-[#EBBC33] rounded-[57px]"}>Public</button>
                            <span className="text-center w-[158.14px] h-[50.78px] text-[25px] font-bold text-[#EBBC33] rounded-[57px]">OR</span>
                            <button type="button" onClick={(e)=>{setStatus('private');setButton2IsActive(true);setButton1IsActive(false)}} className={button2IsActive?"bg-white w-[158.14px] h-[50.78px] text-[25px] font-bold rounded-[57px]":"w-[158.14px] h-[50.78px] text-[25px] font-bold bg-[#EBBC33] rounded-[57px]"}>Private </button>
                        </div>
                        <input name="clubName" type={"text"} required placeholder="Club Name" className="indent-[27px] w-[301px] h-[67px]"/>
                        <input name="email" type={"email"} required placeholder="Email" className="bg-[#FDC11F] indent-[27px] w-[301px] h-[67px]"/>
                        {/* <input name="phoneNumber" type={"phone"} required placeholder="Phone Number" className="indent-[27px] w-[301px] h-[67px]"/> */}
                        <PhoneInput prefix="+" buttonStyle={{height:"67px",borderRadius:"57px 0 0 57px"}} inputStyle={{width:"271px",borderRadius:"0 57px 57px 0",height:"67px"}} className="indent-[27px] w-[301px] h-[67px]" placeholder="Enter phone number" value={value} onChange={setValue}/>
                        <input name="description" type={"text"} required placeholder="Description" className="indent-[27px] w-[301px] h-[67px]"/>
                        <input name="website" type={"url"} required placeholder="Website" className="indent-[27px] w-[301px] h-[67px]"/>
                        <input name="extraInfo" type={"text"} required placeholder="Extra Information" className="indent-[27px] w-[301px] h-[67px]"/>
                        <div className="flex justify-between">
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
                        <label className="text-[15px] text-[#fff]"><input name="terms" type={"checkbox"}/> I agree to Terms of service <span className="text-[#FDC11F]">&</span> Privacy Policy</label>
                        <button type="submit" className="w-[8.750vw] rounded-[57px] h-[64.87px] text-[clamp(18px,1.562vw,30px)] self-center bg-[#FDC11F] text-[#1D262D] font-bold">Register</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}