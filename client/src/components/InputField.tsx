"use client";
import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

type Props = {};

const InputField = (props: Props) => {
  const [url, setUrl] = useState("");
  const sendUrl = async () => {
    const { data } = await axios.post("http://localhost:3030/scan", {
      url: url,
    });
    console.log(data);
  };
  return (
    <div className=" w-[100vw] h-24 fixed bottom-0 ">
      <div className="w-full h-full bg-white py-1 mb-2 flex justify-center items-center ">
        <div className="sm:w-11/12 md:w-1/2 border flex gap-x-2 justify-center items-center border-black px-4  rounded-2xl ">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className=" w-full h-14 outline-none"
            placeholder="Enter The URL To Be Scan"
          />
          <div onClick={sendUrl} className=" bg-black p-2 rounded-lg">
            <IoSend className="text-white text-xl " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputField;
