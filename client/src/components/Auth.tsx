"use client";

import React, { useEffect, useState } from "react";
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
      await axios.post("http://localhost:3030/register", {
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
      const { data } = await axios.post("http://localhost:3030/login", {
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
    <div className="w-screen  h-screen bg-slate-500 flex justify-center items-center">
      <div className=" w-72 flex text-black transition-all flex-col gap-y-3 h-auto py-5 px-7 bg-white rounded-lg ">
        {type == "signup" && (
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="user name"
            required
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-mail"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          required
        />
        {type == "signup" && (
          <input
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
            type="password"
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
    </div>
  );
};

export default Auth;
