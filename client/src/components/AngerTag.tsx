import React from "react";

import Link from "next/link";
type Props = {
  title: string;
  page: string;
};

const AngerTag = ({ title, page }: Props) => {
  return (
    <Link
      className="w-full text-black border text-center py-1 rounded-2xl"
      href={`/${page}`}>
      {title}
    </Link>
  );
};

export default AngerTag;
