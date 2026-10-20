import React from "react";

const Register = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-rose-950/70 min-h-screen min-w-screen text-white p-2 ">
      <div className="flex p-3 justify-between">
        <h1 className="ml-5  text-red-500 font-bold text-4xl ">
          Register Page
        </h1>
        <nav className="mr-4">
          <a href="" className="">
            Login
          </a>
        </nav>
      </div>
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-rose-950/70 min-h-screen min-w-screen text-white flex justify-center items-center">
        <form
          action=""
          className="flex flex-col  border-2 border-white/10 bg-gradient-to-br from-gray-900 via-gray-900 to-rose-950/70 
     shadow-2xl shadow-[6px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shadow-red-950/30 backdrop-blur-xl text-white gap-4 rounded-2xl w-full max-w-md   p-6 sm:p-8 "
        >
          <h1 className="font-bold text-3xl text-red-500">Register </h1>
          <p>Create your account with Perplexity.</p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="UserName"
            className="w-[90%] ml-3 outline rounded p-2"
            name="username"
            id=""
          />
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            placeholder="You@gmail.com"
            className="w-[90%] ml-3 outline rounded p-2"
            name=""
            id=""
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-[90%] ml-3 outline rounded p-2"
            name=""
            id=""
          />
          <input
            type="submit"
            className="cursor-pointer active:scale-90 bg-red-500 w-[90%] ml-3 p-2 rounded-md font-bold mb-2  "
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
