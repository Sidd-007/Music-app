/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../Context/StateProvider";

import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { actionType } from "../../Context/reducer";
import { NavLink } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { getAllAlbums } from "../../api";

const DashboardAlbum = () => {
    const [{ allAlbums }, dispatch] = useStateValue();
    useEffect(() => {
        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
            });
        }
    }, []);
    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <NavLink
                to={"/dashboard/newArtist"}
                className="flex items-center px-3 py-2 bg-[#1E1E1E] rounded-md hover:shadow-md cursor-pointer"
            >
                <IoAdd className="text-[#00BD95] text-2xl" />
            </NavLink>
            <div className="relative w-full gap-3  my-4 p-4 py-12 bg-[#1E1E1E] rounded-md flex flex-wrap justify-evenly">
                {allAlbums &&
                    allAlbums.map((data, index) => (
                        <>
                            <AlbumCard key={index} data={data} index={index} />
                        </>
                    ))}
            </div>
        </div>
    );
};

export const AlbumCard = ({ data, index }) => {
    const [isDelete, setIsDelete] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative w-40 min-w-210 px-2 py-4 gap-3 cursor-pointer hover:shadow-2xl hover:shadow-[#00BD95] shadow-[#00BD95] hover:bg-white bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        >
            <img
                src={data?.imageURL}
                className="w-full h-40 object-cover rounded-md"
                alt=""
            />

            <p className="text-base text-headingColor font-semibold">{data.name}</p>

            <motion.i
                className="absolute bottom-2 right-2"
                whileTap={{ scale: 0.75 }}
                onClick={() => setIsDelete(true)}
            >
                <MdDelete className=" text-red-400 hover:text-red-600 text-xl cursor-pointer" />
            </motion.i>

            {isDelete && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
                >
                    <p className="text-gray-100 text-base text-center">
                        Are you sure do you want to delete this?
                    </p>
                    <div className="flex items-center w-full justify-center gap-3">
                        <div className="bg-red-300 px-3 rounded-md">
                            <p className="text-headingColor text-sm">Yes</p>
                        </div>
                        <div
                            className="bg-green-300 px-3 rounded-md"
                            onClick={() => setIsDelete(false)}
                        >
                            <p className="text-headingColor text-sm">No</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default DashboardAlbum;
