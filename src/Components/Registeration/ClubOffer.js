import "./ClubOffer.css";
import { useLocation,useNavigate,Navigate, Link} from "react-router-dom";
import { useRef, useState } from "react";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { Storage } from "../Firebase/firebase";
import { ToastContainer, toast } from 'react-toastify';
import { clubOffer } from "../../_services";


export default function ClubOffer({getDataFromClubOffer}){
    const location =useLocation();
    const navigate=useNavigate();
    const clubOfferRef=useRef();

    const [button1IsActive,setButton1IsActive]=useState(false);
    const [button2IsActive,setButton2IsActive]=useState(false);
    const [button3IsActive,setButton3IsActive]=useState(false);


    const [descriptionLength,setdescriptionLength]=useState(false);
    const [longdescriptionLength,setlongdescriptionLength]=useState(false);

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
        })
        e.target.value="";
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
        e.target.value="";
    }


    const [benefitArray,setBenefitArray]=useState([]);
    const [benefitType,setBenefitType]=useState("");
    const clubOfferSubmitHandler=(e)=>{
        e.preventDefault();

        if(benefitType === ""){
            toast.error("Please select benefit type.");
            return
        }

        if(clubOfferRef.current.possiblePurchase.value === "choose option"){
            toast.error("Please choose option from Possible Purchase.");
            return
        }

        // if(largeimageURL === "" || smallimageURL === ""){
        //     toast.error("Please add both Logos");
        //     return
        // }

        let data={
            price:clubOfferRef.current.price.value,
            points:clubOfferRef.current.points.value,
            possiblePurchases:clubOfferRef.current.possiblePurchase.value === "null"? null:clubOfferRef.current.possiblePurchase.value,
            discountAmount:clubOfferRef.current.discount.value,
            description:clubOfferRef.current.description.value,
            longDescription:clubOfferRef.current.longDescription.value,
            smallPicturlUrl:smallimageURL,
            LargePicturlUrl:largeimageURL,
            type:benefitType,
        }

        console.log(data);
        setBenefitArray((prev)=>{
            return [...prev,data];
        });
        toast("Benefit Added");
        clearValues();
    }

    const clearValues=()=>{
        setBenefitType("");
        clubOfferRef.current.price.value=""
        clubOfferRef.current.points.value=""
        clubOfferRef.current.possiblePurchase.value=""
        clubOfferRef.current.discount.value=""
        clubOfferRef.current.description.value=""
        clubOfferRef.current.longDescription.value=""
        setsmallImageURL("");
        setlargeImageURL("");
        setAllFalse();
    }

    const gotoNextPage=async()=>{

        if(clubOfferRef.current.price.value !== "" || 
        clubOfferRef.current.points.value !== "" || 
        // clubOfferRef.current.possiblePurchase.value !== "" || 
        clubOfferRef.current.discount.value !== "" || 
        clubOfferRef.current.description.value !== "" || 
        clubOfferRef.current.longDescription.value !== "" ){
            toast("Please add existing benefit before proceeding")
            return
        }

        console.log(benefitArray)
        if(benefitArray.length === 0){
            toast.error("Please add Benefit before proceeding.");
            return
        }

        getDataFromClubOffer(benefitArray);
        navigate("/brandinfo",{state:{prevRoute:"cluboffer"}});
    }

    // // Clearing the location.state.prevRoute if user directly enter route in browser bar. i-e it enforce registeration flow.
    // window.onbeforeunload = function(event){
    //     window.history.replaceState({},document.title);
    // }

    // // Code to redirect to registertation route when user manually enter /cluboffer route
    // if(location.state === null || location.state.prevRoute !== "registeration"){
    //     return <Navigate to="/registeration" />
    // }

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


            <div className="relative z-40 m-auto pt-[60px] pb-[21px] flex justify-between items-start w-[80%]">
            <div className="w-[43.51vw] h-[800.25px] bg-[#1D262D] rounded-[57px]">
                    <form ref={clubOfferRef} onSubmit={clubOfferSubmitHandler} className="flex flex-wrap items-center x gap-x-[4.1666vw] xl:w-[95%] w-[80%] h-[100%] m-auto">
                        <div className="flex justify-between gap-[10px]">
                            <button type="button" onClick={()=>{setBenefitType("prepaid");setAllFalse();setButton1IsActive(true);}} className={button1IsActive ?"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px]":"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Prepaid</button>
                            <button type="button" onClick={()=>{setBenefitType("punch");setAllFalse();setButton2IsActive(true);}} className={button2IsActive ?"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px]":"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Punchchard</button>
                            <button type="button" onClick={()=>{setBenefitType("free");setAllFalse();setButton3IsActive(true);}} className={button3IsActive ?"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px]":"w-[10.748vw] h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Free</button>
                        </div>
                        <div className="inline-block">
                            {/* <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Price</label> */}
                            <input type={"number"} min="0" name="price" placeholder="Price" required className="indent-[27px] w-[14.85vw] h-[42.76px]"/>
                        </div>

                        <div className="inline-block">
                            {/* <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Points</label> */}
                            <input type={"number"} name="points" placeholder="Points" required className="indent-[27px] w-[14.85vw] h-[42.76px]"/>
                        </div>
                        

                        <div>
                            {/* <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Possible Purchase</label> */}
                            <select name="possiblePurchase" required className="indent-[27px] rounded-[57px] w-[14.85vw] h-[42.76px]">
                                <option disabled selected value={"choose option"}>Possible Purchase</option>
                                <option value={"1"}>1</option>
                                <option value={'null'}>Endless</option>
                            </select>
                        </div>

                        <div>
                            {/* <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Discount Ammount</label> */}
                            <input type={"number"} name="discount" required placeholder="Discount Ammount" className="indent-[27px] w-[14.85vw] h-[42.76px]"/>
                        </div>

                        <div>
                            {/* <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Description</label> */}
                            <textarea placeholder="Description" onChange={(e)=>{setdescriptionLength(e.target.value)}} maxLength={30} name="description" rows='3' className="indent-[27px] pt-[10px] w-[29.21vw]"></textarea>
                            <p className="text-white text-[12px] text-right">{ descriptionLength?.length || 0}/30</p>
                        </div>

                        <div>
                            {/* <label className="text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold block">Long Description</label> */}
                            <textarea placeholder="Long Description" onChange={(e)=>{setlongdescriptionLength(e.target.value)}} maxLength={150} name="longDescription" rows='6' className="indent-[27px] pt-[10px] w-[29.21vw]"></textarea>
                            <p className="text-white text-[12px] text-right">{longdescriptionLength?.length || 0}/150</p>
                        </div>


                        <div className="flex justify-between w-[100%]">
                            <div className="flex gap-[20px]">
                                <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                                    <h2 className="font-[25px] font-bold ">Small Logo</h2>
                                    <div className="flex justify-center items-center w-[119px] h-[89px] bg-white rounded-[18px]">
                                        <input defaultValue={smallimageURL} onChange={smallImageHandler} name="img1" id="files1" type={"file"} className="hidden w-[301px] h-[42.76px]"/>
                                        <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files1">Upload</label>
                                    </div>
                                    <h2 className="font-[15px] font-bold text-center">80*80 or square</h2>
                                </div>

                                <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                                    <h2 className="font-[25px] font-bold ">Bid Logo</h2>
                                    <div className="flex justify-center items-center w-[129px] h-[119px] bg-white rounded-[18px]">
                                        <input defaultValue={largeimageURL} onChange={largeImageHandler} name="img2" id="files2" type={"file"} className="hidden w-[301px] h-[42.76px]"/>
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
                
                <img className="w-[37.13vw] sm:hidden xsm:hidden md:hidden self-center" src={"./images/Repeat Grid 3.svg"} alt=""/>
            </div>
            <div onClick={gotoNextPage} className="z-50 cursor-pointer flex items-center gap-[10px] absolute top-[83%] left-[54%]">
                <button  className="bg-transparent text-[23px] font-bold text-[#FDC11F]">Next</button>
                <img src="/images/Repeat Grid 4.png" alt=""/>
            </div>
        </div>
    )
}