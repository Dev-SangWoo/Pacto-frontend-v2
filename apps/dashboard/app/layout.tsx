import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Pacto Dashboard",
  description: "Pacto B2B campaign operation dashboard",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
