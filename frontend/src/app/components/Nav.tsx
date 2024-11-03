"use client";

import React from "react";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/navigation";

const Nav: React.FC = () => {
  const router = useRouter();

  const authenticate = () => {
    router.push("/auth");
  };
  const register = () => {
    router.push("/register");
  }

  const links = [
    { name: "Home", path: "/" },
    { name: "SQLi", path: "/sqli" },
    { name: "XSS", path: "/xss" },
    { name: "Directory Traversal", path: "/resources" },
  ];

  return (
    <nav className="flex mx-1 mt-2 mb-4 py-4 justify-center sticky top-0 z-50 drop-shadow-sm">
        <div className="w-10/12 rounded-lg bg-gradient-to-l from-indigo-300 to-indigo-50 ring-1 ring-transparent hover:ring-indigo-200 transition duration-200 ease-in-out">
            <ul className="flex space-x-14 justify-center items-center px-5 min-h-16">
                <li>
                  <Link href={"/"}><img src="/icon.png" alt="icon" className="h-8 hover:opacity-80 transition duration-100" /></Link>
                </li>
                {links.map((link) => (
                    <li key={link.path} className="flex px-3 py-2 min-w-16 justify-center rounded hover:bg-indigo-50 duration-150">
                        <Link href={link.path} className="hover:underline underline-offset-4 decoration-indigo-300 transition duration-150">{link.name}</Link>
                    </li>
                ))}
                <li>
                  <Button onClick={register} value="Sign up" />
                  <Button onClick={authenticate} value="Sign in" />
                </li>
            </ul>

        </div>
    </nav>
  );
};

export default Nav;
