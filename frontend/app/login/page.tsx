"use client";

import { FormSchema, formSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: FormSchema) => {
    setError(null);
    const res = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const responseData = await res.json();
    if (!res.ok) {
      setError(responseData.message || "Login failed");
    }
    reset();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Login </h1>
          <p className="text-gray-600">Welcome to the the site .</p>
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="mt-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-2"
            >
              {error}
            </div>
          )}
        </div>
        <div className="mb-4">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 ">
            {/*username or email */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <input
                className="mt-2 p-2 border border-gray-400 rounded-lg bg-gray-100 w-full :hover:border-gray-500 focus:outline-none focus:ring-2  focus:border-transparent"
                type="text"
                id="identifier"
                {...register("identifier")}
              />
              {errors.identifier && (
                <p className="text-red-500">{errors.identifier.message}</p>
              )}
            </div>
            {/*username or email */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                className="mt-2 p-2 border border-gray-400 rounded-md bg-gray-100 w-full :hover:border-gray-500 focus:outline-none focus:ring-2  focus:border-transparent"
                type="password"
                id="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            {/*submitting button */}
            <div className="mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold transition transform 
                  bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                  disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-0.5`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
