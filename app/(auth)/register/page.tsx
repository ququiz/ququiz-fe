"use client";

import { signUp } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await signUp({ email, fullname, username, password });
      if (res?.error && res.error !== "undefined") {
        if (res.error !== "Configuration") {
          setError(res.error);
        } else {
          setError(
            "An error occurred while registering. Please try again later."
          );
        }
        return;
      }

      setError("");
      router.replace("/dashboard");
    });
  };

  return (
    <div className="w-full h-screen flex space-y-8 flex-col items-center justify-center">
      <h3 className="font-medium text-3xl">Create an account</h3>
      <p className="text-sm !mt-2">
        Already have an account?{" "}
        <Link
          className="hover:underline text-primary"
          tabIndex={-1}
          href={"/login"}
        >
          Login
        </Link>
      </p>
      <form
        onSubmit={(e) => handleRegister(e)}
        className="flex-col space-y-4 flex w-[30rem]"
      >
        {error && (
          <div className="text-sm flex items-center justify-between bg-red-500/30 border border-red-700 text-red-700 rounded-sm px-4 py-3">
            <span>{error}</span>{" "}
            <X
              onClick={() => setError("")}
              className="flex-shrink-0 cursor-pointer w-5 stroke-red-700"
            />
          </div>
        )}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Loading" : "Register"}
        </Button>
      </form>
    </div>
  );
};
export default Register;
