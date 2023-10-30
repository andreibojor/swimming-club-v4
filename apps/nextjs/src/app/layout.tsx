import { Inter } from "next/font/google";

import "@/styles/globals.css";
import LocalFont from "next/font/local";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";

import { Toaster, cn } from "@acme/ui";

// TODO: Add in the database foreign key of user_id connected to auth_user id. I removed it to be able to populate the users table with fictive users GoT characters
import { siteConfig } from "./config";

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const products = await getActiveProductsWithPrices();

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
          <UserProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ModalProvider products={products} />
              {props.children}
              <TailwindIndicator />
            </ThemeProvider>
          </UserProvider>
        </SupabaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
