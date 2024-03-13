import SignUp from "@/components/Auth";
import React from "react";

type Props = {
  params: {
    type: string;
  };
};

const page = ({ params }: Props) => {
  return <SignUp type={params.type} />;
};

export default page;
