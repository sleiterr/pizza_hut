import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Fredoka, Epilogue, Fugaz_One, Oswald } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import Header from "@/components/Header/Header";
import { SanityLive } from "@/sanity/live";
import { DisableDraftMode } from "@/components/DisableDraftMode/disable-draft-mode";
import "../styles/globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const fugaz = Fugaz_One({
  variable: "--font-fugaz",
  subsets: ["latin"],
  weight: ["400"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pizza Hut",
  description: "Order pizza online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // draftMode не можна використовувати як await у функціональному компоненті, тому прибираємо цю логіку для клієнтського рендеру
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${epilogue.variable} ${oswald.variable} ${fugaz.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="overflow-x-hidden">
        <Header />
        {children}
        <SanityLive />
        <VisualEditing />
        <DisableDraftMode />
        <ToastContainer position="top-right" autoClose={2500} />
      </body>
    </html>
  );
}
