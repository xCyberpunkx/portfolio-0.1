import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

// SF Pro-like font stack - using system fonts that mimic Apple's SF Pro
// This provides the Apple aesthetic while being web-compatible
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "SF Pro Display",
    "SF Pro Text",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: true,
  fallback: [
    "SF Mono",
    "Monaco",
    "Menlo",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://zinedine-rouabah.vercel.app"),
  title: {
    default: "Zinedine Rouabah - Systems Programmer & Software Developer",
    template: "%s | Zinedine Rouabah",
  },
  description:
    "Passionate systems programmer and security researcher from Algeria specializing in Rust, C++, Linux systems, and cybersecurity. Building secure, high-performance software solutions. Expert in systems programming, web development, and open-source contributions.",
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
    "Software Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Development",
    "Backend Development",
    "DevOps",
    "Docker",
    "CI/CD",
    "Git",
    "Vim",
    "Neovim",
    "Arch Linux",
    "System Administration",
  ],
  authors: [{ name: "Zinedine Rouabah", url: "https://zinedine-rouabah.vercel.app" }],
  creator: "Zinedine Rouabah",
  publisher: "Zinedine Rouabah",
  applicationName: "Zinedine Rouabah Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zinedine-rouabah.vercel.app",
    title: "Zinedine Rouabah - Systems Programmer & Security Researcher",
    description:
      "Building secure, high-performance systems with Rust, C++, and cutting-edge technology. Specializing in cybersecurity research, Linux systems, and full-stack web development.",
    siteName: "Zinedine Rouabah Portfolio",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "Zinedine Rouabah Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zinedine_dev",
    creator: "@zinedine_dev",
    title: "Zinedine Rouabah - Systems Programmer & Security Researcher",
    description: "Building secure, high-performance systems with Rust, C++, and cutting-edge technology. Expert in systems programming and cybersecurity.",
    images: ["/placeholder-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
  alternates: {
    canonical: "https://zinedine-rouabah.vercel.app",
    languages: {
      "en-US": "https://zinedine-rouabah.vercel.app",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  category: "technology",
  classification: "Portfolio Website",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#000000",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no, address=no, email=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Zinedine Rouabah" />
        <meta name="application-name" content="Zinedine Rouabah Portfolio" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
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
                "Web Development",
                "Full Stack Development",
                "TypeScript",
                "Next.js",
                "React",
                "Node.js",
                "DevOps",
                "Docker",
                "CI/CD",
              ],
              image: "https://zinedine-rouabah.vercel.app/placeholder-logo.png",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              email: "rouabah.zineedinee@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "DZ",
                addressLocality: "Algeria",
              },
              alumniOf: {
                "@type": "Organization",
                name: "University of Science and Technology",
              },
            }),
          }}
        />

        <style>{`
          :root {
            --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, ${inter.style.fontFamily};
            --font-mono: "SF Mono", Monaco, Menlo, "Consolas", "Liberation Mono", "Courier New", monospace, ${jetbrainsMono.style.fontFamily};
          }
          
          /* SF Pro-like typography */
          body {
            font-family: var(--font-sans);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-feature-settings: "kern" 1, "liga" 1;
          }
          
          code, pre, .font-mono {
            font-family: var(--font-mono);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-black overflow-x-hidden`} style={{ fontFamily: 'var(--font-sans)' }}>
        {children}
      </body>
    </html>
  )
}
