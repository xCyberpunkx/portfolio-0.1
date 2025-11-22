"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Code,
  Globe,
  Terminal,
  Shield,
  Cpu,
  Github,
  Linkedin,
  ExternalLink,
  ChevronUp,
  Play,
  Gamepad2,
  Zap,
  Star,
  Rocket,
  Brain,
  Trophy,
  Send,
  Phone,
  MessageCircle,
  GitBranch,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { PixelatedCanvasDemo } from "@/components/canva"
import { BackgroundBoxesDemo } from "@/components/glare"
import dynamic from "next/dynamic"
import AppleHelloEffectDemo from "@/components/HelloApple"
import MacOSDockDemo from "@/components/Dock"
import { TooltipCardDemo } from "@/components/tooltip"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import { Projects } from "@/components/Projects"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import ScrollToTop from "@/components/ScrollToTop"

// Lazy load heavy components for better performance
const StickyScrollRevealDemo = dynamic(() => import("@/components/scroll-reveal").then(mod => ({ default: mod.StickyScrollRevealDemo })), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: false
})
const PlaceholdersAndVanishInputDemo = dynamic(() => import("@/components/placeholder").then(mod => ({ default: mod.PlaceholdersAndVanishInputDemo })), {
  loading: () => <div className="min-h-[200px]" />,
  ssr: false
})
const CoverDemo = dynamic(() => import("@/components/CoverDemo").then(mod => ({ default: mod.CoverDemo })), {
  loading: () => <div className="min-h-[300px]" />,
  ssr: false
})

export default function Portfolio() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [animatedDots, setAnimatedDots] = useState<Array<{ top: number; left: number; delay: number }>>([])
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([])
  
  const heroHighlights: Array<{ title: string; description: string; }> = [
   {
    title: "Networking",
    description: "Designing and maintaining secure, high-performance networks; experience with routing, switching, and protocols.",

  },
  {
    title: "Software Engineering",
    description: "Building reliable, scalable applications with clean architecture, efficient algorithms, and robust system design.",
 
  },
    { title: "Realtime experiences", description: "WebGL, three.js, performant UI motion for the web." },
    { title: "Open source", description: "Contributor and maintainer across Linux & Rust ecosystems." },
  ]
  const heroStats = [
    { label: "Years Shipping", value: "05+" },
    { label: "Projects Delivered", value: "30+" },
    { label: "OSS Contributions", value: "50+" },
    
  ]
  const heroBadges: Array<{ label: string; icon: LucideIcon; color: string }> = [
    { label: "Software Dev", icon: Code, color: "text-orange-600" },
    { label: "Systems Design", icon: Cpu, color: "text-slate-600" },
    { label: "DevOps", icon: Shield, color: "text-purple-600" },
    { label: "Open Source", icon: Github, color: "text-black dark:text-white" },
  ]
  const journeyMilestones: Array<{
    period: string;
    title: string;
    description: string;
    impact: string;
    stack: string[];
    icon: LucideIcon;
  }> = [
    {
      "title": "Freelance Web Developer",
      "description": "Building and maintaining websites for clients using modern web technologies. Delivering scalable, maintainable, and efficient solutions tailored to client needs.",
      "impact": "Completed 10+ client projects, improving load times by up to 35% and implementing best practices for responsive and accessible design.",
      "stack": ["TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Next.js", "Node.js"],
      "icon": Code,
      period: "Jan 2023 – Present"
    },
  {

    "title": "Web Developer (Part-time) – Kara Automobile",
    "description": "Developed internal and external web solutions to enhance operational efficiency. Integrated Microsoft Office tools for business workflows.",
    "impact": "Streamlined reporting processes, reducing manual data entry by 50%.",
    "stack": ["HTML", "CSS", "JavaScript", "PHP", "Microsoft Office"],
    "icon": Cpu,
    period: "Jun 2022 – Dec 2022"
  },
  {
    "title": "Full-stack Developer (Freelance) – Ultra Light",
    "description": "Led development of corporate website using Laravel. Architected custom web applications focused on performance, scalability, and security. Ensured a responsive, user-friendly design while aligning with business objectives.",
    "impact": "Launched website on time with 0 critical bugs; improved user engagement metrics by 40% within the first month.",
    "stack": ["Laravel", "PHP", "MySQL", "Vue.js", "Tailwind CSS", "Docker"],
    "icon": Globe,
    period: "Jan 2022 – May 2022"
  },
  ]
  const skillClusters: Array<{ title: string; description: string; icon: LucideIcon; stack: string[]; gradient: string }> = [
    {
      title: "Systems Craft",
      description: "Memory-safe engines, observability-first services, and WASM extensions.",
      icon: Cpu,
      stack: ["Rust", "C++", "WebAssembly", "Linux kernel"],
      gradient: "from-slate-950 via-slate-900 to-slate-800",
    },
    {
      title: "Frontend Flow",
      description: "Motion-rich React surfaces that stay under 100ms on mobile networks.",
      icon: Code,
      stack: ["Next.js 15", "TypeScript 5", "Framer Motion", "Tailwind CSS"],
      gradient: "from-gray-900 via-gray-800 to-gray-700",
    },
    {
      title: "DevSecOps",
      description: "Immutable deploys, threat modeling, and proactive runtime hardening.",
      icon: Shield,
      stack: ["Docker", "Kubernetes", "GitHub Actions", "CrowdStrike"],
      gradient: "from-slate-900 via-slate-800 to-slate-900",
    },
  ]
  const skillMatrix = [
    { name: "Rust", level: 96, blurb: "Systems programming & tooling", tone: "bg-emerald-500" },
    { name: "TypeScript", level: 92, blurb: "Full-stack product velocity", tone: "bg-blue-500" },
    { name: "Systems Design", level: 90, blurb: "Streaming, sharding, HA", tone: "bg-slate-600" },
    { name: "DevOps", level: 84, blurb: "CI/CD, observability, SRE", tone: "bg-purple-500" },
  ]


  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3700)

    return () => {
      clearTimeout(loadingTimer)
    }
  }, [])

  // Generate animated dots only on client to avoid hydration mismatch
  useEffect(() => {
    setAnimatedDots(
      Array.from({ length: 20 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  // Generate stars only on client to avoid hydration mismatch
  useEffect(() => {
    setStars(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      }))
    )
  }, [])

  const rafRef = useRef<number | null>(null)
  
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrollPercent = (scrollTop / docHeight) * 100
        
        setScrollProgress(scrollPercent)
        setShowScrollTop(scrollTop > 500)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

if (isLoading) {
    return <AppleHelloEffectDemo />;
  }




  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden">
      <Navbar />
        <main className="pt-15">

          <section
            id="hero"
            className="relative isolate overflow-hidden px-4 pt-28 pb-20 sm:px-6 lg:px-8"
          >
          <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-50 via-white to-white" />
          <div className="absolute inset-0 -z-10 opacity-50">
            <BackgroundRippleEffect rows={9} cols={24} cellSize={46} />
          </div>
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/80 via-white/40 to-transparent blur-3xl" />
          <div className="absolute inset-0 pointer-events-none opacity-0 sm:opacity-30 hidden md:block">
            {animatedDots.map((dot, i) => (
              <div
                key={`dot-${i}`}
                className="absolute w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                style={{
                  top: `${dot.top}%`,
                  left: `${dot.left}%`,
                  animationDelay: `${dot.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/70 px-5 py-2 text-xs font-mono uppercase tracking-[0.3em] text-gray-600 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    software engineer
                </div>

                <div className="space-y-4">
            <p className="font-mono text-sm text-gray-500">portfolio@archlinux:~$ echo "Hello, world!"</p>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Zine Eddine{" "}
              <span className="block bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent">
                Rouabah
              </span>
            </h1>
            <p className="text-lg text-gray-600 sm:text-xl">
              I build software that works smoothly, from low-level systems to user-friendly applications. I focus on
              clean, efficient, and reliable solutions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {heroHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-gray-100 bg-white/80 p-4 text-left shadow-sm backdrop-blur lg:hover:-translate-y-1 lg:hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                
                  <div>
                    <p className="text-sm font-semibold">{highlight.title}</p>
                    <p className="text-xs text-gray-500">{highlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl">
            <TooltipCardDemo />
          </div>

          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            {heroBadges.map((item) => (
              <Badge
                key={item.label}
                variant="default"
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm"
              >
                <item.icon className={`h-4 w-4 ${item.color}`} />
                {item.label}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row justify-center lg:justify-start">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-black text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02]"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-gray-300 text-gray-900 transition-all duration-300 hover:border-black hover:text-black"
            >
              Get in Touch
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white/80 p-4 text-left shadow-sm">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-gray-100 bg-white/80 p-6 shadow-xl shadow-gray-200/60 backdrop-blur">
            <div className="flex items-center justify-between">
  <p className="text-sm font-semibold text-gray-600">Realtime cockpit</p>

  {/* Pirelli Logo in between */}
  <Image
    src="/pirelli.png"
    alt="Pirelli Logo"
    width={60}
    height={20}
    className="object-contain mx-2"
  />

  <span className="text-xs font-mono text-emerald-600">fps • latency • throughput</span>
</div>
            <div className="mt-6 hidden rounded-3xl border border-gray-200 bg-slate-950/90 p-3 md:block">
              <PixelatedCanvasDemo />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-left text-sm text-gray-600 md:grid-cols-3">
              {[
                { label: "Latency", value: "8.2 ms" },
                { label: "Throughput", value: "650k req/s" },
                { label: "Render Budget", value: "9.4 ms" },
              ].map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-gray-100 bg-white/70 p-3">
                  <p className="text-xs text-gray-500">{metric.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-white/70 p-4 text-left text-sm text-gray-600 md:hidden">
              <p className="font-semibold text-gray-900">Mobile-friendly</p>
              <p className="text-gray-600">Heavy visualizers are deferred to keep pages silky smooth on phones.</p>
            </div>
          </div>
        </div>
      </div>
            <div className="mt-12 hidden lg:block">
              <MacOSDockDemo />
            </div>
          </div>
        </section>
        <section id="about" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]" />
          </div>

         
          <div className="max-w-6xl mx-auto relative">
            
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-28 items-center">
              {/* Left Side - About Text with Creative Layout */}
              <div className="space-y-8 animate-fade-in-up">
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-shadow duration-500">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-1 h-20 bg-gradient-to-b from-black to-gray-400 rounded-full"></div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                        Who is Zine Eddine Rouabah?
                      </h3>
                      <p className="text-gray-500 text-sm  tracking-wider">std::cin.get();</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Zine Eddine Rouabah is a software engineer passionate about system-level programming, cybersecurity, and open-source development.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
  He started in web development and progressed to creating <span className="font-semibold text-black">efficient, secure, and maintainable software</span> using <span className="font-semibold text-black">C++</span> and <span className="font-semibold text-black">Linux-based systems</span>.
</p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    With a focus on low-level computer science concepts, network fundamentals, and modern development practices, he aims to bridge creativity and engineering precision in every project.
                  </p>
                </div>

               
              </div>

              {/* Right Side - Separator & Stacked 3D Cards */}
              <div className="flex flex-col items-center space-y-8 animate-fade-in-up-delay">
                {/* Animated Separator with Lottie-style animation */}
                <div className="w-full flex items-center justify-center gap-4 py-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-400"></div>
                  <div className="relative">
                    <div className="w-3 h-3 bg-black rounded-full animate-pulse-scale"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-black rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-400"></div>
                </div>

                {/* 3D Spaced Cards */}
                <div className="relative w-full max-w-md space-y-8" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
                  <BackgroundBoxesDemo    />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="bg-white px-4 py-24 sm:px-6">
<div className="mx-auto max-w-6xl">
            <div className="text-center space-y-4">
<div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
Journey
</div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
Precision built through real-world impact
</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
Each chapter sharpened my obsession with reliability, maintainability, and graceful human experiences.
</p>
            </div>

            <div className="mt-16 space-y-10">
              {journeyMilestones.map((milestone) => {
const Icon = milestone.icon
return (
                  <article
key={milestone.title}
                    className="rounded-[32px] border border-gray-100 bg-white shadow-xl shadow-gray-100/80 p-6 md:p-8"
                  >
<div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="font-semibold uppercase tracking-wide text-gray-800">{milestone.period}</span>
<span className="h-1 w-1 rounded-full bg-gray-300" />
<span>{milestone.impact}</span>
</div>

                    <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-sm">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="space-y-4 flex-1">
<h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
<p className="text-gray-600 leading-relaxed">{milestone.description}</p>
<div className="flex flex-wrap gap-2">
{milestone.stack.map((tech) => (
<Badge
key={`${milestone.title}-${tech}`}
variant="secondary"
className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md shadow-sm"
>
{tech}
</Badge>
))}
</div>
</div>
                    </div>
                  </article>
)
})}
</div>
</div>
</section>


        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
                Services & Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay">
                Comprehensive solutions across multiple domains, from Web Development  to Enterprise Software .
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {[
                {
    icon: Shield,
    title: "Web Development",
    description:
      "Modern, scalable, and responsive websites and web applications tailored to your needs.",
    features: [
      "Full-Stack Development",
      "API Integration",
      "SEO Optimization",
      "Responsive Design",
    ],
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Cpu,
    title: "Mobile Development",
    description:
      "High-quality iOS and Android apps with seamless performance and user experience.",
    features: [
      "Cross-Platform Solutions",
      "Native App Development",
      "App Store Deployment",
      "Performance Optimization",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Terminal,
    title: "UI/UX Design",
    description:
      "User-centered design for intuitive, accessible, and visually engaging digital experiences.",
    features: [
      "Wireframing & Prototyping",
      "User Research",
      "Design Systems",
      "Accessibility Compliance",
    ],
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Brain,
    title: "Desktop Development",
    description:
      "Powerful cross-platform desktop applications built for performance and usability.",
    features: [
      "Windows, macOS & Linux Apps",
      "Custom Tooling",
      "System Integration",
      "Performance Optimization",
    ],
    color: "from-purple-500 to-pink-500",
  },
              ].map((service, index) => (
                <div
                  key={service.title}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-500`}
                  />
                  <Card className="relative bg-white border-2 border-gray-100 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div
                          className={`p-4 bg-gradient-to-br ${service.color} rounded-2xl mr-6 group-hover:rotate-12 transition-transform duration-300`}
                        >
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-black rounded-full mr-3 animate-pulse" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Projects />

        <section id="arcade" className="py-24 px-6 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
          <div className="absolute inset-0">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-up">
                Game Development & Interactive Experiences
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up-delay">
                Bringing ideas to life through immersive gaming experiences and interactive applications.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in-left">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                      <Gamepad2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Game Engine Development</h3>
                      <p className="text-gray-300">
                        Building custom game engines with Rust and C++ for high-performance gaming experiences.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Real-time Systems</h3>
                      <p className="text-gray-300">
                        Optimizing for 60+ FPS gameplay with advanced memory management and multithreading.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Competitive Gaming Tools</h3>
                      <p className="text-gray-300">
                        League of Legends inspired tools and analytics for competitive gaming communities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      alert("🎮 Demo coming soon! This will launch an interactive game showcase.")
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-105"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Play Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      window.open("https://github.com/zinedine/arcade-portfolio", "_blank")
                    }}
                    className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 transition-all duration-300 hover:scale-105 bg-transparent"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View Source
                  </Button>
                </div>
              </div>

              <div className="relative animate-fade-in-right">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse" />
                <div className="relative bg-gray-900 rounded-3xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-500">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { name: "FPS", value: "144", color: "text-green-400" },
                      { name: "Latency", value: "12ms", color: "text-blue-400" },
                      { name: "Memory", value: "2.1GB", color: "text-purple-400" },
                      { name: "CPU", value: "23%", color: "text-orange-400" },
                    ].map((stat) => (
                      <div key={stat.name} className="text-center p-4 bg-gray-800 rounded-xl">
                        <div className={`text-2xl font-bold ${stat.color} animate-pulse`}>{stat.value}</div>
                        <div className="text-gray-400 text-sm">{stat.name}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Performance Metrics</h3>
                    <p className="text-gray-400">Real-time game engine performance monitoring and optimization.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(0,0,0,0.1),transparent_50%)]" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
   
              <CoverDemo/>
             
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
                Ready to collaborate on something amazing? Whether it's a challenging project, open source contribution,
                or just a technical discussion, I'd love to hear from you.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="animate-fade-in-up">
                <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=rouabah.zineedinee@gmail.com&su=Hello%20Zineddine&body=I%20would%20like%20to%20connect%20with%20you."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">rouabah.zineedinee@gmail.com</div>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div>
                       <a
                      href="https://github.com/xCyberpunkx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="font-semibold">GitHub</div>
                      <div className="text-gray-600">@xCyberpunkx</div>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <a
                      href="https://www.linkedin.com/in/zine-eddine-rouabah-992b16265/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="font-semibold">LinkedIn</div>
                      <div className="text-gray-600">Zineddine Rouabah</div>
                    </a>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <a
                      href="https://discord.com/users/557172887799463937"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="font-semibold">Discord</div>
                      <div className="text-gray-600">zineddiinee</div>
                    </a>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <a
                      href="https://wa.me/0540166358"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="font-semibold">WhatsApp</div>
                      <div className="text-gray-600">+213 540 16 63 58</div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-up-delay">
                <form
                  className="space-y-6 bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const formData = new FormData(form)

                    const subject = `Portfolio Contact: ${formData.get("subject")}`
                    const body = `Name: ${formData.get("name")}
Email: ${formData.get("email")}
How they found me: ${formData.get("social")}

Message:
${formData.get("message")}`

                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rouabah.zineedinee@gmail.com&su=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}`

                    const mailtoUrl = `mailto:rouabah.zineedinee@gmail.com?subject=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}`

                    const newWindow = window.open(gmailUrl, "_blank")
                    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
                      window.location.href = mailtoUrl
                    }
                  }}
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300"
                      placeholder="taylor.durden@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="social" className="block text-sm font-semibold text-gray-700 mb-2">
                      How did you find me?
                    </label>
                    <select
                      id="social"
                      name="social"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300"
                      defaultValue=""
                      required
                    >
                      <option value="">Select platform</option>
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">X (Twitter)</option>
                      <option value="reddit">Reddit</option>
                      <option value="medium">Medium</option>
                      <option value="discord">Discord</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                      <option value="stackoverflow">Stack Overflow</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or idea..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <PlaceholdersAndVanishInputDemo />
        <footer className="bg-black text-white py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
              <div className="md:col-span-2">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Zinedine Rouabah
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  Systems programmer and security researcher passionate about building secure, high-performance software
                  with Rust, C++, and cutting-edge technology.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                  {[
                    { icon: Github, href: "https://github.com/xCyberpunkx", label: "GitHub", color: "hover:bg-gray-800" },
                    {
                      icon: Linkedin,
                      href: "https://linkedin.com/in/zinedine-rouabah",
                      label: "LinkedIn",
                      color: "hover:bg-blue-600",
                    },
                    {
                      icon: Mail,
                      href: "mailto:rouabah.zineedinee@gmail.com",
                      label: "Email",
                      color: "hover:bg-red-600",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  ))}
                  <a
                    href="https://reddit.com/u/zinedine_dev"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Reddit"
                  >
                    <span className="text-xs sm:text-sm font-bold">R</span>
                  </a>
                  <a
                    href="https://x.com/zinedine_dev"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="X (Twitter)"
                  >
                    <span className="text-xs sm:text-sm font-bold">𝕏</span>
                  </a>
                  <a
                    href="https://medium.com/@zinedine_dev"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Medium"
                  >
                    <span className="text-xs sm:text-sm font-bold">M</span>
                  </a>
                  <a
                    href="https://discord.gg/zinedine"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Discord"
                  >
                    <span className="text-xs sm:text-sm font-bold">D</span>
                  </a>
                  <a
                    href="https://www.leagueoflegends.com/en-us/summoner/euw/zinedine"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-black transition-all duration-300 hover:scale-110"
                    aria-label="League of Legends"
                  >
                    <span className="text-xs sm:text-sm font-bold">⚔️</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {["About", "Projects", "Skills", "Services", "Contact"].map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => scrollToSection(link.toLowerCase())}
                        className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-2 transform"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6">Technologies</h4>
                <ul className="space-y-3 text-gray-300">
                  {["Rust", "C++", "Linux", "Security", "Open Source"].map((tech) => (
                    <li key={tech} className="hover:text-white transition-colors duration-300">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">© 2025 Zinedine Rouabah. All rights reserved.</p>
              <p className="text-gray-400 text-sm">Built with Next.js, TypeScript, and lots of ☕</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Enhanced Scroll to Top Button with Progress Ring */}
      <ScrollToTop />
    </div>
  )
}