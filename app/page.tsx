import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex space-y-4 flex-col items-center justify-center">
      <Image
        className="w-[360px] saturate-0"
        src={"/logo.png"}
        alt="Logo QuQuiz"
        width={500}
        height={300}
      />
      <p className="max-w-[40ch] font-semibold drop-shadow-md text-xl text-center">
        Quiz Genius: Craft Brainteasers, Challenge Minds.
      </p>
      <div className="flex-col !mt-8 space-y-3 flex w-80">
        <Link href="/login">
          <Button className="w-full">Login</Button>
        </Link>
        <Link href="/register">
          <Button className="w-full" variant={"secondary"}>
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
