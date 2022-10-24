/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebase.config";
import { motion } from "framer-motion";

import { FaCrown } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const logout = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth
            .signOut()
            .then(() => {
                window.localStorage.setItem("auth", "false");
            })
            .catch((e) => console.log(e));
        navigate("/login", { replace: true });
    };

    return (

        <header className="flex items-center w-full p-8 md:py-4 md:px-6 ">
            <NavLink to={"/"}>
                <div className="flex flex-row">
                    <svg width="45" height="45" viewBox="0 0 590 885" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M239.486 494.033C147.318 543.354 177.797 690.618 269.236 705.852C297.683 713.977 332.374 705.852 346.164 700.774C390.284 684.524 403.736 647.814 407.123 629.681V548.432V189.349C432.748 183.707 498.044 199.498 518.881 275.676C526.148 305.386 530.59 382.411 523.961 458.486C540.894 436.481 574.76 377.237 574.76 316.3C574.118 266.937 560.719 172.201 447.762 82.709L391.883 1.45995C376.643 -1.92544 345.148 -1.5869 341.084 26.8503V289.45L245.504 301.066C211.638 306.144 128.743 333.566 71.8482 402.628C39.6753 431.403 -18.5744 520.439 5.80921 646.375C7.50252 673.458 30.1928 745.905 107.408 819.03C119.261 829.186 149.063 851.529 173.447 859.654C188.26 876.977 287.179 893.636 346.164 879.966C414.376 866.36 574.76 797.257 590 626.063V478.799H518.881V483.877V626.063C518.152 644.915 518.152 670.306 473.162 737.78C447.033 766.789 409.155 797.702 336.004 813.952C298.751 819.03 213.07 819.03 168.367 778.405C134.501 761.478 66.7682 698.171 66.7682 580.36C72.665 500.368 134.294 348.995 346.164 362.003V478.799C318.187 476.377 257.228 478.359 239.486 494.033Z" fill="#00BD95" />
                    </svg>
                    <span className="text-2xl font-extrabold text-[#00BD95] mt-3">Musica</span>
                </div>
            </NavLink>

            <div
                className="flex items-center ml-auto cursor-pointer gap-2 relative"
                onMouseEnter={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}
            >
                <img
                    className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
                    src={user?.user?.imageURL}
                    alt=""
                    referrerpolicy="no-referrer"
                />

                {isMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-[#1E1E1E] shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
                    >
                        {/* <NavLink to={"/userProfile"}>
                            <p className="text-base text-white hover:font-semibold hover:text-[#00BD95] ">
                                Profile
                            </p>
                        </NavLink> */}
                        {user?.user.role === "admin" && (
                            <>
                                <NavLink to={"/dashboard/home"}>
                                    <p className="text-base text-white hover:font-semibold hover:text-[#00BD95] ">
                                        Dashboard
                                    </p>
                                </NavLink>
                                <hr />
                            </>
                        )}
                        <p
                            className="text-base text-white hover:font-semibold hover:text-[#00BD95] "
                            onClick={logout}
                        >
                            Sign out
                        </p>
                    </motion.div>
                )}
            </div>
        </header>
    );
};

export default Header;
