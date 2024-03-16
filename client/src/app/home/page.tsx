"use client";
import InputField from "@/components/InputField";
import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import axios from "axios";
import { io } from "socket.io-client";
<<<<<<< HEAD
=======
import { v4 as uuid } from "uuid";
>>>>>>> 257fb928c2e629ac43df05dd5507f0af1cf59b66

type Props = {
  onclick: () => void;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};
type cardDataType = {
  url: string;
  date: string;
  status: string;
<<<<<<< HEAD
=======
  urlId: string;
>>>>>>> 257fb928c2e629ac43df05dd5507f0af1cf59b66
};

const Homepage = () => {
  const [url, setUrl] = useState("");
  const [allUrl, setAllUrl] = useState<cardDataType[]>([]);
  const sendUrl = async () => {
    if (url) {
<<<<<<< HEAD
      const { data } = await axios.post("http://localhost:3030/scan", {
        url: url,
        userId: JSON.parse(localStorage.getItem("pentest") as string)["_id"],
      });
      console.log(data);

      setAllUrl((pre) => [...pre, { date: "", status: "", url: url }]);
=======
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
>>>>>>> 257fb928c2e629ac43df05dd5507f0af1cf59b66
      setUrl("");
    } else {
      alert("fill the input!!");
    }
  };

  const getUserRequest = async () => {
    const { data } = await axios.post(
<<<<<<< HEAD
      "http://localhost:3030/getuserrequest",
=======
      "http://localhost:3030/store/getuserrequest",
>>>>>>> 257fb928c2e629ac43df05dd5507f0af1cf59b66
      {
        userId: JSON.parse(localStorage.getItem("pentest") as string)["_id"],
      },
      { withCredentials: true }
    );
    setAllUrl(data);
  };

<<<<<<< HEAD
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
=======
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
>>>>>>> 257fb928c2e629ac43df05dd5507f0af1cf59b66
  }, []);

  return (
    <div className=" overflow-x-hidden">
      <UserList allUrl={allUrl} />
      <InputField sendUrl={sendUrl} url={url} setUrl={setUrl} />
    </div>
  );
};

export default Homepage;
