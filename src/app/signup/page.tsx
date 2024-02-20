'use client'
import Link from 'next/link';
import React from 'react'

export const Register = () => {
  return (
    <div className="flex items-center justify-center mt-10 h-2/3">
      <div className=" bg-blue-200/30 z-50 shadow-2xl w-80 max-w-96 min-w-72 h-full rounded-sm">
        <h1 className="font-extrabold text-center text-violet-700 text-opacity-80 text-lg py-4 mb-5">
          Sign Up
        </h1>
        <div className="flex justify-center">
          <form
            className="grid grid-flow-row space-y-4 max-w-sm"
            // onSubmit={handleSubmit}
          >
            <div className="grid">
              <label className="font-bold text-violet-600 text-opacity-70">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                // value={formData.name}
                placeholder="Your Name"
                // onChange={handleChange}
              className="rounded text-md text-slate-600 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent"  
              />
            </div>
            <div className="grid">
              <label className="font-bold text-violet-600 text-opacity-70">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Contact number (OPTIONAL)"
                // value={formData.phone}
                // onChange={handleChange}
                className="rounded text-md text-slate-600 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent"
              />
            </div>
            <div className="grid">
              <label className="font-bold text-violet-600 text-opacity-70">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="youremail@mail.com"
                // value={formData.email}
                // onChange={handleChange}
                className="rounded text-md text-slate-600 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent"
              />
            </div>
            <div className="grid">
              <label className="font-bold text-violet-600 text-opacity-70">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                // value={formData.password}
                // onChange={handleChange}
                className="rounded text-md text-slate-600 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent"
              />
            </div>
            <div className="grid">
              <label className="font-bold text-violet-600 text-opacity-70">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Retype your password"
                // value={formData.password}
                // onChange={handleChange}
                className="rounded text-md text-slate-600 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent"
              />
            </div>
            <div className="leading-none">
              <p className="text-slate-500">
                Already have an account?{" "}
                <span className="text-blue-600 underline">
                  <Link href={"/login"}>Login here</Link>
                </span>
              </p>
            </div>
            <div className="grid justify-center">
              <button
                type="submit"
                className="rounded-sm px-3 bg-violet-700/70 my-4 text-slate-50 font-semibold {`relative ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}"
                // disabled={isLoading}
              >Register
                {/* {isLoading ? "Loading ..." : "Register"} */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register