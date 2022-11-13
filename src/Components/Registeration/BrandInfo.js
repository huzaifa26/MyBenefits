import "./BrandInfo.css";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Storage } from "../Firebase/firebase";
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { addBrand, addbusinessToClub, brandInfo, clubOffer } from "../../_services";

const ToastError = (props) => {
    return (
        <div>{props.error}</div>
    )
}

export default function BrandInfo({ getDataFromBrandInfo, benefitArrayFC }) {
    let [disableBtn, setDisableBtn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const brandInfoRef = useRef();

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
            toast.success("Image Uploaded")
            setDisableBtn(false);
        } catch (e) {
            toast.dismiss();
            toast.error("Failed");
            setDisableBtn(false)
        }

        getDownloadURL(ref(Storage, `/logo/${e.target.files[0].name}`)).then((url) => {
            setsmallImageURL(url);
        })
        e.target.value = "";
    }

    const [value, setValue] = useState()


    const brandInfoSubmitHandler = async (e) => {
        e.preventDefault();

        if (value === "") {
            toast.dark("please Enter Phone number");
            return
        }

        let brandData = {
            name: brandInfoRef.current.brandName.value,
            description: brandInfoRef.current.brandName.value,
            logoUrl: smallimageURL,
        }

        let brand;
        try {
            // Add Brand //POSTMAN
            brand = await addBrand(brandData);
            console.log(brand);
            // brand = (JSON.parse(brand));
        } catch (err) {
            console.log(err);
            // toast.error(<ToastError error={err}></ToastError>)
        }

        let data = {
            email: brandInfoRef.current.email.value,
            password: brandInfoRef.current.password.value,
            name: brandInfoRef.current.accountName.value,
            information: {
                name: brandInfoRef.current.businessName.value,
                address: brandInfoRef.current.businessAddress.value,
                phone: value,
                openingHours1: brandInfoRef.current.openingHours.value,
                openingHours2: brandInfoRef.current.specialOpeningHours.value,
                contactName: brandInfoRef.current.contactName.value,
                description: brandInfoRef.current.description.value,
                picture_url: smallimageURL,
                brandInfoSmallLogo: smallimageURL,
            }
        }
        let business;
        try {
            console.log("2222222222222222")
            business = await brandInfo(data);
            business = (JSON.parse(business));
            let addbusinesstoclub = await addbusinessToClub(business);
            for (let i = 0; i < benefitArrayFC.length; i++) {
                try {
                    benefitArrayFC[i].businessId = business.id;
                    console.log("33333333333333333333")

                    let benefits = await clubOffer(benefitArrayFC[i]);
                    toast("Account created");
                    navigate("/");
                } catch (err) {
                    console.log(err);
                    toast.error(<ToastError error={err.message}></ToastError>)
                }
            }
        } catch (err) {
            if (err.status === 409) {
                toast.error(<ToastError error={"Account already exists with this email"}></ToastError>)
                return
            }
            toast.error(<ToastError error={"Error Occured while registering user."}></ToastError>)
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

    return (
        <div className="max-w-[1920px] w-[calc(100vw - 100%)] min-h-[100vh] pb-[66.7px] overflow-y-hidden linearBG">

            <div className="flex items-center justify-center gap-[20px] max-w-[1920px] w-[calc(100vw - 100%)] h-[9.225vh] min-h-[70px] max-h-[99px]">
                <Link to={"/"}><img className="xsm:hidden self-center xsm:ml-0 ml-[20px] cursor-pointer" src="./images/Group 757.png" alt="" /></Link>
                <div className="flex justify-center items-center flex-1">
                    <Link to={"/registeration"}>
                        <div className="flex gap-[4px] xsm:hidden sm:hidden">
                            <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">1</span>
                            <h2 className="text-[clamp(14px,1.2vw,24px)] flex items-center text-[#1D262D] font-bold">Create Club</h2>
                        </div>
                    </Link>
                    <span className="w-[37px] h-[2px] bg-[#707070] xsm:hidden sm:hidden"></span>
                    <Link to={"/cluboffer"}>
                        <div className="flex gap-[4px] xsm:hidden sm:hidden">
                            <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">2</span>
                            <h2 className="text-[25px] text-[#1D262D] font-bold">Choose Benefit</h2>
                        </div>
                    </Link>
                    <span className="w-[37px] h-[2px] bg-[#707070] xsm:hidden sm:hidden"></span>
                    <div className="flex gap-[4px]">
                        <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#FDC11F] text-[15px] text-center rounded-full">3</span>
                        <h2 className="text-[25px] text-[#1D262D] font-bold">Create Account</h2>
                    </div>
                </div>
            </div>

            <div className="flex xsm:w-[90vw] sm:w-[90vw] w-[82.58vw] py-[20px] bg-[#1D262D] m-auto rounded-[57px] mt-[4vh]">
                <form ref={brandInfoRef} onSubmit={brandInfoSubmitHandler} className="flex xsm:flex-col xsm:w-[100%] sm:flex-col sm:w-[100%] w-[80%] m-auto">
                    <div className="flex-1 flex flex-col gap-[1.03vh] xsm:w-[97%] w-[80%] m-auto pb-[1.62962962962963vh]">
                        <h2 className="text-[clamp(24px,1.8229166666666667vw,35px)] text-[#FDC11F] font-bold">Create Business Account</h2>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Email * <div data-title="Email" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type={"email"} name="email" required placeholder="Email" className="indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Password * <div data-title="Password" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type={"password"} name="password" required placeholder="Password" className="bg-[#FDC11F] indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Account Name * <div data-title="Account Name" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type="text" name="accountName" required placeholder="Account Name" className="indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Business Name * <div data-title="Business Name" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type={"text"} name="businessName" required placeholder="Business Name" className="indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Business Address * <div data-title="Business Address" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type={"address"} name="businessAddress" required placeholder="Business Address" className="indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Enter Phone * <div data-title="Enter Phone" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <div className="phone-input2">
                                <PhoneInput prefix="+" buttonStyle={{ height: "5.555555555555555vh", borderRadius: "57px 0 0 57px", maxHeight: "60px", minHeight: "30px" }} inputStyle={{ width: "271px", borderRadius: "0 57px 57px 0", height: "5.555555555555555vh", maxHeight: "60px", minHeight: "30px" }} className="indent-[27px] w-[301px]" placeholder="Enter Phone number" value={value} onChange={setValue} />
                            </div>
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Opening Hours * <div data-title="Opening Hours" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type={"time"} name="openingHours" required placeholder="Opening Hours" className="openingHours indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Special Opening Hours * <div data-title="Opening Hours" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <div className="relative flex">
                                <input type={"time"} name="specialOpeningHours" required placeholder="Special Opening Hours" className="specialOpening relative indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                                <label className="absolute top-[25%] xsm:right-[2%] sm:right-[0%] right-[-25%] flex items-center text-[#FDC11F]">Holiday,Vacation <div data-title="holiday, vacations" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            </div>
                        </div>

                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Contact Name * <div data-title="Contact Name" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type={"text"} name="contactName" required placeholder="Contact Name" className="indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>

                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Description * <div data-title="Description" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type={"text"} name="description" required placeholder="Description" className="indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>

                    </div>
                    <div className="flex-1 flex flex-col gap-[1.03vh] xsm:w-[97%] xsm:m-auto sm:w-[80%] sm:m-auto">
                        <h2 className="text-[clamp(24px,1.8229166666666667vw,35px)] text-[#FDC11F] font-bold ">Brand Information</h2>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Brand Name * <div data-title="Brand Name" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <input type={'text'} name="brandName" placeholder="Brand Name" className="indent-[15px] xsm:min-w-[280px] sm:min-w-[280px] w-[22.03513909224012vw] min-h-[30px] h-[5.555555555555555vh] max-h-[60px]" />
                        </div>
                        <div className="inline-block">
                            <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold ">Long Description * <div data-title="Long Description" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                            <textarea name="longDescription" placeholder="Long Description" className="indent-[15px] pt-[20px] xsm:min-w-[280px] sm:min-w-[280px] w-[39.53147877013177vw] min-h-[80px] h-[16.77777777777778vh] max-h-[181.2px]"></textarea>
                        </div>
                        <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                            <h2 className="font-[25px] font-bold ">Small Logo</h2>
                            <div className="flex justify-center items-center w-[119px] h-[8.24074074074074vh] min-h-[50px] max-h-[89px] bg-white rounded-[18px]">
                                <input defaultValue={smallimageURL} onChange={(e) => { setDisableBtn(true); smallImageHandler(e) }} name="img1" id="files1" type={"file"} className="hidden w-[301px] h-[42.76px]" />
                                <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files1">Upload</label>
                            </div>
                            <h2 className="font-[15px] font-bold">80*80 or square</h2>
                        </div>
                        <button style={disableBtn ? { pointerEvents: "none", opacity: "0.5" } : {}} type="submit" className=" flex justify-center items-center w-[168.01px] rounded-[57px]  max-h-[64.87px] min-h-[35px] h-[6.006481481481481vh] text-[clamp(22px,1.5625vw,30px)] bg-[#FDC11F] text-[#1D262D] font-bold">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}