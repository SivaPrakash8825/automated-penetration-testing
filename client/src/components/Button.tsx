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
      className="w-full rounded-2xl px-5 py-2 cursor-pointer text-center capitalize bg-[#5f48ee] text-white">
      {title}
    </div>
  );
};

export default Button;
