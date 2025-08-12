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
  title: "Zinedine Rouabah - Systems Programmer & Security Researcher",
  description:
    "Passionate systems programmer and security researcher from Algeria with expertise in Rust, C++, Linux, and cybersecurity.",
  keywords: ["Rust", "C++", "Linux", "Security Research", "Systems Programming", "Algeria", "Open Source"],
  authors: [{ name: "Zinedine Rouabah" }],
  creator: "Zinedine Rouabah",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Zinedine Rouabah - Systems Programmer & Security Researcher",
    description: "Building secure, high-performance systems with Rust, C++, and cutting-edge technology.",
    siteName: "Zinedine Rouabah Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinedine Rouabah - Systems Programmer & Security Researcher",
    description: "Building secure, high-performance systems with Rust, C++, and cutting-edge technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
          
          /* Enhanced smooth scrolling */
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 80px;
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
