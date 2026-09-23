import type { Metadata } from "next";

import "@/styles/globals.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-providers";

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Etnosains LMS - Sasak Physics Lab",
  description: "Platform Pembelajaran dan Telemetri Penelitian Fisika Etnosains",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        spaceGrotesk.variable,
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>
          <Toaster position="top-right" />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
