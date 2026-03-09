import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Craft.js Demo",
  description: "Page builder using Craft.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
