"use client";

import React from "react";

interface NameCardProps {
    name: string;
  }

const NameCard: React.FC<NameCardProps> = ({ name }) => {

  return (
    <div className="mt-4 text-2xl">
    <p className="my-2"><strong className="place-self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max px-2 py-px">Name</strong> {name}</p>
  </div>
  );
};

export default NameCard;
