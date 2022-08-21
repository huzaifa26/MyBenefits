import "./BrandInfo.css";
import { useLocation,useNavigate,Navigate} from "react-router-dom";
import { useRef, useState } from "react";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { Storage } from "../Firebase/firebase";
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { addBrand, addbusinessToClub, brandInfo, clubOffer } from "../../_services";

export default function BrandInfo({getDataFromBrandInfo,benefitArrayFC}){
    const location =useLocation();
    const navigate=useNavigate();
    const brandInfoRef=useRef();

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
        })
        e.target.value="";
    }

    const [value, setValue] = useState()


    const brandInfoSubmitHandler=async(e)=>{
        e.preventDefault();

        if(value === ""){
            toast.dark("please Enter Phone number");
            return
        }
        // if(smallimageURL === ""){
        //     toast.dark("Please add Logo");
        //     return
        // }

        let brandData={
            name:brandInfoRef.current.brandName.value,
            description:brandInfoRef.current.brandName.value,
            // logoUrl:brandInfoRef?.current?.smallimageURL?.value,
            logoUrl:smallimageURL,
        }

        let brand;
        try{
            brand=await addBrand(brandData);
            brand=(JSON.parse(brand));
        }catch(err){
            console.log(err);
        }

        let data={
            email:brandInfoRef.current.email.value,
            password:brandInfoRef.current.password.value,
            name:brandInfoRef.current.accountName.value,
            brandId:brand.id,
            information:{
                name:brandInfoRef.current.businessName.value,
                address:brandInfoRef.current.businessAddress.value,
                phone:value,
                openingHours1:brandInfoRef.current.openingHours.value,
                openingHours2:brandInfoRef.current.specialOpeningHours.value,
                contactName:brandInfoRef.current.contactName.value,
                description:brandInfoRef.current.description.value,
                picture_url:smallimageURL,
                brandInfoSmallLogo:smallimageURL,
            }
        }
        let business;
        try{
            business=await brandInfo(data);
            business=(JSON.parse(business));
            let addbusinesstoclub=await addbusinessToClub(business);
            console.log(addbusinesstoclub);
            for(let i = 0;i<benefitArrayFC.length;i++){
                try{
                    benefitArrayFC[i].businessId=business.id;
                    console.log(benefitArrayFC[i])
                    let benefits=await clubOffer(benefitArrayFC[i]);
                    // console.log(benefits);
                }catch(err){
                    console.log(err);
                }
            }
        }catch(err){
            console.log(err);
        }

        
    }

    // // Clearing the location.state.prevRoute if user directly enter route in browser bar. i-e it enforce registeration flow.
    // window.onbeforeunload = function(event){
    //     window.history.replaceState({},document.title);
    // }

    // // Code to redirect to registertation route when user manually enter /brandinfo route
    // if(location.state === null || location.state.prevRoute !== "cluboffer"){
    //     return <Navigate to="/registeration" />
    // }

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
            <form ref={brandInfoRef} onSubmit={brandInfoSubmitHandler} className="flex w-[80%] m-auto">
                <div className="flex-1 flex flex-col gap-[10px] w-[80%] m-auto">
                    <h2 className="text-[35px] text-[#FDC11F] font-bold">Create Business Account</h2>
                    <input type={"email"} name="email" required placeholder="Email" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input type={"password"} name="password" required placeholder="Password" className="bg-[#FDC11F] indent-[15px] w-[301px] h-[60px]"/>
                    <input type={"text"} name="accountName" required placeholder="Account Name" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input type={"text"} name="brandID" required placeholder="Brand ID" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input type={"text"} name="businessName" required placeholder="Business Name" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input type={"address"} name="businessAddress" required placeholder="Business Address" className="indent-[15px] w-[301px] h-[60px]"/>
                    {/* <input name="" required placeholder="Phone No" className="indent-[15px] w-[301px] h-[60px]"/> */}
                    <PhoneInput prefix="+" buttonStyle={{height:"67px",borderRadius:"57px 0 0 57px"}} inputStyle={{width:"271px",borderRadius:"0 57px 57px 0",height:"67px"}} className="indent-[27px] w-[301px] h-[67px]" placeholder="Enter phone number" value={value} onChange={setValue}/>
                    <input type={"number"} name="openingHours" required placeholder="Opening Hours" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input type={"number"} name="specialOpeningHours" required placeholder="Special Opening Hours" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input type={"text"} name="contactName" required placeholder="Contact Name" className="indent-[15px] w-[301px] h-[60px]"/>
                    <input type={"text"} name="description" required placeholder="Description" className="indent-[15px] w-[301px] h-[60px]"/>
                </div>
                <div className="flex-1 flex flex-col gap-[20px]">
                    <h2 className="text-[35px] text-[#FDC11F] font-bold">Brand Information</h2>
                    <input type={'text'} name="brandName" placeholder="Brand Name" className="indent-[15px] w-[301px] h-[60px]"/>
                    <textarea name="longDescription" placeholder="Long Description" className="indent-[15px] pt-[20px] w-[539.12px] h-[181.2px]"></textarea>
                    <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                        <h2 className="font-[25px] font-bold ">Small Logo</h2>
                        <div className="flex justify-center items-center w-[119px] h-[89px] bg-white rounded-[18px]">
                            <input defaultValue={smallimageURL} onChange={smallImageHandler} name="img1" id="files1" type={"file"} className="hidden w-[301px] h-[42.76px]"/>
                            <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files1">Upload</label>
                        </div>
                        <h2 className="font-[15px] font-bold">80*80 or square</h2>
                    </div>
                    <button type="submit" className="w-[168.01px] rounded-[57px] h-[64.87px] text-[30px] bg-[#FDC11F] text-[#1D262D] font-bold">Register</button>
                </div>
            </form>
        </div>
    </div>
    )
}