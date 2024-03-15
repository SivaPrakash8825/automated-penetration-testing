"use client";
import InputField from "@/components/InputField";
import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import axios from "axios";
import { io } from "socket.io-client";

type Props = {
  onclick: () => void;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};
type cardDataType = {
  url: string;
  date: string;
  status: string;
};

const Homepage = () => {
  const [url, setUrl] = useState("");
  const [allUrl, setAllUrl] = useState<cardDataType[]>([]);
  const sendUrl = async () => {
    if (url) {
      const { data } = await axios.post("http://localhost:3030/scan", {
        url: url,
        userId: JSON.parse(localStorage.getItem("pentest") as string)["_id"],
      });
      console.log(data);

      setAllUrl((pre) => [...pre, { date: "", status: "", url: url }]);
      setUrl("");
    } else {
      alert("fill the input!!");
    }
  };

  const getUserRequest = async () => {
    const { data } = await axios.post(
      "http://localhost:3030/getuserrequest",
      {
        userId: JSON.parse(localStorage.getItem("pentest") as string)["_id"],
      },
      { withCredentials: true }
    );
    setAllUrl(data);
  };

  useEffect(() => {
    getUserRequest();

    const socket = io("http://localhost:3030");
    if (localStorage.getItem("pentest")) {
      socket.emit(
        "join_team",
        JSON.parse(localStorage.getItem("pentest") as string)["_id"]
      );
    }
    socket.on("status", (val) => {
      console.log(val);
    });
  }, []);

  return (
    <div className=" overflow-x-hidden">
      <UserList allUrl={allUrl} />
      <InputField sendUrl={sendUrl} url={url} setUrl={setUrl} />
    </div>
  );
};

export default Homepage;
