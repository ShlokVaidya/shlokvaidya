import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Contact from "@/components/Contact";
import SchemaScript from "@/components/SchemaScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shlok Vaidya | Developer & Builder",
  description:
    "High school developer building innovative projects. Check out my Raspberry Pi cluster dashboard, blog, and open-source work.",
  keywords: ["developer", "raspberry pi", "full-stack", "next.js", "portfolio"],
  authors: [{ name: "Shlok Vaidya" }],
  creator: "Shlok Vaidya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shlokvaidya.com",
    title: "Shlok Vaidya | Developer & Builder",
    description: "High school developer building innovative projects.",
    images: [
      {
        url: "https://shlokvaidya.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shlok Vaidya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shlok Vaidya | Developer & Builder",
    description: "High school developer building innovative projects.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  other: {
    rss: "/api/rss",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://shlokvaidya.com" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <SchemaScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <SpeedInsights />
          <Navbar />
          {children}
          <hr className="my-2 border-neutral-200 dark:border-neutral-800" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
