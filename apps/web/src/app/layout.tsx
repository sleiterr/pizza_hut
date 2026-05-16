import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Fredoka, Epilogue } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/live";
import { DisableDraftMode } from "@/components/DisableDraftMode/disable-draft-mode";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Pizza Hut",
  description: "Order pizza online",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${epilogue.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <SanityLive />
        {isEnabled ? (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        ) : null}
      </body>
    </html>
  );
}
