"use client";

import React from "react";
import { useRouter } from 'next/navigation';

import Nav from "@/app/components/Nav";
import NameCard from "@/app/components/NameCard";
import Footer from "@/app/components/Footer";

const url = "http://localhost:3000";

export default function Admin({ params: paramsPromise }: { params: Promise<{ username: string }> }) {
  const params = React.use(paramsPromise);
  const { username } = params;
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [adminsList, setAdminsList] = React.useState([]);
  const [usersList, setUsersList] = React.useState([]);

  React.useEffect(() => {
    const listAdmins = async () => {
      try {
        const res = await fetch(url + "/admins");
        const data = await res.json();
        setAdminsList(data.admins);
      } catch (error) {
        console.error("An error was encountered, ", error);
        router.push('/error');
      }
    }
    const listUsers = async () => {
      try {
        const res = await fetch(url + "/users");
        const data = await res.json();
        setUsersList(data.users);
      } catch (error) {
        console.error("An error was encountered, ", error);
        router.push('/error');
      }
    }
    listAdmins();
    listUsers();
  }, [router]);

  React.useEffect(() => {
    const validateAdmin = async () => {
      try {
        const res = await fetch(url + "/admins");
        const data = await res.json();
        const adminUsernames = data.admins;
        if (adminUsernames.includes(username)) {
          setIsAuthorized(true);
        } else {
          router.push('/error');
        }
      } catch (error) {
        console.error("An error was encountered, ", error);
        router.push('/error');
      }
    };

    validateAdmin();

  }, [username, router]);
  
  if (!isAuthorized) return null;

  return (
    <>
      <Nav/>
      <div className="flex flex-col font-bold items-center">
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-2xl px-3 py-px my-2">SECRET</h2>
        <h1 className="text-3xl sm:text-5xl">ADMIN PORTAL</h1>
      </div>
      <div className="flex justify-evenly m-6 px-36">
        <div className="flex flex-col border rounded px-6 py-4">
          <h2 className="bg-gradient-to-r from-teal-50 to-indigo-50 rounded w-max text-2xl px-3 py-1 mt-2 self-center">ADMINS</h2>
          {adminsList.map((username, index) => (
            <NameCard name={username} key={index}/>
          ))}
        </div>
        <div className="flex flex-col border rounded px-6 py-4">
          <h2 className="bg-gradient-to-r from-teal-50 to-indigo-50 rounded w-max text-2xl px-3 py-1 mt-2 self-center">USERS</h2>
          {usersList.map((username, index) => (
            <NameCard name={username} key={index}/>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}
