import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zineddine.vercel.app"),
  title: {
    default: "Zinedine Rouabah - Software Developer",
    template: "%s | Zinedine Rouabah",
  },
  description:
    "Software developer specializing in TypeScript, Next.js, React, Linux systems, and secure high-performance software engineering.",
  keywords: [
    "TypeScript",
    "Next.js",
    "React",
    "Linux",
    "Systems Programming",
    "Cybersecurity",
    "Rust",
    "C++",
  ],
  authors: [{ name: "Zinedine Rouabah", url: "https://zineddine.vercel.app" }],
  creator: "Zinedine Rouabah",
  publisher: "Zinedine Rouabah",
  applicationName: "Zinedine Rouabah Portfolio",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zineddine.vercel.app",
    title: "Zinedine Rouabah - Software Developer",
    description:
      "Building secure, high-performance software systems with Rust, C++, and modern web technologies.",
    siteName: "Zinedine Rouabah Portfolio",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "Zinedine Rouabah Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@zinedine_dev",
    creator: "@zinedine_dev",
    title: "Zinedine Rouabah - Systems Programmer & Security Researcher",
    description:
      "Building secure, high-performance systems with Rust, C++, and Linux.",
    images: ["/placeholder-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },

  alternates: {
    canonical: "https://zineddine.vercel.app",
    languages: {
      "en-US": "https://zineddine.vercel.app",
    },
  },

  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.json",
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Zinedine Rouabah",
              jobTitle: "Systems Programmer & Security Researcher",
              description:
                "Systems programmer specializing in Rust, C++, Linux systems, and cybersecurity.",
              url: "https://zineddine.vercel.app",
              sameAs: [
                "https://github.com/zinedine",
                "https://linkedin.com/in/zinedine-rouabah",
                "https://x.com/zinedine_dev",
                "https://medium.com/@zinedine_dev",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "DZ",
                addressLocality: "Algeria",
              },
              image: "https://zineddine.vercel.app/placeholder-logo.png",
            }),
          }}
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-black overflow-x-hidden`}
      >
        {children}
        <Analytics />   {/* Enable Vercel Analytics */}
      </body>
    </html>
  );
}
