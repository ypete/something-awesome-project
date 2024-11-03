"use client";

import React from "react";

interface ButtonProps {
    value: string,
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => {

  return (
    <button onClick={onClick} className="bg-indigo-50 text-indigo-500 px-4 py-2 mx-2 rounded hover:bg-neutral-50 hover:text-indigo-700 duration-150">
        {value}
    </button>
  );
};

export default Button;
