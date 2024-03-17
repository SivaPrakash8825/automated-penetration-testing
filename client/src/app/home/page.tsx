"use client";
import InputField from "@/components/InputField";
import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import axios from "axios";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import SideNav from "@/components/SideNav";

type Props = {
  onclick: () => void;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};
type cardDataType = {
  url: string;
  date: string;
  status: "error" | "testerror" | "completed" | "inprogress" | "scheduled";
  urlId: string;
  nmapstatus: boolean;
  zapstatus: boolean;
};

const Homepage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [allUrl, setAllUrl] = useState<cardDataType[]>([]);
  const sendUrl = async () => {
    try {
      if (url) {
        // const response = await fetch(url); // Replace with your desired host's domain
        if (true) {
          if (
            url.trim().startsWith("http://") ||
            url.trim().startsWith("https://")
          ) {
            setLoading(true);
            const newid = uuid();
            const { data } = await axios.post(
              "http://localhost:3030/test/scan",
              {
                url: url.trim(),
                userId: JSON.parse(localStorage.getItem("pentest") as string)[
                  "_id"
                ],
                urlId: newid,
              }
            );
            setAllUrl((pre) => [
              ...pre,
              {
                date: "",
                status: "scheduled",
                url: url,
                urlId: newid,
                nmapstatus: false,
                zapstatus: false,
              },
            ]);
            setLoading(false);
            setUrl("");
          } else {
            toast.error("Invalid url", {
              duration: 2000,
              position: "top-center",
              iconTheme: {
                primary: "red",
                secondary: "#fff",
              },
            });
          }
        }
      } else {
        toast.error("Fill the input!!", {
          duration: 2000,
          position: "top-center",
          iconTheme: {
            primary: "red",
            secondary: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("host is down", {
        duration: 2000,
        position: "top-center",
        iconTheme: {
          primary: "red",
          secondary: "#fff",
        },
      });
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
      console.log(val);

      setAllUrl((prevUrls) => {
        const updatedUrls = prevUrls.map((data) => {
          if (data.urlId === val.urlId) {
            return {
              ...data,
              status: val.status,
              nmapstatus: val.nmapstatus == undefined ? false : val.nmapstatus,
              zapstatus: val.zapstatus == undefined ? false : val.zapstatus,
            };
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
      <SideNav />
      <UserList allUrl={allUrl} />
      <InputField
        sendUrl={sendUrl}
        url={url}
        setUrl={setUrl}
        loading={loading}
      />
    </div>
  );
};

export default Homepage;
