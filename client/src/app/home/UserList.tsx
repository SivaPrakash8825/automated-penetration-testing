"use client";

import React, { useRef, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";

type cardDataType = {
  url: string;
  date: string;
  status: string;
};

const UserList = React.memo(({ allUrl }: { allUrl: cardDataType[] }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allUrl]);
  return (
    <div
      ref={ref}
      className="w-[100vw] min-h-[100vh] flex  flex-col gap-y-8  justify-center mb-52 mt-10  items-center">
      {allUrl.map((data, index) => {
        return (
          <div
            key={index}
            className=" sm:w-3/4 h-auto md:w-7/12 flex flex-col  gap-y-6 p-3 pt-4  border border-black rounded-md ">
            {/* {"header"} */}
            <section className=" flex justify-between px-4">
              <p className=" w-3/5 truncate text-sm ">
                <span className=" font-black">URL : </span> {data.url}
              </p>
              <p className=" text-nowrap text-sm">
                {/* {`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}(${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()})`} */}
              </p>
            </section>
            {/* {"status"} */}
            <section className=" w-full h-10  flex justify-center items-center px-10">
              <div className=" relative w-6 h-6 grid place-content-center text-xs bg-purple-700 text-white rounded-lg">
                <FaCheck />
                <p className="absolute -bottom-4 text-black font-black text-xs left-1/2 -translate-x-[50%] ">
                  {data.status ? "schedule" : "loading"}
                </p>
              </div>
              <div className=" grow h-1 relative bg-purple-300">
                <div
                  className={` absolute w-full origin-left  transition-all scale-x-0 h-full ${
                    data.status == "error"
                      ? "bg-red-600 scale-x-100"
                      : data.status == "inprogress" ||
                        data.status == "completed"
                      ? "bg-purple-600 scale-x-100"
                      : ""
                  } `}></div>
              </div>
              <div
                className={` w-6 h-6 relative grid transition-all place-content-center text-xs  ${
                  data.status == "error"
                    ? "bg-red-600"
                    : data.status == "inprogress" || data.status == "completed"
                    ? "bg-purple-600 delay-1000"
                    : "bg-purple-300"
                } text-white rounded-lg`}>
                {data.status == "error" ? <TiWarning /> : <FaCheck />}
                <p
                  className={`absolute -bottom-4 text-black  ${
                    data.status == "error" || data.status == "completed"
                      ? "opacity-1"
                      : "opacity-[0.7] "
                  } text-xs left-1/2 -translate-x-[50%] text-nowrap `}>
                  in-progress
                </p>
              </div>

              <div className={` grow h-1 relative bg-purple-300`}>
                <div
                  className={` absolute scale-x-0 origin-left  w-full h-full ${
                    data.status == "error"
                      ? "bg-red-600 scale-x-100"
                      : data.status == "completed"
                      ? "bg-purple-600 scale-x-100"
                      : ""
                  } `}></div>
              </div>
              <div
                className={` w-6 h-6 relative grid place-content-center  ${
                  data.status == "error"
                    ? "bg-red-600"
                    : data.status == "completed"
                    ? "bg-purple-600"
                    : "bg-purple-300"
                } text-xs  text-white rounded-lg`}>
                {data.status == "error" ? <TiWarning /> : <FaCheck />}
                <p
                  className={`absolute -bottom-4 text-black ${
                    data.status == "error" || data.status == "completed"
                      ? "opacity-1"
                      : "opacity-[0.7] "
                  } text-xs left-1/2 -translate-x-[50%] text-nowrap `}>
                  {data.status == "error" ? "error " : "completed"}
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
      <div ref={bottomRef}></div>
    </div>
  );
});

export default UserList;
