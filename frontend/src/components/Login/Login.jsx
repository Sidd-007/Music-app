/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Main } from "../../assets/img";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../api";
import { actionType } from "../../Context/reducer";
import { useStateValue } from "../../Context/StateProvider";

const Login = ({ setAuth }) => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if (userCred) {
                setAuth(true);
                window.localStorage.setItem("auth", "true");

                firebaseAuth.onAuthStateChanged((userCred) => {
                    if (userCred) {
                        userCred.getIdToken().then((token) => {
                            window.localStorage.setItem("auth", "true");
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data,
                                });
                            });
                        });
                        navigate("/", { replace: true });
                    } else {
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user: null,
                        });
                        navigate("/login");
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (window.localStorage.getItem("auth") === "true")
            navigate("/", { replace: true });
    }, []);

    return (
        <div className="relative w-screen h-screen bg-[#171717] font-raleway">
            {/* <video
                src={LoginBg}
                type="video/mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
            ></video> */}
            <header className="flex items-center w-full p-8 md:py-4 md:px-6 ">
                <div className="flex flex-row">
                    <svg width="45" height="45" viewBox="0 0 590 885" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M239.486 494.033C147.318 543.354 177.797 690.618 269.236 705.852C297.683 713.977 332.374 705.852 346.164 700.774C390.284 684.524 403.736 647.814 407.123 629.681V548.432V189.349C432.748 183.707 498.044 199.498 518.881 275.676C526.148 305.386 530.59 382.411 523.961 458.486C540.894 436.481 574.76 377.237 574.76 316.3C574.118 266.937 560.719 172.201 447.762 82.709L391.883 1.45995C376.643 -1.92544 345.148 -1.5869 341.084 26.8503V289.45L245.504 301.066C211.638 306.144 128.743 333.566 71.8482 402.628C39.6753 431.403 -18.5744 520.439 5.80921 646.375C7.50252 673.458 30.1928 745.905 107.408 819.03C119.261 829.186 149.063 851.529 173.447 859.654C188.26 876.977 287.179 893.636 346.164 879.966C414.376 866.36 574.76 797.257 590 626.063V478.799H518.881V483.877V626.063C518.152 644.915 518.152 670.306 473.162 737.78C447.033 766.789 409.155 797.702 336.004 813.952C298.751 819.03 213.07 819.03 168.367 778.405C134.501 761.478 66.7682 698.171 66.7682 580.36C72.665 500.368 134.294 348.995 346.164 362.003V478.799C318.187 476.377 257.228 478.359 239.486 494.033Z" fill="#00BD95" />
                    </svg>
                    <span className="text-2xl font-extrabold text-[#00BD95] mt-3">Musica</span>
                </div>
                <div
                    className="flex items-center ml-auto cursor-pointer gap-2 mr-20 relative bg-[#1E1E1E] border-2 rounded-xl hover:shadow-md hover:shadow-[#00BD95] border-[#00BD95]"
                >
                    <div
                        onClick={loginWithGoogle}
                        className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md  cursor-pointer text-white duration-100 ease-in-out transition-all"
                    >
                        <FcGoogle className="text-xl" />
                        <p>Signin with Google</p>
                    </div>
                </div>
            </header>
            <section
                className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-12"
                id="home"
            >
                <div className="py-1 flex-1 flex flex-col items-start justify-center gap-6">
                    <div className="flex flex-row items-start justify-center">
                        <div className="text-[2.5rem] lg:text-[4.5rem] leading-tight  tracking-wide flex justify-end flex-col">

                            <span className="text-[#00BD95] font-extrabold">
                                <span className="text-[3rem] lg:text-[5rem]">The Voice</span> &
                            </span>
                            <span className="text-gray-200">
                                The<span className="text-[3rem] lg:text-[5rem] ml-8">
                                    Band
                                </span>

                            </span>
                        </div>
                    </div>

                    <p className="text-lg text-gray-400 text-center md:text-left md:w-[80%] flex flex-col">
                        Choose your best music choice with huge library
                        <span>
                            Of our top chart songs and Favoriye songs.
                        </span>
                    </p>

                    <div
                        onClick={loginWithGoogle}
                        className="bg-gradient-to-br from-[#00BD95] to-[#00bd94b7] w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 cursor-pointer"
                    >
                        Get Started
                    </div>
                </div>
                <div className="py-2 flex-1 flex items-center relative">
                    <img src={Main} alt="" className="object-cover h-[450px] w-[450px] ml-14" />


                </div>
            </section>

            {/* <div className="inset-0  flex items-center justify-center p-4">
                <div className="w-full md:w-375 p-4  shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
                    <div
                        onClick={loginWithGoogle}
                        className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md  cursor-pointer text-white duration-100 ease-in-out transition-all"
                    >
                        <FcGoogle className="text-xl" />
                        <p>Signin with Google</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Login;
