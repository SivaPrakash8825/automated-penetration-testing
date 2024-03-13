import React from "react";

import Link from "next/link";
type Props = {
  title: string;
  page: string;
};

const AngerTag = ({ title, page }: Props) => {
  return (
    <Link className=" text-red-600" href={`/${page}`}>
      {title}
    </Link>
  );
};

export default AngerTag;
