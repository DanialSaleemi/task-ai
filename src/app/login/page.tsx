"use client";
import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import bcrypt from "bcryptjs";
// import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const { replace } = useRouter();
  // const handleChange = (e: any) => {
  //   const { name, value } = e?.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  //   return formData;
  // };

  //   const submitData = async (LoginUserSchema: LoginUserInput) => {
  //     debugger;
  //     console.log("submitData!")
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`/api/auth/login/`, {
  //         method: "POST",
  //         cache: "no-cache",
  //         body: JSON.stringify(LoginUserSchema),
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       });
  //       const result = await res.json();
  //       if(result.ok){
  //         console.log("OK!")
  //         replace('/Profile');
  //       }else{
  //         console.log("Error in redirect page");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       console.log("login failed");
  //     } finally{
  //       setIsLoading(false);

  //     }
  //     // const saltRounds = 10;
  //     // const salt = await bcrypt.genSalt(saltRounds);
  //     // const hashPwd = await bcrypt.hash(formData.password, salt);
  //     // console.log("login password hash: ", hashPwd);

  //   };

  //   const { register, handleSubmit } = useForm<LoginUserInput>({
  //     resolver: zodResolver(LoginUserSchema),
  //   });

  return (
    <div className="flex items-center justify-center mt-10 h-2/3">
      <div className="bg-blue-200/30 z-50 shadow-2xl w-80 max-w-96 min-w-72 h-full rounded">
        <h1 className="font-extrabold text-center text-violet-700 text-opacity-70 text-lg py-4 mb-12">
          Login
        </h1>
        <div className="flex justify-center items-center">
          <form
            className="grid grid-flow-row space-y-4 w-11/12 max-w-sm"
            onSubmit={(event) => {
              console.log("here ...");
              // event.preventDefault();
              // handleSubmit(submitData);
              //   handleSubmit(submitData);
            }}
          >
            <div className="grid">
              <label className="font-bold text-violet-700 text-opacity-70">
                Email
              </label>
              <input
                type="email"
                // {...register("email")}
                id="email"
                name="email"
                placeholder="youremail@mailprovider.com"
                // value={formData.email}
                // onChange={handleChange}
                className="rounded shadow-blue-200 shadow-xl  text-md text-slate-600 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent"
              />
            </div>
            <div className="grid">
              <label className="font-bold text-violet-600 text-opacity-70">
                Password
              </label>
              <input
                type="password"
                // {...register("password")}
                id="password"
                name="password"
                placeholder="Your secret password"
                // value={formData.password}
                // onChange={handleChange}
                className="rounded shadow-blue-200 shadow-xl text-md text-slate-600 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent"
              />
              <div className="leading-none pt-5">
                <p className="text-slate-500">
                  New here?{" "}
                  <span className="text-blue-600 underline">
                    <Link href="/signup">Register now</Link>
                  </span>
                </p>
              </div>
            </div>
            <div className="grid justify-center">
              <button
                type="submit"
                className="rounded px-3 bg-violet-700/70 my-4 text-slate-50 font-semibold {`relative ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}"
                disabled={isLoading}
              >
                {isLoading ? "Loading ..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
