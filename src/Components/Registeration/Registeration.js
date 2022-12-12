import "./Registeration.css";
import { useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Storage } from "../Firebase/firebase";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Navigate, Link } from "react-router-dom";
import { registerUser } from "../../_services/index";


export default function Registeration({ getDataFromRegisteration }) {
    const navigate = useNavigate();
    const [value, setValue] = useState()
    let [disableBtn, setDisableBtn] = useState(false);

    const registerationRef = useRef();
    const [status, setStatus] = useState("")
    let data = {};

    const registerationFormSubmitHandler = async (e) => {
        e.preventDefault();

        if (status === "") {
            console.log(status);
            toast.dark("Please select private or public");
            return
        }
        if (value === "") {
            toast.dark("please Enter Phone number");
            return
        }
        // if(largeimageURL === "" || smallimageURL === ""){
        //     toast.dark("Please add both Logos");
        //     return
        // }
        if (registerationRef.current.terms.checked === false) {
            toast.dark("Please agree to Terms of service & Privacy Policy");
            return
        }

        data.name = registerationRef.current.clubName.value;
        data.email = registerationRef.current.email.value;
        data.phoneNum = value;
        data.type = status;
        data.description = registerationRef.current.description.value;
        data.website = registerationRef.current.website.value;
        data.extraInfo = registerationRef.current.extraInfo.value;
        data.smallLogoUrl = smallimageURL;
        data.largeLogoUrl = largeimageURL;

        try {
            console.log(data);
            // Add club // POSTMAN
            console.log("444444444444444444")
            let user = await registerUser(data)
            user = JSON.parse(user)
            if (Object.keys(user).length === 0 && user.constructor === Object) {
                alert("Not registered");
                return;
            } else {
                localStorage.setItem("clubId", JSON.stringify(user));
                navigate("/cluboffer", { state: { prevRoute: "registeration" } });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const [smallimageURL, setsmallImageURL] = useState('');
    const smallImageHandler = async (e) => {
        console.log(e.target.files);

        if (e.target.files[0] == null)
            return;

        var img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = async function () {
            var width = img.naturalWidth,
                height = img.naturalHeight;
            console.log(width, height);

            if (height > 40) {
                const storageRef = ref(Storage, `/logos/${e.target.files[0].name}`);

                toast.loading("Uploading Image");
                try {
                    const uploadTask = await uploadBytes(storageRef, e.target.files[0]);
                    toast.dismiss();
                    toast.success("Image Uploaded");
                    setDisableBtn(false);
                } catch (e) {
                    toast.dismiss();
                    toast.error("Failed");
                    setDisableBtn(false);
                }

                getDownloadURL(ref(Storage, `/logo/${e.target.files[0].name}`)).then((url) => {
                    console.log(url);
                    setsmallImageURL(url);
                }).catch((err) => {

                });
            } else {
                toast.error("Image size doesnot match");
            }
        };
    }

    const [largeimageURL, setlargeImageURL] = useState('');
    const largeImageHandler = async (e) => {
        if (e.target.files[0] == null)
            return;

        var img = new Image();

        img.src = window.URL.createObjectURL(e.target.files[0]);

        img.onload = async function () {
            var width = img.naturalWidth,
                height = img.naturalHeight;
            console.log(width, height);

            if (width === 80 && height === 80) {
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
            } else {
                toast.error("Image size doesnot match");
            }
        };

    }

    const [button1IsActive, setButton1IsActive] = useState(false);
    const [button2IsActive, setButton2IsActive] = useState(false);

    return (
        <>
            <div className="max-w-[1920px] w-[calc(100vw - 100%)] h-[100%] overflow-y-hidden linearBG">
                <img className="absolute left-[86%] top-[-500px]" src="/images/Path 28.png" alt="" />
                <img className="absolute top-[450px] left-[-256px]" src="/images/Path 18.png" alt="" />
                <img className="absolute top-[119px] left-[70%]" src="/images/Repeat Grid 1.png" alt="" />
                <img className="absolute top-[749px] left-[680px]" src="/images/Group 31.png" alt="" />


                <div className="flex items-center justify-center gap-[20px] max-w-[1920px] w-[calc(100vw - 100%)] h-[9.225vh] min-h-[70px] max-h-[99px]">
                    <Link to={"/"}><img className="xsm:hidden self-center xsm:ml-0 ml-[20px] cursor-pointer" src="./images/Group 757.png" alt="" /></Link>
                    <div className="flex justify-center items-center flex-1">
                        <div className="flex gap-[4px] items-center">
                            <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#FDC11F] text-[15px] text-center rounded-full">1</span>
                            <h2 className="text-[clamp(12px,1.30vw,25px)] text-[#1D262D] font-bold">Create Club</h2>
                        </div>
                        <span className="w-[37px] h-[2px] bg-[#707070] xsm:hidden"></span>
                        <div className="flex gap-[4px] items-center xsm:hidden">
                            <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">2</span>
                            <h2 className="text-[clamp(12px,1.30vw,25px)] text-[#1D262D] font-bold">Choose Benefit</h2>
                        </div>
                        <span className="w-[37px] h-[2px] bg-[#707070] xsm:hidden"></span>
                        <div className="flex gap-[4px] items-center xsm:hidden">
                            <span className="pt-[10px] border-[1px] border-[#1D262D] w-[46px] h-[44px] bg-[#fff] text-[15px] text-center rounded-full">3</span>
                            <h2 className="text-[clamp(12px,1.30vw,25px)] text-[#1D262D] font-bold">Create Account</h2>
                        </div>
                    </div>
                </div>

                <div className="flex-row-reverse relative z-50 m-auto pt-[5.555555555555555vh] pb-[21px] flex xsm:justify-center justify-between items-start xsm:items-center xsm:w-[100%] w-[80%]">
                    <img className="xsm:hidden w-[18.07vw] self-center " src="./images/Group 7571.png" alt="" />
                    <div className="pt-[2.7777777777777777vh] mb-[26.] w-[34.047vw] xsm:w-[90vw] bg-[#1D262D] rounded-[57px]">

                        <form onSubmit={registerationFormSubmitHandler} ref={registerationRef} className="relative flex flex-col w-[90%] gap-[1.3888888888888888vh] m-auto">
                            <div className="flex justify-between">
                                <button type="button" onClick={(e) => { setStatus('public'); setButton1IsActive(true); setButton2IsActive(false) }} className={button1IsActive ? "flex justify-center items-center bg-white w-[158.14px] h-[4.701851851851852vh] min-h-[30px] max-h-[50.78px] text-[25px] font-bold rounded-[57px]" : "min-h-[30px] flex justify-center items-center w-[158.14px] h-[4.701851851851852vh] max-h-[50.78px] text-[25px] font-bold bg-[#EBBC33] rounded-[57px]"}>Public</button>
                                <span className="text-center w-[158.14px] h-[50.78px] text-[25px] font-bold text-[#EBBC33] rounded-[57px]">OR</span>
                                <button type="button" onClick={(e) => { setStatus('private'); setButton2IsActive(true); setButton1IsActive(false) }} className={button2IsActive ? "flex justify-center items-center bg-white w-[158.14px] h-[4.701851851851852vh] min-h-[30px] max-h-[50.78px] text-[25px] font-bold rounded-[57px]" : "min-h-[30px] flex justify-center items-center w-[158.14px] h-[4.701851851851852vh] max-h-[50.78px] text-[25px] font-bold bg-[#EBBC33] rounded-[57px]"}>Private </button>
                            </div>
                            <div className="inline-block">
                                <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold">Club Name * <div data-title="Club Name" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                                <input name="clubName" type={"text"} required placeholder="Club Name" className="indent-[27px] w-[95%] max-w-[290.67px] h-[6.203703703703703vh] min-h-[30px] max-h-[67px]" />
                            </div>
                            <div className="inline-block">
                                <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold">Email * <div data-title="Email" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                                <input name="email" type={"email"} required placeholder="Email" className="bg-[#FDC11F] indent-[27px] w-[95%] max-w-[290.67px] h-[6.203703703703703vh] min-h-[30px] max-h-[67px]" />
                            </div>
                            <div className="inline-block">
                                <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold">Enter Phone * <div data-title="Enter Phone" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                                <PhoneInput prefix="+" buttonStyle={{ height: "6.203703703703703vh", maxHeight: "67px", borderRadius: "57px 0 0 57px", minHeight: "30px" }} inputStyle={{ borderRadius: "0 57px 57px 0", height: "6.203703703703703vh", maxHeight: "67px", minHeight: "30px" }} className="indent-[27px] w-[95%] max-w-[290.67px] h-[6.203703703703703vh]" placeholder="Enter phone number" value={value} onChange={setValue} />
                            </div>

                            <div className="inline-block">
                                <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold">Description * <div data-title="Description" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                                <input name="description" type={"text"} required placeholder="Description" className="indent-[27px] w-[95%] max-w-[290.67px] h-[6.203703703703703vh] min-h-[30px] max-h-[67px]" />
                            </div>

                            <div className="inline-block">
                                <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold">Website * <div data-title="Website" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                                <input name="website" type={"url"} required placeholder="Website" className="indent-[27px] w-[95%] max-w-[290.67px] h-[6.203703703703703vh] min-h-[30px] max-h-[67px]" />
                            </div>
                            <div className="inline-block">
                                <label className="flex items-center gap-[10px] text-[clamp(16px,1.302vw,25px)] text-[#FDC11F] font-bold">Extra Information * <div data-title="Extra Information" className="helpDiv"><img className="cursor-pointer w-[1.6473958333333334vw] min-w-[20px]" src="./images/yellow-mark.png" /></div></label>
                                <input name="extraInfo" type={"text"} required placeholder="Extra Information" className="indent-[27px] w-[95%] max-w-[290.67px] h-[6.203703703703703vh] min-h-[30px] max-h-[67px]" />
                            </div>
                            <div className="flex justify-between">
                                <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                                    <h2 className="font-[25px] font-bold ">Small Logo</h2>
                                    <div className="flex justify-center items-center w-[119px] h-[8.24074074074074vh] min-h-[50px] max-h-[89px] bg-white rounded-[18px]">
                                        <input onChange={(e) => { setDisableBtn(true); smallImageHandler(e) }} name="img1" id="files1" type={"file"} className="hidden w-[95%] max-w-[280px] h-[42.76px]" />
                                        <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files1">Upload</label>
                                    </div>
                                    <h2 className="font-[15px] font-bold text-center">80*80 or square</h2>
                                </div>

                                <div className="text-[clamp(16px,1.302vw,25px)] text-[#fff] font-bold">
                                    <h2 className="font-[25px] font-bold ">Big Logo</h2>
                                    <div className="flex justify-center items-center w-[129px] h-[11.018518518518519vh] min-h-[70px] max-h-[119px] bg-white rounded-[18px]">
                                        <input onChange={(e) => { setDisableBtn(true); largeImageHandler(e) }} name="img2" id="files2" type={"file"} className="hidden w-[95%] max-w-[280px] h-[42.76px]" />
                                        <label className="text-[14px] text-center w-[62px] h-[24px] bg-[#FDC11F] border-[1px] border-[#707070]" for="files2">Upload</label>
                                    </div>
                                    <h2 className="font-[15px] font-bold text-center">80*80 or square</h2>
                                </div>
                            </div>
                            <label className="text-[15px] text-[#fff] mb-[20px]"><input name="terms" type={"checkbox"} /> I agree to Terms of service <span className="text-[#FDC11F]">&</span> Privacy Policy</label>
                            <button style={disableBtn ? { pointerEvents: "none", opacity: "0.5" } : {}} type="submit" className="absolute right-[-40%] bottom-[1%] flex justify-center items-center h-[6.006481481481481vh] mb-[25px]  min-w-[120px] w-[8.750vw] rounded-[57px] max-h-[64.87px] min-h-[40px] text-[clamp(18px,1.562vw,30px)] self-center bg-[#FDC11F] text-[#1D262D] font-bold">Next</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}