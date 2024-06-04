import { ReactNode } from "react";
import Navbar from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-8 max-w-6xl mx-auto min-h-screen relative">
        {children}
      </div>
    </>
  );
};
export default ProtectedLayout;
