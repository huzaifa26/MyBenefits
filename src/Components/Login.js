import { useRef,useState } from "react";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth,db } from "./Firebase/firebase";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";



export default function Login(){
    const navigate=useNavigate();

    const loginFormRef=useRef();
    
    const loginFormSubmitHandler=(e)=>{
        e.preventDefault();
        let email=loginFormRef.current.email.value;
        let password=loginFormRef.current.password.value;

        navigate("/home")

        // toast.loading("Signing in.");
        // signInWithEmailAndPassword (auth, email, password)
        //     .then(async(userCredential) => {
        //         const user = userCredential.user;
        //         console.log();
        //         toast.dismiss()
        //         toast.success("Signing in Successfull");

        //         const docRef = doc(db, "users.", user.uid);
        //         const docSnap = await getDoc(docRef);

        //         if (docSnap.exists()) {
        //             console.log("Document data:", docSnap.data());
        //         } else {
        //         // doc.data() will be undefined in this case
        //             console.log("No such document!");
        //         }
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         toast.dismiss()
        //         toast.error("Signing in failed");
        //         console.log(errorMessage);
        //     });
    }

    return(
        <div className="bg-[#00b9bf] w-[calc(100vw - 100%)] h-[100vh] pt-[30px]">
            <div className="flex flex-col w-[555px] h-[384px] bg-white rounded-[10px] m-auto p-[20px]">
                <h2 className="font-bold text-[32px] text-[#212529] my-[12px]">Login to MyBenefitz</h2>
                <form onSubmit={loginFormSubmitHandler} ref={loginFormRef} className="flex flex-col" >
                    <div className="flex flex-col mb-[20px]">
                        <label className="text-[18px] font-medium" htmlFor="email">Email</label>
                        <input className="h-[38px] border focus:shadow-md py-[6px] px-[12px]" type="text" name="email" />
                    </div>
                    <div className="flex flex-col mb-[20px]">
                        <label className="text-[18px] font-medium" htmlFor="password">Password</label>
                        <input className="h-[38px] border focus:shadow-md py-[6px] px-[12px]" type="password" name="password"/>
                    </div>
                    <button className="text-[22px] text-white mt-[10px] flex-1 h-[50px] rounded-full  shadow-md py-[8px] px-[12px] bg-[#0069d9]">Login</button>
                    {/* {error &&
                    <div>Error Logging In.</div>
                    } */}
                </form>
            </div>
        </div>
    )
}