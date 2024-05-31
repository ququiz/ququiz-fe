import { ReactNode } from "react";
import Navbar from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="pt-14">{children}</div>
    </>
  );
};
export default ProtectedLayout;
