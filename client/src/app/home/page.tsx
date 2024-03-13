import InputField from "@/components/InputField";
import React from "react";
import UserList from "./UserList";

type Props = {};

const Homepage = (props: Props) => {
  return (
    <div className=" overflow-x-hidden">
      <UserList />
      <InputField />
    </div>
  );
};

export default Homepage;
