import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import { StoreProvider } from "@/shared/store/provider";
import { ToastProvider } from "@/shared/lib/toastContext";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FurgleAI Dashboard",
  description: "FurgleAI Security Operating System Control Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white font-sans flex flex-col">
        <StoreProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
