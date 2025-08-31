import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Zinedine Rouabah -  Systems Programmer & Software Developer",
  description:
    "Passionate systems programmer and security researcher from Algeria specializing in Rust, C++, Linux systems, and cybersecurity. Building secure, high-performance software solutions.",
  keywords: [
    "Rust Programming",
    "C++ Development",
    "Linux Systems",
    "Security Research",
    "Systems Programming",
    "Cybersecurity",
    "Algeria Developer",
    "Open Source",
    "Memory Management",
    "Performance Optimization",
    "Network Security",
    "Vulnerability Assessment",
  ],
  authors: [{ name: "Zinedine Rouabah", url: "https://zinedine-rouabah.vercel.app" }],
  creator: "Zinedine Rouabah",
  publisher: "Zinedine Rouabah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zinedine-rouabah.vercel.app",
    title: "Zinedine Rouabah - Developer Portfolio",
    description:
      "Building secure, high-performance systems with Rust, C++, and cutting-edge technology. Specializing in cybersecurity research and Linux systems.",
    siteName: "Zinedine Rouabah Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zinedine Rouabah - Systems Programmer & Security Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zinedine_dev",
    creator: "@zinedine_dev",
    title: "Zinedine Rouabah - Elite Systems Programmer & Security Researcher",
    description: "Building secure, high-performance systems with Rust, C++, and cutting-edge technology.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://zinedine-rouabah.vercel.app",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Zinedine Rouabah",
              jobTitle: "Systems Programmer & Security Researcher",
              description:
                "Passionate systems programmer and security researcher specializing in Rust, C++, Linux systems, and cybersecurity.",
              url: "https://zinedine-rouabah.vercel.app",
              sameAs: [
                "https://github.com/zinedine",
                "https://linkedin.com/in/zinedine-rouabah",
                "https://x.com/zinedine_dev",
                "https://medium.com/@zinedine_dev",
              ],
              knowsAbout: [
                "Rust Programming",
                "C++ Development",
                "Linux Systems",
                "Cybersecurity",
                "Systems Programming",
                "Network Security",
                "Open Source Development",
              ],
              alumniOf: {
                "@type": "Organization",
                name: "University of Science and Technology",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "Algeria",
              },
            }),
          }}
        />

        <style>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-mono: ${jetbrainsMono.style.fontFamily};
          }
          
          @keyframes scanlines {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          
          @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
          }
          
          @keyframes neon-glow {
            0%, 100% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor; }
            50% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes matrix-rain {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 80px;
          }
          
          * {
            box-sizing: border-box;
          }
          
          img {
            max-width: 100%;
            height: auto;
          }
          
          .scanlines::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--neon-green), transparent);
            animation: scanlines 3s linear infinite;
            z-index: 1000;
            pointer-events: none;
          }
          
          .crt-effect {
            position: relative;
          }
          
          .crt-effect::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              linear-gradient(transparent 50%, rgba(0, 255, 65, 0.03) 50%),
              linear-gradient(90deg, transparent 50%, rgba(255, 0, 128, 0.02) 50%);
            background-size: 100% 4px, 4px 100%;
            pointer-events: none;
            z-index: 1000;
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            
            html {
              scroll-behavior: auto;
            }
          }
        `}</style>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-black overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
