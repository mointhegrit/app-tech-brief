import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Intelligence Brief — daily signal from HN, DEV.to & GitHub",
  description:
    "Enter a focus topic and get an AI-written daily brief synthesized from Hacker News, DEV.to and GitHub.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
