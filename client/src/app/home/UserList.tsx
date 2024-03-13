"use client";

import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
type Props = {};

type cardDataType = {
  url: string;
  date: string;
  status: string;
};

const UserList = (props: Props) => {
  const [allUrl, setAllUrl] = useState<cardDataType[]>([
    {
      date: "asfdadsf",
      status: "fasdfasdfas",
      url: "asdfasdfasdf",
    },
    {
      date: "asfdadsf",
      status: "fasdfasdfas",
      url: "asdfasdfasdf",
    },
    {
      date: "asfdadsf",
      status: "fasdfasdfas",
      url: "asdfasdfasdf",
    },
    {
      date: "asfdadsf",
      status: "fasdfasdfas",
      url: "asdfasdfasdf",
    },
    {
      date: "asfdadsf",
      status: "fasdfasdfas",
      url: "asdfasdfasdf",
    },
  ]);
  return (
    <div className="w-[100vw] min-h-[100vh] flex  flex-col gap-y-8  justify-center mb-52 mt-10  items-center">
      {allUrl.map((data, index) => {
        return (
          <div
            key={index}
            className=" sm:w-3/4 h-auto md:w-7/12 flex flex-col  gap-y-6 p-3 pt-4  border border-black rounded-md ">
            {/* {"header"} */}
            <section className=" flex justify-between px-4">
              <p className=" w-3/5 truncate text-sm ">
                <span className=" font-black">URL : </span>{" "}
                https://portfolio-sivaprakash8825.vercel.app/
              </p>
              <p className=" text-nowrap text-sm">
                {/* {`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}(${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()})`} */}
              </p>
            </section>
            {/* {"status"} */}
            <section className=" w-full h-10  flex justify-center items-center px-10">
              <div className=" relative w-6 h-6 grid place-content-center text-xs bg-purple-600 text-white rounded-lg">
                <FaCheck />
                <p className="absolute -bottom-4 text-black text-xs left-1/2 -translate-x-[50%] ">
                  schedule
                </p>
              </div>
              <div className=" grow h-1 bg-purple-600"></div>
              <div className=" w-6 h-6 relative grid place-content-center text-xs bg-purple-600 text-white rounded-lg">
                <FaCheck />
                <p className="absolute -bottom-4 text-black text-xs left-1/2 -translate-x-[50%] text-nowrap ">
                  in-progress
                </p>
              </div>

              <div className=" grow h-1 bg-gray-200"></div>
              <div className=" w-6 h-6 relative grid place-content-center text-xs bg-purple-300 text-white rounded-lg">
                <TiWarning />
                <p className="absolute -bottom-4 text-black text-xs left-1/2 -translate-x-[50%] opacity-[.5] ">
                  completed
                </p>
              </div>
            </section>
            {/* {"download"} */}
            <section className=" flex justify-between items-center px-10">
              <div className=" flex items-center gap-x-1 text-xs cursor-pointer">
                more
                <IoIosArrowDropdown className=" text-xl" />
              </div>
              <div className=" flex items-center text-white cursor-pointer">
                <div className="p-2 bg-gray-600 rounded-full">
                  <FaFileDownload className=" text-md" />
                </div>
                <div className=" py-1 -z-20 -translate-x-2  rounded-md bg-gray-700 px-5">
                  <p className=" text-xs">download</p>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
