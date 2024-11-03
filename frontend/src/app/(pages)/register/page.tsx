"use client";

import React from "react";
import { useRouter } from 'next/navigation';

import Nav from "../../components/Nav";
import Footer from "@/app/components/Footer";

const url = "http://localhost:3000";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(url + `/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password }),
    });

    const data = await res.json();

    if (data) {
      if (data.userId) {
        router.push(`/user/${username}`);
      } else {
        console.log("Error when signing up");
        router.push('/error');
      }
    } else {
      console.log("An unexpected error occured");
    }
  }

  return (
    <>
      <Nav/>
      <div className="flex flex-col h-[53vh] w-screen justify-center place-items-center">
        <form onSubmit={registerUser} className="flex flex-col w-4/12 place-items-start border border-indigo-200 px-6 py-4 rounded">
          <h2 className="place-self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max text-lg px-3 py-px my-2 font-bold"><i className="fa-solid fa-user-plus"></i> Register</h2>
          <div className="flex w-11/12 m-4">
            <label htmlFor='username' className="w-4/12">Username</label>
            <input className="border-b rounded-sm mx-4 w-full px-1" type='text' id='username' placeholder="Your name" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="flex w-11/12 m-4">
            <label htmlFor='password' className="w-4/12">Password</label>
            <input className="border-b rounded-sm mx-4 w-full px-1" type='text' id='password' placeholder="Select a strong password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className="place-self-end border border-indigo-100 text-indigo-500 px-4 py-2 rounded hover:bg-indigo-50 hover:text-indigo-700 duration-150">Sign up</button>
        </form>
      </div>
      <Footer/>
    </>
  );
}