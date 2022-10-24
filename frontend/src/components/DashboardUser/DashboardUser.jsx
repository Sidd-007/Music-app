/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import { getAllUsers } from "../../api";
import { actionType } from "../../Context/reducer";
import { useStateValue } from "../../Context/StateProvider";
import DashboardUserCard from "../DashboardUserCard/DashboardUserCard";

const DashboardUser = () => {
    const [emailFilter, setEmailFilter] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const [filtereUsers, setFiltereUsers] = useState(null);

    const [{ allUsers }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allUsers) {
            getAllUsers().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_USERS,
                    allUsers: data.data,
                });
            });
        }
    }, []);

    useEffect(() => {
        if (emailFilter) {
            const filtered = allUsers.filter(
                // prettier-ignore
                (data) => data.email.includes(emailFilter) || data.name.includes(emailFilter) || data.role.includes(emailFilter)
            );
            setFiltereUsers(filtered);
        }
    }, [emailFilter]);

    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <div className="w-full flex justify-center items-center gap-24">
                
                <input
                    type="text"
                    placeholder="Search here"
                    className={`w-52 px-4 py-2 bg-[#00BD95] rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-white placeholder:text-white font-semibold`}
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    onBlur={() => setIsFocus(false)}
                    onFocus={() => setIsFocus(true)}
                />

                {emailFilter && (
                    <motion.i
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.75 }}
                        onClick={() => {
                            setEmailFilter("");
                            setFiltereUsers(null);
                        }}
                    >
                        <AiOutlineClear className="text-3xl text-white cursor-pointer" />
                    </motion.i>
                )}
            </div>

            <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin my-4 flex flex-col items-center justify-start p-4 mt-10 bg-[#1E1E1E] rounded-md gap-3">
                {/* <div className="absolute top-4 left-4">
                    <p className="text-xl font-bold">
                        <span className="text-sm font-semibold text-textColor">
                            Count :{" "}
                        </span>
                        {filtereUsers ? filtereUsers?.length : allUsers?.length}
                    </p>
                </div> */}

                <div className="w-full min-w-[750px] flex items-center justify-between">
                    <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Image</p>
                    <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Name</p>
                    <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Email</p>
                    <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Verified</p>
                    <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Created</p>
                    <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Role</p>{" "}
                </div>
                {allUsers && !filtereUsers
                    ? allUsers?.map((data, i) => (
                        <DashboardUserCard data={data} key={data._id} index={i} />
                    ))
                    : filtereUsers?.map((data, i) => (
                        <DashboardUserCard data={data} key={data._id} index={i} />
                    ))}
            </div>
        </div>
    );
};

export default DashboardUser;
