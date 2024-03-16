"use client";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import { useRouter } from "next/navigation";

type userType = {
  username: string;
};

const SideNav = () => {
  const router = useRouter();
  const [user, setUser] = useState<userType>();
  const [open, setOpen] = useState<boolean>(false);

  const logout = () => {
    localStorage.removeItem("pentest");
    router.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("pentest")) {
      setUser(JSON.parse(localStorage.getItem("pentest") as string));
    }
  }, []);
  return (
    <>
      <div onClick={() => setOpen(!open)} className=" fixed top-8 left-8 ">
        <RiMenu2Fill className=" text-2xl" />
      </div>
      <div
        className={`fixed top-0 transition-all z-40 w-[23rem] ${
          open ? "translate-x-0" : "-translate-x-full"
        } left-0 h-[100vh] rounded-tr-3xl shadow-md shadow-black bg-slate-200`}>
        <div onClick={() => setOpen(!open)} className=" absolute top-8 left-5">
          <IoMdClose className=" text-2xl" />
        </div>
        <div className=" text-center mt-20 text-2xl font-black">
          <h1>Welcome Back!!</h1>
          <h1>{user?.username}</h1>
        </div>
        <div className="absolute bottom-0 w-full">
          <div
            onClick={logout}
            className=" w-full text- py-4 border-t flex items-center gap-x-4 px-5 border-black">
            <span>
              <CgLogOut />
            </span>
            <p className="">LOGOUT</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
