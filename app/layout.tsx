import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ProgressBarProvider from "@/components/progress-bar";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QuQuiz",
  description: "Qu to Quiz your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ProgressBarProvider>
          {children}
          <Toaster richColors position="bottom-center" />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
