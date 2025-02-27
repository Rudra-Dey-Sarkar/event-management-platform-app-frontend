import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "../../components/ClientLayout/ClientLayout";
import { GlobalContextWrapper } from "../../GlobalContext/GlobalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EMPA",
  description: "Event Management Platform App is a event management application ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalContextWrapper>
          <ClientLayout>
            {children}
          </ClientLayout>
        </GlobalContextWrapper>
      </body>
    </html>
  );
}
