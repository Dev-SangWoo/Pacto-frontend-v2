import type { Metadata, Viewport } from "next";

import { PwaInstallProvider } from "./_components/pwa-install-provider";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Pacto Blogger",
  title: {
    default: "Pacto Blogger",
    template: "%s | Pacto",
  },
  description: "캠페인을 찾고 미션과 보상을 관리하는 Pacto 블로거 앱",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pacto",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/pacto-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/pacto-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1677f2",
  viewportFit: "cover",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <PwaInstallProvider>{children}</PwaInstallProvider>
      </body>
    </html>
  );
}
