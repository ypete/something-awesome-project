const Footer = () => {
  return (
    <footer className="bg-blue-950 opacity-90 p-6 mx-4 mb-4 mt-10 rounded-lg flex flex-col">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-bold text-blue-300 tracking-wide w-max px-2 py-1 rounded">
            A PROJECT BY <span className="text-blue-200">PETER YANG</span> 
          </p>
          <p className="text-md font-bold text-slate-400 tracking-wide w-max px-2 py-1 rounded leading-5">
            COMP6841 <br/>
            <span className="text-slate-600"> Extended Security Engineering and Cyber Security</span>
          </p>
        </div>

        <a href="https://github.com/ypete/something-awesome-project" className="text-xl font-bold text-blue-300 tracking-wide w-max px-2 py-1 rounded h-max hover:text-white transition duration-100">
          GITHUB <i className="fa-brands fa-github"></i>
        </a>
      </div>
      <h2 className="mt-6 tracking-widest text-7xl font-bold self-center text-indigo-200">BLUECURITY</h2>
    </footer>
  );
};

export default Footer;