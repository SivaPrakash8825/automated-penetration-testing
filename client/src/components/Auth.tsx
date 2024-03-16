"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import axios from "axios";
import AngerTag from "./AngerTag";
import Authentication from "@/utils/Authentication";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
};

const Auth = ({ type }: Props) => {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [conPassword, setConPassword] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("pentest");
    if (user) {
      route.push("/home");
    }
  }, []);

  const Register = async () => {
    if (username && password === conPassword && password && email) {
      await axios.post("http://localhost:3030/auth/register", {
        email: email,
        username: username,
        password: password,
      });
    } else {
      alert("fill the details");
    }
  };
  const Login = async () => {
    if (password && email) {
      const { data } = await axios.post("http://localhost:3030/auth/login", {
        email: email,
        password: password,
      });
      console.log(data);
      localStorage.setItem("pentest", JSON.stringify(data));
      if (data) {
        route.push("/home");
      }
    } else {
      alert("fill the details log");
    }
  };

  return (
    <div className="w-screen  h-screen flex justify-center items-center">
      <Image src={"/rainbow-vortex.svg"} className=" -z-10" alt="image" fill />
      <div className=" w-4/6 h-3/4 bg-white flex rounded-3xl overflow-hidden">
        <div className=" flex-1 w-72 flex text-black items-center justify-center transition-all flex-col gap-y-3 h-auto py-5 px-7 bg-white rounded-lg ">
          {type == "signup" && (
            <input
              value={username}
              className="border border-black px-3 w-72 py-2 rounded-xl outline-none "
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="UserName"
              required
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border border-black px-3 w-72 py-2 rounded-xl outline-none "
            placeholder="E-mail"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black px-3 w-72 py-2 rounded-xl outline-none "
            type="password"
            placeholder="Password"
            required
          />
          {type == "signup" && (
            <input
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              className="border border-black px-3 w-72 py-2 rounded-xl outline-none "
              type="Password"
              placeholder="confirm password"
              required
            />
          )}
          <Button
            title={`${type == "signin" ? "login" : "register"}`}
            onclick={() => (type == "signin" ? Login() : Register())}
          />

          <AngerTag
            title={`${type == "signin" ? "signup" : "signin"}`}
            page={`auth/${type == "signin" ? "signup" : "signin"}`}
          />
        </div>
        <div className="flex-1  relative">
          <div className=" absolute w-full h-full z-20 flex justify-center items-center ">
            <div className=" w-[80%] h-[80%] rounded-3xl flex flex-col font-black  text-2xl text-wrap justify-center items-center backdrop-blur-sm bg-white/40">
              <h1>Automated Penetration </h1>
              <h1>Testing</h1>
              <Image src={"/bgnew.png"} width={300} height={300} alt="login" />
            </div>
          </div>
          <Image src={"/subtle-prism.svg"} className=" z-0 " alt="image" fill />
        </div>
      </div>
    </div>
  );
};

export default Auth;
