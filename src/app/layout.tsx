import type { Metadata } from "next";
import "./globals.css";

import { authOptions } from '../pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth"
import SessionProvider from "./SessionProvider";
import Login from "./Login";
import Home from "./page";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email;

  const allowedUser = atob(process.env.NEXTUSER ?? '') === sessionEmail;
  // console.log('Test:::', allowedUser)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!allowedUser ? (
            <Login />
          ) : (
            <Home />
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
