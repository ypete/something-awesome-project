"use client";

import React from "react";
import { useRouter } from 'next/navigation';

import Nav from "../../components/Nav";
import Footer from "@/app/components/Footer";
import Code from "@/app/components/Code";
import Emphasis from "@/app/components/Emphasis";
import NameCard from "@/app/components/NameCard";

const url = "http://localhost:3000";

export default function Auth() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(url + `/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password }),
    });

    const data = await res.json();
    if (data) {
      if (data.userId) {
        router.push(`${data.redirect}/${username}`);
      } else {
        console.log("Error when logging in");
        router.push('/error?message=Unauthorised');
      }
    } else {
      console.log("Error when fetching data");
    }
  }

  return (
    <>
      <Nav/>
      <div className="flex flex-col w-screen place-items-center my-10">
        <form onSubmit={loginUser} className="flex flex-col w-4/12 place-items-start border border-indigo-200 px-6 py-4 rounded">
          <h2 className="place-self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max text-lg px-3 py-px my-2 font-bold"><i className="fa-solid fa-fingerprint"/> Sign in</h2>
          <div className="flex w-11/12 m-4">
            <label htmlFor='username' className="w-4/12">Username</label>
            <input className="border-b rounded-sm mx-4 w-full px-1" type='text' id='username' placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="flex w-11/12 m-4">
            <label htmlFor='password' className="w-4/12">Password</label>
            <input className="border-b rounded-sm mx-4 w-full px-1" type='text' id='password' placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className="place-self-end border border-indigo-100 text-indigo-500 px-4 py-2 rounded hover:bg-indigo-50 hover:text-indigo-700 duration-150">Sign in</button>
        </form>
      </div>

      <div className="flex flex-col items-center font-bold mt-10">
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2">AN INTRODUCTION TO</h2>
        <h1 className="text-5xl">INSECURE DIRECT OBJECT REFERENCE</h1>
      </div>

      <div className="flex flex-col justify-center items-center mx-10 px-24 py-6 text-lg space-y-6">
        <span>
          Insecure Direct Object Reference (IDOR) is an access control vulnerability that allows an attacker to 
          access or manipulate resources in a system by <Emphasis>altering a unique identifier</Emphasis>, without requiring any special 
          permissions. For examples, attackers may manipulate parameters to view or modify 
          restricted resources, potentially compromising sensitive data and exposing the application to 
          various security risks.
        </span>
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2 font-bold">HOW DOES IT WORK</h2>
        <span>
          IDOR vulnerabilities commonly arise in applications that use unique identifiers (such as IDs or usernames) <Emphasis>within URLs</Emphasis> to refer to specific resources.
        </span>
        <Code value="https://example.com/user/profile?userId=1345" language="html" />
        <span>
          In this example, <pre className="inline">1345</pre> is the unique identifier for a user’s profile. If the application does not 
          verify that the current user has permission to view the profile for this user, an attacker may simply type this URL into their
          browser to gain unauthorised access.
        </span>

        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2 font-bold">TRY IT YOURSELF</h2>
        <span className="flex flex-col">
          <span>Try signing in to Bluecurity for the following users. All passwords are <pre className="inline">password</pre> by default.</span>
          <ul className="list-disc list-inside self-center">
            <li><NameCard name="Alice"/></li>
            <li><NameCard name="Bob"/></li>
            <li><NameCard name="Carl"/></li>
            <li><NameCard name="Dave"/></li>
          </ul>
        </span>
        <span>
          Once you've signed in, take a look at the URL. Is it possible to change the unique identifier to gain 
          access to another user's Bluecurity account?
        </span>
      </div>

      <Footer/>
    </>
  );
}