"use client";
import InputField from "@/components/InputField";
import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import axios from "axios";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

type Props = {
  onclick: () => void;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};
type cardDataType = {
  url: string;
  date: string;
  status: string;
  urlId: string;
};

const Homepage = () => {
  const [url, setUrl] = useState("");
  const [allUrl, setAllUrl] = useState<cardDataType[]>([]);
  const sendUrl = async () => {
    if (url) {
      const newid = uuid();
      const { data } = await axios.post("http://localhost:3030/test/scan", {
        url: url,
        userId: JSON.parse(localStorage.getItem("pentest") as string)["_id"],
        urlId: newid,
      });
      setAllUrl((pre) => [
        ...pre,
        { date: "", status: "scheduled", url: url, urlId: newid },
      ]);
      setUrl("");
    } else {
      alert("fill the input!!");
    }
  };

  const getUserRequest = async () => {
    const { data } = await axios.post(
      "http://localhost:3030/store/getuserrequest",
      {
        userId: JSON.parse(localStorage.getItem("pentest") as string)["_id"],
      },
      { withCredentials: true }
    );
    setAllUrl(data);
  };

  const socketfun = () => {
    const socket = io("http://localhost:3030");
    socket.emit(
      "join_team",
      JSON.parse(localStorage.getItem("pentest") as string)["_id"]
    );
    socket.on("status", (val) => {
      setAllUrl((prevUrls) => {
        const updatedUrls = prevUrls.map((data) => {
          if (data.urlId === val.urlId) {
            return { ...data, status: val.status };
          } else {
            return data;
          }
        });
        return updatedUrls;
      });
    });
  };

  useEffect(() => {
    getUserRequest();

    socketfun();
  }, []);

  return (
    <div className=" overflow-x-hidden">
      <UserList allUrl={allUrl} />
      <InputField sendUrl={sendUrl} url={url} setUrl={setUrl} />
    </div>
  );
};

export default Homepage;
