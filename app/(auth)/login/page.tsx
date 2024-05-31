"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error && res.error !== "undefined") {
        setError("Invalid credentials");
        return;
      }

      setError("");
      router.replace("/dashboard");
    });
  };

  return (
    <div className="w-full h-screen flex space-y-8 flex-col items-center justify-center">
      <h3 className="font-medium text-3xl">Log in</h3>
      <p className="text-sm !mt-2">
        Don&apos;t have an account?{" "}
        <Link
          className="hover:underline text-primary"
          tabIndex={-1}
          href={"/register"}
        >
          Register
        </Link>
      </p>
      <form
        onSubmit={(e) => handleLogin(e)}
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
          <Label htmlFor="username">Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Loading" : "Login"}
        </Button>
      </form>
    </div>
  );
};
export default Login;
