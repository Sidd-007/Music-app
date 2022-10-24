import React from "react";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import { DashboardNewSong } from "../index";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import DashboardAlbum from "../DashboardAlbum/DashboardAlbum";
import DashboardArtist from "../DashboardArtist/DashboardArtist";
import DashBoardHome from "../DashboardHome/DashBoardHome";
import DashboardSongs from "../DashboardSongs/DashboardSongs";
import DashboardUser from "../DashboardUser/DashboardUser";
import Header from "../Header/Header";
import DashboardNewArtist from "../DashboardNewArtist/DashboardNewArtist";
import DashboardNewAlbum from "../DashboardNewAlbum/DashboardNewAlbum";

const Dashboard = () => {
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center ">
            <Header />

            <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">

                <NavLink to={"/dashboard/home"}><IoHome className="text-2xl text-white" /></NavLink>

                <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}> Users </NavLink>

                <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}> Songs </NavLink>

                <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}> Artist </NavLink>

                <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}> Albums </NavLink>
            </div>

            <div className="my-4 w-full p-4">
                <Routes>
                    <Route path="/home" element={<DashBoardHome />} />
                    <Route path="/user" element={<DashboardUser />} />
                    <Route path="/songs" element={<DashboardSongs />} />
                    <Route path="/artist" element={<DashboardArtist />} />
                    <Route path="/albums" element={<DashboardAlbum />} />
                    <Route path="/newSong" element={<DashboardNewSong />} />
                    <Route path="/newArtist" element={<DashboardNewArtist />} />
                    <Route path="/newAlbum" element={<DashboardNewAlbum />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
