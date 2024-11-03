"use client";

import React from "react";
import { useRouter } from 'next/navigation';

import Nav from "@/app/components/Nav";
import NameCard from "@/app/components/NameCard";
import Footer from "@/app/components/Footer";

const url = "http://localhost:3000";

export default function User({ params: paramsPromise }: { params: Promise<{ username: string }> }) {
  const params = React.use(paramsPromise);
  const { username } = params;
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(url + "/users");
        const data = await res.json();
        const usernames = data.users;
        if (usernames.includes(username)) {
          setIsAuthorized(true);
        } else {
          router.push('/error');
        }
      } catch (error) {
        console.error("An error was encountered, ", error);
        router.push('/error');
      }
    };

    getUsers();

  }, [username, router]);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(url + "/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          oldPassword,
          newPassword,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error("An error was encountered, ", error);
      router.push('/error');
    }
  }
  
  if (!isAuthorized) return null;

  return (
    <>
      <Nav/>
      <div className="flex flex-col font-bold items-center">
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-2xl sm:text-3xl px-3 py-px my-2">SECRET</h2>
        <h1 className="text-3xl sm:text-5xl">USER PORTAL</h1>
      </div>
      <div className="flex flex-col px-6 py-6 items-center">
        <div>
          <h3 className="bg-gradient-to-t from-teal-50 to-indigo-50 rounded-t w-max text-2xl px-3 py-px">YOUR</h3>
          <h2 className="bg-gradient-to-r from-teal-50 to-indigo-50 rounded-b w-max text-2xl px-3 py-1 mb-2 font-bold">BLUEBERRY ACCOUNT</h2>
        </div>
        <NameCard name={username} />
      </div>


      <div className="flex flex-col w-screen place-items-center">
        <form onSubmit={changePassword} className="flex flex-col w-5/12 place-items-start border border-indigo-200 px-6 py-4 rounded">
          <h2 className="place-self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max text-lg px-3 py-px my-2 font-bold"><i className="fa-solid fa-key"></i> Update Password</h2>
          <div className="flex w-11/12 m-4">
            <label htmlFor='old-password' className="w-4/12">Old Password</label>
            <input className="border-b rounded-sm mx-4 w-full px-1" type='text' id='old-password' placeholder="Your current password" onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className="flex w-11/12 m-4">
            <label htmlFor='password' className="w-4/12">New Password</label>
            <input className="border-b rounded-sm mx-4 w-full px-1" type='text' id='password' placeholder="Your new password" onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <button type='submit' className="place-self-end border border-indigo-100 text-indigo-500 px-4 py-2 rounded hover:bg-indigo-50 hover:text-indigo-700 duration-150">Save</button>
        </form>
      </div>
      <Footer/>
    </>
  );
}
