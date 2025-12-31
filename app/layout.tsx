import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yearly Calendar",
  description: "Create and customize your yearly calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
