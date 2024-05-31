import { Button } from "@/components/ui/button";
import { ClipboardList, History, Home, PlusCircle, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 flex px-4 py-3 h-14 items-center border-b justify-between">
      <div className="flex h-full space-x-16">
        <Link href="/dashboard">
          <Image
            className="h-full saturate-0 w-auto"
            src={"/logo.png"}
            alt="logo ququiz"
            width={400}
            height={200}
          />
        </Link>
        <ul className="flex font-medium text-sm items-center space-x-6">
          <li>
            <Link className="flex items-center space-x-2" href="/dashboard">
              <Home className="w-4" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-2"
              href="/dashboard/quiz"
            >
              <ClipboardList className="w-4" />
              <span>Manage Quiz</span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center space-x-2" href="/quiz/history">
              <History className="w-4" />
              <span>Activity</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-2"
              href="/dashboard/profile"
            >
              <User2 className="w-4" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
      <Link href={""}>
        <Button className="flex items-center space-x-2" size={"sm"}>
          <PlusCircle className="w-4" />
          <span>Create a quiz</span>
        </Button>
      </Link>
    </nav>
  );
};
export default Navbar;
