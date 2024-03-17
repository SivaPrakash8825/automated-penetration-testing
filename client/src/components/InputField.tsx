"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import Loading from "./Loading";

type Props = {
  sendUrl: () => void;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
};

const InputField = ({ sendUrl, url, setUrl, loading }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      sendUrl();
    }
  };
  useEffect(() => {
    ref.current?.addEventListener("keypress", handleKeyPress);

    return () => {
      ref.current?.removeEventListener("keypress", handleKeyPress);
    };
  }, [url]);
  return (
    <div ref={ref} className=" w-[100vw] h-24 fixed bottom-0 ">
      <div className="w-full h-full bg-white py-1 mb-2 flex justify-center items-center ">
        <div className="sm:w-11/12 md:w-1/2 border flex gap-x-2 justify-center items-center border-black px-4  rounded-2xl ">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className=" w-full h-14 outline-none"
            placeholder="Enter The URL To Be Scan"
          />
          <div
            onClick={sendUrl}
            className={` bg-black cursor-pointer ${
              loading ? "pointer-events-none" : ""
            } p-2 rounded-lg`}>
            {loading ? <Loading /> : <IoSend className="text-white text-xl " />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputField;
