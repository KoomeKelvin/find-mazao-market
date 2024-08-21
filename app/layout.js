import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "find-mazao-market",
  description: "An assistant towards your Hass avocado endeavours",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <SignedOut>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
