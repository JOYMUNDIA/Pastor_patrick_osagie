import type { Metadata } from "next";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata: Metadata = {
  title: "Pastor Patrick D. Osagie",
  description: "Official website of Pastor Patrick D. Osagie",
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