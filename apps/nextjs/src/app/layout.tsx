import { Inter } from "next/font/google";

import "@/styles/globals.css";
import LocalFont from "next/font/local";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";

import { cn } from "@acme/ui";

import { siteConfig } from "./config";

// import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontCal = LocalFont({
  src: "../styles/calsans.ttf",
  variable: "--font-cal",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "https://acme-corp-lib.vercel.app/opengraph-image.png" }],
    creator: "@jullerino",
  },
  metadataBase: new URL("https://acme-corp.jumr.dev"),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontCal.variable,
        )}
      >
        <SupabaseProvider>
          <UserProvider>{props.children}</UserProvider>
        </SupabaseProvider>
        <TailwindIndicator />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem />
      </body>
    </html>
  );
}
