"use client";

import React from "react";

import Nav from "../../components/Nav";
import Code from "@/app/components/Code";
import NameCard from "@/app/components/NameCard";
import Footer from "@/app/components/Footer";
import Emphasis from "@/app/components/Emphasis";

const url = process.env.NEXT_PUBLIC_API_URL;

interface User {
  name: string;
  role: string;
}

const SQLi = () => {
  const [name, setName] = React.useState("");
  const [userData, setUserData] = React.useState<User[] | null>(null);

  const searchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(url + `/user?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    if (data) {
      setUserData(data);
    } else {
      console.log("Error when fetching data")
    }
  }

  return (
    <>
      <Nav/>

      <div className="flex flex-col items-center font-bold">
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2">AN INTRODUCTION TO</h2>
        <h1 className="text-5xl">SQL INJECTION</h1>
      </div>

      <div className="flex flex-col justify-center items-center mx-10 px-24 py-6 text-lg space-y-6">
        <span>
        SQL injection (SQLi) occurs when attackers manipulate database applications by inserting malicious code into <Emphasis>SQL queries.</Emphasis> SQL, 
        or Structured Query Language, is a standard programming language for creating 
        and managing relational databases. When an application does not properly <Emphasis>validate</Emphasis> or <Emphasis>sanitise</Emphasis> user input, attackers exploitatively
        enter <Emphasis>code as data</Emphasis> into an input field, which then enables the execution of arbitrary SQL commands.
        </span>
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px font-bold">HOW IS SQLi PERFORMED</h2>
        <span>
        SQL commands are typically sent to the database to retrieve, insert, update, or delete data. 
        In particular, such SQL commands are constructed <Emphasis>from user inputs.</Emphasis> For instance, a web application may have a login form 
        where users are asked to enter their username and password. The application then constructs an SQL query to validate the credentials, such as
        </span>
        <Code value="SELECT * FROM users WHERE username = 'security_lover' AND password = 'password123';" language="sql" />
        <span>
          If the application does not sanitise the user input, SQLi vulnerabilities arise. For example, if an attacker enters
        </span>
        <Code value="' OR '1'='1" language="sql"/>
        <span>
          into the username input field, the resultant SQL query is then
          </span>
        <Code value="SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'password123';" language="sql" />
        <span>
          In this example scenario, the condition <pre className="inline">&apos;1&apos;=&apos;1&apos;</pre> always evaluates to true, and so the attacker successfully bypasses authentication to gain access into the application.
        </span>

        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px font-bold">TRY IT YOURSELF</h2>
        <span>
          Given the name of a user, the input form below searches the SQL database to check if this user already exists. If yes, then their name and role are displayed. Try typing in &quot;Alice&quot; to see
          the expected behaviour.
        </span>
      </div>

      <div className="flex flex-col w-screen place-items-center">
        <form onSubmit={searchUser} className="flex flex-col w-4/12 place-items-start border border-indigo-200 px-6 py-4 rounded">
          <h2 className="place-self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max text-lg px-3 py-px my-2 font-bold">Search for a user</h2>
          <div className="flex w-11/12 m-4">
            <label htmlFor='name'>Name</label>
            <input className="border-b rounded-sm mx-4 w-full px-1" type='text' id='name' placeholder="Alice" onChange={(e) => setName(e.target.value)} />
          </div>
          <button type='submit' className="place-self-end border border-indigo-100 text-indigo-500 px-4 py-2 rounded hover:bg-indigo-50 hover:text-indigo-700 duration-150">Search</button>
        </form>
        <div className="flex space-x-6">
          {userData && userData.map((user, index) => (
            <div key={index} className="my-4 text-2xl">
              <NameCard name={user.name}/>
              <p><strong className="place-self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max px-2 py-px">Role</strong> {user.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mx-10 px-10 py-6 text-lg space-y-2">
        <p>
          Now, rather than typing in a name, attempt an SQL injection by using the malicious code below. What do you get?
        </p>
        <Code value="' OR '1'='1" language="sql"/>
        <p>
        <i className="fa-solid fa-circle-question m-1"></i> Do SQL injections work anywhere else in this web application?
        </p>
      </div>

      <Footer/>
    </>
  );
}

export default SQLi;