import "./globals.css";
import { UIProvider } from "@/providers/UIProvider";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Filtering Test App",
  description: "This web app is nothing...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={nunito.className}>
        <UIProvider>{children}</UIProvider>
        <Analytics />
      </body>
    </html>
  );
}
