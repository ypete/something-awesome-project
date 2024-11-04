import Link from "next/link";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Emphasis from "./components/Emphasis";

export default function Home() {
  return (
    <>
      <div className="fixed w-full z-50">
        <Nav/>
      </div>
      <div className="absolute top-0 left-0 h-screen font-bold bg-[url('/banner.jpg')] relative bg-cover bg-center bg-fixed">
        <div className="z-10 h-full flex flex-col items-center justify-center">
          <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2">EXPLORE</h2>
          <h1 className="text-5xl text-white"><i className="fa-solid fa-shield-halved"/> WEB SECURITY</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-10 p-8 space-y-4">
        <p className="text-xl">
          A <Emphasis>something awesome</Emphasis> showcase of common security vulnerabilities in web development.
        </p>
        <p className="text-lg">
          In the early days of the internet, security was often an afterthought. However, with malicious actors on the rise, the need for robust security measures has become paramount. 
          Discover common exploits like SQL Injection, Cross-Site Request Forgery, Cross-Site Scripting, and Directory Traversal. Learn how to identify, prevent, and mitigate these threats.
        </p>
        <div className="flex flex-col">
          <Link href="/sqli" className="hover:bg-gradient-to-r from-teal-50 to-indigo-50 rounded px-2 py-1 border-b"><i className="fa-solid fa-chevron-right m-2"></i> SQL Injection (SQLi)</Link>
          <Link href="/xss" className="hover:bg-gradient-to-r from-teal-50 to-indigo-50 rounded px-2 py-1 border-b"><i className="fa-solid fa-chevron-right m-2"></i> Cross-Site Scripting (XSS)</Link>
          <Link href="/resources" className="hover:bg-gradient-to-r from-teal-50 to-indigo-50 rounded px-2 py-1 border-b"><i className="fa-solid fa-chevron-right m-2"></i> Directory Traversal (Path Traversal) Attack</Link>
          <Link href="/auth" className="hover:bg-gradient-to-r from-teal-50 to-indigo-50 rounded px-2 py-1 border-b"><i className="fa-solid fa-chevron-right m-2"></i> Insecure Direct Object Reference (IDOR)</Link>
        </div>
      </div>

      <Footer/>
    </>

  );
}
