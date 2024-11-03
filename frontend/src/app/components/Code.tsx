"use client";

import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.css';

import 'prismjs/components/prism-markup.min';
import 'prismjs/components/prism-sql.min';

import React from "react";

interface CodeProps {
  value: string;
  language: 'html' | 'sql';
}

const Code: React.FC<CodeProps> = ({ value, language }) => {
  const codeRef = React.useRef<HTMLPreElement>(null);

  React.useEffect(() => {
    if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
    }
}, [value]);


  return (
    <div className='flex w-screen justify-center'>
      <pre>
        <code ref={codeRef} className={`language-${language}`}>
          {value}
        </code>
      </pre>
    </div>
  );
};

export default Code;
