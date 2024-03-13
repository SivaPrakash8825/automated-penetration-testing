"use client";
import React from "react";

type Props = {
  title: string;
  onclick: () => void;
};

const Button = ({ title, onclick }: Props) => {
  return (
    <div
      onClick={onclick}
      className=" px-5 py-1 cursor-pointer text-center capitalize bg-yellow-500">
      {title}
    </div>
  );
};

export default Button;
