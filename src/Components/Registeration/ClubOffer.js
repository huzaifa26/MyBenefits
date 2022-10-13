import "./ClubOffer.css";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Storage } from "../Firebase/firebase";
import { ToastContainer, toast } from 'react-toastify';
import { clubOffer } from "../../_services";


export default function ClubOffer({ getDataFromClubOffer }) {
    const location = useLocation();
    const navigate = useNavigate();
    const clubOfferRef = useRef();

    let [disableBtn,setDisableBtn]=useState(false);

    const [button1IsActive, setButton1IsActive] = useState(false);
    const [button2IsActive, setButton2IsActive] = useState(false);
    const [button3IsActive, setButton3IsActive] = useState(false);
    const [showBenefits,setShowBenefits]=useState(false);


    const [descriptionLength, setdescriptionLength] = useState(false);
    const [longdescriptionLength, setlongdescriptionLength] = useState(false);

    const setAllFalse = () => {
        setButton1IsActive(false);
        setButton2IsActive(false);
        setButton3IsActive(false);
    }

    const [smallimageURL, setsmallImageURL] = useState('');
    const smallImageHandler = async (e) => {
        console.log(e.target.files);

        if (e.target.files[0] == null)
            return;

        const storageRef = ref(Storage, `/logos/${e.target.files[0].name}`);

        toast.loading("Uploading Image");
        try {
            const uploadTask = await uploadBytes(storageRef, e.target.files[0]);
            toast.dismiss();
            toast.success("Image Uploaded");
            setDisableBtn(false)
        } catch (e) {
            toast.dismiss();
            toast.error("Failed");
            setDisableBtn(false)
        }

        getDownloadURL(ref(Storage, `/logo/${e.target.files[0].name}`)).then((url) => {
            console.log(url);
            setsmallImageURL(url);
        })
        e.target.value = "";
    }

    const [largeimageURL, setlargeImageURL] = useState('');
    const largeImageHandler = async (e) => {
        console.log(e.target.files);

        if (e.target.files[0] == null)
            return;

        const storageRef = ref(Storage, `/logo/${e.target.files[0].name}`);
        toast.loading("Uploading Image");
        try {
            const uploadTask = await uploadBytes(storageRef, e.target.files[0]);
            toast.dismiss();
            toast.success("Image Uploaded")
            setDisableBtn(false)
        } catch (e) {
            toast.dismiss();
            toast.error("Failed");
            setDisableBtn(false)
        }

        getDownloadURL(ref(Storage, `/logo/${e.target.files[0].name}`)).then((url) => {
            console.log(url);
            setlargeImageURL(url);
        });
        e.target.value = "";
    }


    const [benefitArray, setBenefitArray] = useState([]);
    const [benefitType, setBenefitType] = useState("");
    const clubOfferSubmitHandler = (e) => {
        e.preventDefault();

        if (benefitType === "") {
            toast.error("Please select benefit type.");
            return
        }

        if (clubOfferRef.current.possiblePurchase.value === "choose option") {
            toast.error("Please choose option from Possible Purchase.");
            return
        }

        // if(largeimageURL === "" || smallimageURL === ""){
        //     toast.error("Please add both Logos");
        //     return
        // }

        let data = {
            price: clubOfferRef.current.price.value,
            points: clubOfferRef.current.points.value,
            possiblePurchases: clubOfferRef.current.possiblePurchase.value === "null" ? null : clubOfferRef.current.possiblePurchase.value,
            discountAmount: clubOfferRef.current.discount.value,
            description: clubOfferRef.current.description.value,
            longDescription: clubOfferRef.current.longDescription.value,
            smallPicturlUrl: smallimageURL,
            LargePicturlUrl: largeimageURL,
            type: benefitType,
        }

        console.log(data);
        setBenefitArray((prev) => {
            return [...prev, data];
        });
        toast("Benefit Added");
        clearValues();
    }

    const clearValues = () => {
        setBenefitType("");
        clubOfferRef.current.price.value = ""
        clubOfferRef.current.points.value = ""
        clubOfferRef.current.possiblePurchase.value = ""
        clubOfferRef.current.discount.value = ""
        clubOfferRef.current.description.value = ""
        clubOfferRef.current.longDescription.value = ""
        setsmallImageURL("");
        setlargeImageURL("");
        setAllFalse();
    }

    const gotoNextPage = async () => {

        if (clubOfferRef.current.price.value !== "" ||
            clubOfferRef.current.points.value !== "" ||
            // clubOfferRef.current.possiblePurchase.value !== "" || 
            clubOfferRef.current.discount.value !== "" ||
            clubOfferRef.current.description.value !== "" ||
            clubOfferRef.current.longDescription.value !== "") {
            toast("Please add existing benefit before proceeding")
            return
        }

        console.log(benefitArray)
        if (benefitArray.length === 0) {
            toast.error("Please add Benefit before proceeding.");
            return
        }

        getDataFromClubOffer(benefitArray);
        navigate("/brandinfo", { state: { prevRoute: "cluboffer" } });
    }

    // // Clearing the location.state.prevRoute if user directly enter route in browser bar. i-e it enforce registeration flow.
    // window.onbeforeunload = function(event){
    //     window.history.replaceState({},document.title);
    // }

    // // Code to redirect to registertation route when user manually enter /cluboffer route
    // if(location.state === null || location.state.prevRoute !== "registeration"){
    //     return <Navigate to="/registeration" />
    // }

    console.log(benefitArray);

    return (
        <div className="max-w-[1920px] w-[calc(100vw - 100%)] h-[100%] min-h-[100vh] overflow-y-hidden linearBG pb-[80px]">
            <div className="flex justify-center items-center gap-[20px] max-w-[1920px] w-[calc(100vw - 100%)] h-[9.225vh] min-h-[70px] max-h-[99px]">
                <div className="flex gap-[4px] xsm:hidden sm:hidden">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">1</span>
                    <h2 className="text-[clamp(16px,1.302vw,25px)] flex items-center text-[#1D262D] font-bold">Building loyalty club</h2>
                </div>

                <span className="w-[37px] h-[2px] bg-[#707070] xsm:hidden sm:hidden"></span>

                <div className="flex gap-[4px]">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#FDC11F] text-[15px] text-center rounded-full">2</span>
                    <h2 className="text-[clamp(16px,1.302vw,25px)] flex items-center text-[#1D262D] font-bold">Adding Business to club</h2>
                </div>

                <span className="w-[37px] h-[2px] bg-[#707070] xsm:hidden sm:hidden"></span>

                <div className="flex gap-[4px] xsm:hidden sm:hidden">
                    <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">3</span>
                    <h2 className="text-[clamp(16px,1.302vw,25px)] flex items-center text-[#1D262D] font-bold">Define Brand</h2>
                </div>
            </div>


            <div className="relative z-40 m-auto pt-[3.0462962962962963vh] pb-[21px] flex justify-between items-start w-[80%] xsm:w-[95%] sm:w-[80%]">
                <div className="pb-[2.6574074074074074vh] pt-[2vh] xsm:flex-1 sm:flex-1 w-[43.51vw] py-[10px] bg-[#1D262D] rounded-[57px]">
                    <form ref={clubOfferRef} onSubmit={clubOfferSubmitHandler} className="flex gap-[10px] flex-wrap items-center xsm:justify-center sm:justify-center x gap-x-[4.1666vw] xl:w-[95%] xsm:w-[100%] sm:w-[100%] w-[80%] h-[100%] m-auto">
                        <div className="flex justify-between gap-[10px]">
                            <button type="button" onClick={() => { setBenefitType("prepaid"); setAllFalse(); setButton1IsActive(true); }} className={button1IsActive ? "flex justify-center items-center gap-[5px] w-[10.748vw] h-[4.701851851851852vh] min-h-[30px] max-h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px] min-w-[80px] xsm:min-w-[25vw] sm:min-w-[20vw] xsm:text-[14px]" : "flex justify-center items-center gap-[5px] xsm:text-[14px] min-w-[80px] xsm:min-w-[25vw] sm:min-w-[20vw] w-[10.748vw] h-[4.701851851851852vh] min-h-[30px] max-h-[50.78px] text-[clamp(14px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Prepaid <div data-title="button 1" className="helpDiv"><img className="w-[1.6473958333333334vw] min-w-[20px]" src="./images/black-mark-center.png"/></div></button>
                            <button type="button" onClick={() => { setBenefitType("punch"); setAllFalse(); setButton2IsActive(true); }} className={button2IsActive ? "flex justify-center items-center gap-[5px] w-[10.748vw] h-[4.701851851851852vh] min-h-[30px] max-h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px] min-w-[80px] xsm:min-w-[25vw] sm:min-w-[20vw] xsm:text-[14px]" : "flex justify-center items-center gap-[5px] xsm:text-[14px] min-w-[80px] xsm:min-w-[25vw] sm:min-w-[20vw] w-[10.748vw] h-[4.701851851851852vh] min-h-[30px] max-h-[50.78px] text-[clamp(14px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Punchcard <div data-title="button 2" className="helpDiv"><img className="w-[1.6473958333333334vw] min-w-[20px]" src="./images/black-mark-center.png"/></div></button>
                            <button type="button" onClick={() => { setBenefitType("free"); setAllFalse(); setButton3IsActive(true); }} className={button3IsActive ? "flex justify-center items-center gap-[5px] w-[10.748vw] h-[4.701851851851852vh] min-h-[30px] max-h-[50.78px] text-[clamp(16px,1.302vw,25px)] text-[#EBBC33] font-bold bg-[#fff] rounded-[57px] min-w-[80px] xsm:min-w-[25vw] sm:min-w-[20vw] xsm:text-[14px]" : "flex justify-center items-center gap-[5px] xsm:text-[14px] min-w-[80px] xsm:min-w-[25vw] sm:min-w-[20vw] w-[10.748vw] h-[4.701851851851852vh] min-h-[30px] max-h-[50.78px] text-[clamp(14px,1.302vw,25px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Free <div data-title="button 3" className="helpDiv"><img className="w-[1.6473958333333334vw] min-w-[20px]" src="./images/black-mark-center.png"/></div></button>
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Price * <div data-title="price" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png"/></div></label>
                            <input type={"number"} min="0" name="price" placeholder="Price" required className="xsm:min-w-[80vw] sm:min-w-[calc(35vw-2.083vw)]  indent-[27px] w-[14.85vw] min-h-[30px] h-[3.9592592592592593vh] max-h-[42.76px]" />
                        </div>

                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold">Points * <div data-title="points" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png"/></div></label>
                            <input type={"number"} name="points" placeholder="Points" required className="xsm:min-w-[80vw] sm:min-w-[calc(35vw-2.083vw)] indent-[27px] w-[14.85vw] min-h-[30px] h-[3.9592592592592593vh] max-h-[42.76px]" />
                        </div>


                        <div>
                            <label className=" flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Possible Purchase * <div data-title="possible purchase" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png"/></div></label>
                            <select name="possiblePurchase" required className="xsm:min-w-[80vw] sm:min-w-[calc(35vw-2.083vw)] indent-[27px] rounded-[57px] w-[14.85vw] min-h-[30px] h-[3.9592592592592593vh] max-h-[42.76px]">
                                <option disabled selected value={"choose option"}>Possible Purchase *</option>
                                <option value={"1"}>1</option>
                                <option value={'null'}>Endless</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Discount Ammount * <div data-title="discount ammount" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png"/></div></label>
                            <input type={"number"} name="discount" required placeholder="Discount Ammount" className="xsm:min-w-[80vw] sm:min-w-[calc(35vw-2.083vw)] indent-[27px] w-[14.85vw] min-h-[30px] h-[3.9592592592592593vh] max-h-[42.76px]" />
                        </div>

                        <div>
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Description * <div data-title="description" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png"/></div></label>
                            <textarea placeholder="Description" onChange={(e) => { setdescriptionLength(e.target.value) }} maxLength={30} name="description" rows='3' className="xsm:min-w-[80vw] sm:min-w-[70vw] indent-[27px] pt-[10px] w-[29.21vw] min-h-[60px] h-[7.312037037037037vh] max-h-[78.97px]"></textarea> {/* min-h-[80px] h-[16.77777777777778vh] max-h-[181.2px] */}
                            <p className="text-white text-[12px] text-right">{descriptionLength?.length || 0}/30</p>
                        </div>

                        <div>
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Long Description * <div data-title="long discription" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png"/></div></label>
                            <textarea placeholder="Long Description" onChange={(e) => { setlongdescriptionLength(e.target.value) }} maxLength={150} name="longDescription" className="xsm:min-w-[80vw] sm:min-w-[70vw] indent-[27px] pt-[10px] w-[29.21vw] min-h-[70px] h-[14.025925925925923vh] max-h-[151.48px]"></textarea>
                            <p className="text-white text-[12px] text-right">{longdescriptionLength?.length || 0}/150</p>
                        </div>


                        <div className="flex justify-between w-[100%] xsm:items-center xsm:flex-col sm:items-center sm:flex-col">
                            <div className="flex gap-[20px]">
                                <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                                    <h2 className="font-[25px] font-bold ">Small Logo</h2>
                                    <div className="flex justify-center items-center w-[119px] h-[8.24074074074074vh] min-h-[50px] max-h-[89px] bg-white rounded-[18px]">
                                        <input defaultValue={smallimageURL} onChange={(e)=>{setDisableBtn(true);smallImageHandler(e)}} name="img1" id="files1" type={"file"} className="hidden w-[301px] min-h-[30px] h-[3.9592592592592593vh] max-h-[42.76px]" />
                                        <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files1">Upload</label>
                                    </div>
                                    <h2 className="font-[15px] font-bold text-center">80*80 or square</h2>
                                </div>

                                <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                                    <h2 className="font-[25px] font-bold ">Bid Logo</h2>
                                    <div className="flex justify-center items-center w-[129px] h-[8.24074074074074vh] min-h-[50px] max-h-[89px] bg-white rounded-[18px]">
                                        <input defaultValue={largeimageURL} onChange={(e)=>{setDisableBtn(true);largeImageHandler(e)}} name="img2" id="files2" type={"file"} className="hidden w-[301px] min-h-[30px] h-[3.9592592592592593vh] max-h-[42.76px]" />
                                        <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files2">Upload</label>
                                    </div>
                                    <h2 className="font-[15px] font-bold text-center">80*80 or square</h2>
                                </div>
                            </div>

                            <div style={disableBtn?{pointerEvents:"none",opacity:"0.5"}:{}} className="flex flex-col xsm:items-center sm:items-center gap-[10px]">
                                <button type="submit" className="w-[140px] h-[34px] bg-[#FDC11F] border-[1px] border-[#707070]">Add Benefits</button>
                                <img className="cursor-pointer" src="/images/Group 771.png" alt="" />
                            </div>
                        </div>
                        <div className="text-white font-[18px] flex-1">
                            <div className="relative z-20 flex justify-between">
                                <h3 className="text-white font-[32px] font-bold">Benefits</h3>
                            </div>
                            <div className="relative z-10 transition-all"> 
                            {benefitArray.length !== 0 ? benefitArray.map((b,index)=>{
                                return(
                                    <div key={index} className="">
                                        <div className="relative z-20 flex justify-between">
                                            <p>Description: {b.description}</p>
                                            <div className="flex gap-[10px]">
                                                <button type="button" onClick={() => {}} className={"flex justify-center items-center gap-[5px] xsm:text-[14px] min-w-[60px] max-w-[80px] w-[10.748vw] h-[4.701851851851852vh] min-h-[30px] max-h-[30px] text-[clamp(12px,1.302vw,22px)] text-[#fff] font-bold bg-[#EBBC33] rounded-[57px]"}>Delete</button>
                                                <p style={showBenefits?{transform:"rotate(180deg)"}:{transform:"rotate(0deg)"}} onClick={()=>{setShowBenefits(!showBenefits)}} className="transition-all cursor-pointer">v</p>
                                            </div>
                                        </div>
                                        <div style={showBenefits === false?{maxHeight:'0px',opacity:"0"}:{maxHeight:'1000px',opacity:"1"}} className="transition-all">
                                            <p>Long Description: {b.longDescription}</p>
                                            <p>Type: {b.type}</p>
                                            <p>Price: {b.price}</p>
                                            <p>Points: {b.points}</p>
                                            <p>Possible Purchases: {b.possiblePurchases}</p>
                                            <p>Discount Amount: {b.discountAmount}</p>
                                        </div>
                                    </div>
                                )
                            })
                            :"No benefits Added."}  
                            </div>
                        </div>
                    </form>
                </div>

                <img className="w-[37.13vw] sm:hidden xsm:hidden md:hidden self-center" src={"./images/Repeat Grid 3.svg"} alt="" />
            </div>
            <div style={disableBtn?{pointerEvents:"none",opacity:"0.5"}:{}} onClick={gotoNextPage} className=" xsm:top-[91%] sm:top-[91%] z-50 cursor-pointer flex items-center gap-[10px] absolute top-[75%] left-[54%] xsm:left-[50%] xsm:translate-x-[-50%] sm:left-[50%] sm:translate-x-[-50%]">
                <button className="bg-transparent text-[23px] font-bold text-[#FDC11F]">Next</button>
                <img src="/images/Repeat Grid 4.png" alt="" />
            </div>
        </div>
    )
}