"use client";

import Code from "@/app/components/Code";
import Emphasis from "@/app/components/Emphasis";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import React from "react";

const url = "http://localhost:3000";

const Resources: React.FC = () => {
  const [resourceUrl, setResourceUrl] = React.useState("");
  const [imageData, setImageData] = React.useState<string | null>(null);

  const fetchResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/resources?filename=${encodeURIComponent(resourceUrl)}`);
      
      if (res.ok) {
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } else {
        console.error("Failed to fetch resource:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching resource:", error);
    }
  };

  return (
    <>
      <Nav/>

      <div className="flex flex-col items-center font-bold">
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2">AN INTRODUCTION TO</h2>
        <h1 className="text-5xl">DIRECTORY TRAVERSAL ATTACKS</h1>
      </div>

      <div className="flex flex-col justify-center items-center mx-10 px-24 py-6 text-lg space-y-6">
        <span>
        A Directory Traversal Attack, often referred to as a Path Traversal Attack, is a type of web security vulnerability
        that allows attackers to manipulate <Emphasis>file paths</Emphasis> by exploiting weaknesses in an application&apos;s <Emphasis>input validation.</Emphasis> As 
        a result, attackers trick the application into accessing files 
        and directories outside the intended scope, potentially compromising sensitive information.
        </span>
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2 font-bold">HOW DOES IT WORK</h2>
        <span>
        In many web applications, user inputs are used to access resources on the server, such as files or directories. 
        This is common in applications where users are permitted to upload, download, or view files. For example, 
        a web application might have a URL pattern like
        </span>
        <Code value="https://example.com/view?file=user.txt" language="html" />
        <span>
          The <Emphasis>file</Emphasis> parameter specifies which file is to be retrieved from the server. If the application does not validate the value of this parameter, 
          an attacker could modify it to point to other directories. Primarily, by using special characters like <pre className="inline">../</pre>, 
          the attacker could traverse through parent directories and gain access to files located higher up in the directory tree.
        </span>

        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2 font-bold">TRY IT YOURSELF</h2>
        <span>
          The following input form lets users search for an image in the <pre className="inline">/images</pre> directory, and if found, displays it. 
          For example, searching <pre className="inline">default.jpeg</pre> reveals an image of a chameleon.
        </span>
      </div>

      <div className="flex flex-col w-screen place-items-center">
        <form onSubmit={fetchResource} className="flex flex-col w-4/12 place-items-start border border-indigo-200 px-6 py-4 rounded">
          <h2 className="place-self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max text-lg px-3 py-px my-2 font-bold">Request an image</h2>
          <input className="border-b rounded-sm px-1 w-full my-4" type="text" value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)} placeholder="default.jpeg"/>
          <button type='submit' className="place-self-end border border-indigo-100 text-indigo-500 px-4 py-2 rounded hover:bg-indigo-50 hover:text-indigo-700 duration-150">Search</button>
          {imageData && <img src={imageData} alt="Requested image" className="pb-1 pt-4" />}
        </form>
      </div>

      <div className="flex flex-col justify-center items-center mx-10 px-24 py-6 text-lg space-y-6">
        <span>
          Now, let&apos;s try a directory traversal attack. What happens if you search for the following &quot;image&quot;? Are you allowed to download it?
        </span>
      </div>

      <Code value="../secret.txt" language="html" />
      <Footer/>
    </>

  );
};

export default Resources;
