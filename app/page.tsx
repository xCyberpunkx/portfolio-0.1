"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Download,
  User,
  Github,
  ExternalLink,
  Star,
  Mail,
  Linkedin,
  Send,
  Cpu,
  Shield,
  Globe,
  Terminal,
  Brain,
  Gamepad2,
  Zap,
  Trophy,
  Play,
  Lock,
  Eye,
  EyeOff,
  Code,
  ArrowUp,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [showLogin, setShowLogin] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)

      const sections = ["hero", "about", "journey", "skills", "projects", "services", "arcade", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-black rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-4 border-2 border-gray-300 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-pulse">
            Loading Experience...
          </h2>
          <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-black to-gray-600 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="font-bold text-2xl bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent animate-pulse">
                Zinedine Rouabah
              </h1>
              <div className="hidden lg:flex items-center gap-2">
                {[
                  { id: "hero", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "journey", label: "Journey" },
                  { id: "skills", label: "Skills" },
                  { id: "projects", label: "Projects" },
                  { id: "services", label: "Services" },
                  { id: "arcade", label: "Arcade" },
                  { id: "contact", label: "Contact" },
                ].map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "transition-all duration-300 hover:scale-105 font-medium transform hover:rotate-1",
                      activeSection === section.id
                        ? "bg-black text-white shadow-lg animate-bounce"
                        : "text-gray-600 hover:text-black hover:bg-gray-50",
                    )}
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowLogin(true)}
                variant="outline"
                className="hover:scale-105 transition-all duration-300 border-2 hover:border-black"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg font-medium animate-pulse"
              >
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 animate-gradient-x"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />

          <div className="absolute inset-0 overflow-hidden">
            {/* Floating particles with enhanced movement */}
            {[...Array(120)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-enhanced"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${8 + Math.random() * 12}s`,
                }}
              >
                <div className="w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400/60 to-purple-400/60 rounded-full blur-sm animate-pulse" />
              </div>
            ))}

            {/* Vercel-style geometric shapes */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`vercel-${i}`}
                className="absolute animate-vercel-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${12 + Math.random() * 8}s`,
                }}
              >
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-indigo-200/40 to-cyan-200/40 rounded-sm rotate-45 animate-spin-slow" />
              </div>
            ))}

            {/* Dynamic grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {[...Array(96)].map((_, i) => (
                  <div
                    key={`grid-${i}`}
                    className="border border-gray-300/20 animate-pulse"
                    style={{
                      animationDelay: `${(i * 0.1) % 5}s`,
                      animationDuration: `${3 + (i % 3)}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto">
            <div className="mb-8 sm:mb-12 animate-fade-in-up">
              <div className="mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-widest text-gray-400 animate-fade-in-up">
                Elite Systems Architect & Security Researcher
              </div>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-6 sm:mb-8 leading-[0.8] tracking-tighter">
                <span className="block text-black font-black">ZINE EDDINE ROUABAH</span>
              </h1>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-6 sm:mb-10 font-light animate-typewriter max-w-4xl mx-auto leading-relaxed px-4">
                Crafting the future with <span className="text-black font-semibold">Rust</span>,{" "}
                <span className="text-black font-semibold">C++</span>, and revolutionary security solutions
              </div>
              <p className="text-base sm:text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delay mb-6 sm:mb-8 px-4">
                From the heart of Algeria to global impact, I architect secure, blazing-fast systems that redefine
                what's possible. Passionate about open source innovation, Linux mastery, and the elegance of perfect
                code.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 animate-fade-in-up-delay-2 px-4">
              {[
                { name: "Rust Systems", icon: "🦀" },
                { name: "C++ Performance", icon: "⚡" },
                { name: "Linux Mastery", icon: "🐧" },
                { name: "Security Research", icon: "🔒" },
                { name: "Open Source", icon: "🌟" },
                { name: "Game Development", icon: "🎮" },
              ].map((tech, index) => (
                <div
                  key={tech.name}
                  className="group relative animate-bounce-subtle"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-black rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-300" />
                  <Badge
                    variant="outline"
                    className="relative px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-sm sm:text-base border-2 hover:border-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <span className="mr-1 sm:mr-2 text-base sm:text-lg">{tech.icon}</span>
                    <span className="hidden sm:inline">{tech.name}</span>
                    <span className="sm:hidden">{tech.name.split(" ")[0]}</span>
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center animate-fade-in-up-delay-3 px-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-black text-white hover:bg-gray-800 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore My Work
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group w-full sm:w-auto"
              >
                <span className="relative z-10">Let's Connect</span>
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  About Me
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p className="animate-fade-in-up-delay">
                    I'm a passionate systems programmer and security researcher from Algeria, dedicated to building
                    secure, high-performance software that makes a difference. With expertise in Rust, C++, and Linux
                    systems, I specialize in creating robust solutions for complex technical challenges.
                  </p>
                  <p className="animate-fade-in-up-delay-2">
                    My journey in technology is driven by curiosity and a commitment to open source principles. I
                    believe in the power of clean code, elegant architecture, and the importance of security in every
                    line written.
                  </p>
                  <p className="animate-fade-in-up-delay-3">
                    When I'm not coding, you'll find me contributing to open source projects, exploring the latest in
                    cybersecurity research, or fine-tuning my Arch Linux setup with the perfect Vim configuration.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8 animate-fade-in-up-delay-4"></div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500" />
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                  <div className="w-full h-64 bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Abstract geometric art */}
                    <div className="absolute inset-0">
                      <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-60 animate-pulse" />
                      <div className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-indigo-400 to-cyan-500 transform rotate-45 opacity-70" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-purple-300 rounded-full animate-spin-slow" />
                      <div className="absolute top-8 right-12 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" />
                    </div>
                    <div className="relative z-10 text-center">
                      <div className="text-4xl mb-2">🚀</div>
                      <div className="text-lg font-semibold text-gray-700">Innovation in Motion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="py-24 px-6 relative overflow-hidden">
          {/* Background animation elements */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <div
                key={`journey-bg-${i}`}
                className="absolute animate-float-slow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                }}
              >
                <div className="w-8 h-8 border border-gray-300 rotate-45 animate-spin-slow" />
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20 animate-fade-in-up">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-text-shimmer">
                My Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay">
                From curious beginner to systems programming enthusiast - here's how my passion for technology evolved.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-black via-gray-400 to-black animate-pulse-slow" />

              <div className="space-y-16">
                {[
                  {
                    year: "2024",
                    title: "Security Specialist & Open Source Contributor",
                    description:
                      "Focusing on cybersecurity research, vulnerability analysis, and contributing to major open source security projects.",
                    icon: Shield,
                    side: "left",
                  },
                  {
                    year: "2023",
                    title: "Systems Programming Mastery",
                    description:
                      "Deep dive into Rust and C++ for systems programming, building high-performance applications and memory allocators.",
                    icon: Cpu,
                    side: "right",
                  },
                  {
                    year: "2022",
                    title: "Linux & DevOps Expertise",
                    description:
                      "Mastered Arch Linux, automation scripts, and modern development workflows. Became a Vim power user.",
                    icon: Terminal,
                    side: "left",
                  },
                  {
                    year: "2021",
                    title: "Full-Stack Development",
                    description:
                      "Expanded into web development with React, Node.js, and modern frameworks while maintaining focus on backend systems.",
                    icon: Globe,
                    side: "right",
                  },
                  {
                    year: "2020",
                    title: "Programming Foundation",
                    description:
                      "Started the journey with C++ and algorithms, building strong fundamentals in computer science and problem-solving.",
                    icon: Code,
                    side: "left",
                  },
                ].map((item, index) => (
                  <div
                    key={item.year}
                    className={`flex items-center ${item.side === "right" ? "flex-row-reverse" : ""} animate-slide-in-${item.side}`}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <div className={`w-1/2 ${item.side === "right" ? "pl-16" : "pr-16"}`}>
                      <Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 group animate-fade-in-up">
                        <CardContent className="p-8 relative overflow-hidden">
                          {/* Animated background gradient on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-500" />

                          <div className="flex items-center gap-4 mb-4 relative z-10">
                            <div className="p-3 bg-black rounded-xl group-hover:bg-gradient-to-br group-hover:from-gray-800 group-hover:to-black transition-all duration-300 animate-pulse-subtle">
                              <item.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-black group-hover:text-gray-800 transition-colors duration-300 animate-number-count">
                                {item.year}
                              </div>
                              <div className="text-lg font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                                {item.title}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="relative z-10">
                      <div className="w-6 h-6 bg-black rounded-full border-4 border-white shadow-lg animate-pulse-ring" />
                    </div>

                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
                Technical Arsenal
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay">
                A comprehensive toolkit forged through years of hands-on experience and relentless curiosity.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Systems Programming */}
              <div className="group relative animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800 rounded-3xl blur-2xl opacity-10 group-hover:opacity-30 transition-all duration-500" />
                <Card className="relative bg-white border-2 border-gray-100 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 h-full transform-gpu">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-8">
                      <div className="p-4 bg-black rounded-2xl mr-6 group-hover:rotate-12 transition-transform duration-300">
                        <Cpu className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Systems Programming</h3>
                        <p className="text-gray-600">Low-level mastery and performance optimization</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: "Rust", experience: "Expert", years: "4+ years", color: "bg-orange-500" },
                        { name: "C++", experience: "Advanced", years: "6+ years", color: "bg-blue-500" },
                        { name: "C", experience: "Advanced", years: "5+ years", color: "bg-gray-700" },
                        { name: "Assembly", experience: "Intermediate", years: "3+ years", color: "bg-red-500" },
                      ].map((skill, index) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{skill.name}</span>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-700">{skill.experience}</div>
                              <div className="text-xs text-gray-500">{skill.years}</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out animate-skill-bar`}
                              style={{
                                animationDelay: `${index * 0.2}s`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Security & DevOps */}
              <div className="group relative animate-fade-in-up-delay">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-30 transition-all duration-500" />
                <Card className="relative bg-white border-2 border-gray-100 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 h-full transform-gpu">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-8">
                      <div className="p-4 bg-red-600 rounded-2xl mr-6 group-hover:rotate-12 transition-transform duration-300">
                        <Shield className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Security & DevOps</h3>
                        <p className="text-gray-600">Protecting systems and automating workflows</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          name: "Linux Administration",
                          experience: "Expert",
                          years: "7+ years",
                          color: "bg-yellow-500",
                        },
                        { name: "Network Security", experience: "Advanced", years: "4+ years", color: "bg-red-500" },
                        { name: "Docker & K8s", experience: "Advanced", years: "3+ years", color: "bg-blue-500" },
                        { name: "CI/CD Pipelines", experience: "Advanced", years: "4+ years", color: "bg-green-500" },
                      ].map((skill, index) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{skill.name}</span>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-700">{skill.experience}</div>
                              <div className="text-xs text-gray-500">{skill.years}</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out animate-skill-bar`}
                              style={{
                                animationDelay: `${index * 0.2 + 0.5}s`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Web & Tools */}
              <div className="group relative animate-fade-in-up-delay-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-30 transition-all duration-500" />
                <Card className="relative bg-white border-2 border-gray-100 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 h-full transform-gpu">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-8">
                      <div className="p-4 bg-purple-600 rounded-2xl mr-6 group-hover:rotate-12 transition-transform duration-300">
                        <Globe className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Web & Tools</h3>
                        <p className="text-gray-600">Modern development and productivity</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: "React/Next.js", experience: "Expert", years: "5+ years", color: "bg-cyan-500" },
                        { name: "TypeScript", experience: "Advanced", years: "4+ years", color: "bg-blue-600" },
                        { name: "Vim/Neovim", experience: "Expert", years: "8+ years", color: "bg-green-600" },
                        { name: "Git & GitHub", experience: "Expert", years: "6+ years", color: "bg-gray-700" },
                      ].map((skill, index) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{skill.name}</span>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-700">{skill.experience}</div>
                              <div className="text-xs text-gray-500">{skill.years}</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out animate-skill-bar`}
                              style={{
                                width: `${skill.level}%`,
                                animationDelay: `${index * 0.2 + 1}s`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto animate-fade-in-up-delay leading-relaxed">
                Building the future with systems programming, security research, and innovative solutions. Each project
                represents a journey of learning, problem-solving, and pushing technical boundaries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: "RustSec Scanner",
                  description:
                    "Advanced vulnerability scanner built in Rust for real-time security analysis with ML-powered threat detection and automated reporting.",
                  image: "/rust-security-scanner.png",
                  tags: ["Rust", "Security", "Machine Learning", "CLI"],
                  github: "https://github.com/zinedine/rustsec-scanner",
                  demo: "https://rustsec-demo.vercel.app",
                  year: "2024",
                  featured: true,
                },
                {
                  title: "Arch Automation Suite",
                  description:
                    "Complete Arch Linux installation and configuration automation with Hyprland, dotfiles, and custom scripts for seamless setup.",
                  image: "/arch-hyprland-script.png",
                  tags: ["Bash", "Linux", "Automation", "Hyprland"],
                  github: "https://github.com/zinedine/arch-automation",
                  year: "2024",
                  featured: true,
                },
                {
                  title: "Memory Allocator Pro",
                  description:
                    "High-performance custom memory allocator in C++ with advanced debugging, profiling capabilities, and memory leak detection.",
                  image: "/c-memory-allocator-debug.png",
                  tags: ["C++", "Systems", "Performance", "Memory"],
                  github: "https://github.com/zinedine/memory-allocator",
                  year: "2023",
                  featured: true,
                },
                {
                  title: "Packet Analyzer Pro",
                  description:
                    "Real-time network packet analysis tool with protocol detection, traffic visualization, and security threat identification.",
                  image: "/network-analyzer-interface.png",
                  tags: ["C", "Networking", "Security", "Wireshark"],
                  github: "https://github.com/zinedine/packet-analyzer",
                  year: "2023",
                  featured: false,
                },
                {
                  title: "Vim Plugin Suite",
                  description:
                    "Collection of powerful Neovim plugins for systems programming with LSP integration, syntax highlighting, and productivity tools.",
                  image: "/neovim-custom-editor.png",
                  tags: ["Lua", "Vim", "LSP", "Productivity"],
                  github: "https://github.com/zinedine/vim-plugins",
                  year: "2024",
                  featured: false,
                },
                {
                  title: "Blockchain Explorer",
                  description:
                    "Fast blockchain explorer built with Rust and WebAssembly for real-time transaction analysis and network visualization.",
                  image: "/blockchain-explorer-dashboard.png",
                  tags: ["Rust", "WebAssembly", "Blockchain", "React"],
                  github: "https://github.com/zinedine/blockchain-explorer",
                  demo: "https://blockchain-explorer-demo.vercel.app",
                  year: "2024",
                  featured: false,
                },
              ].map((project, index) => (
                <div
                  key={project.title}
                  className={cn(
                    "group relative animate-fade-in-up transform-gpu",
                    project.featured && "lg:col-span-1 md:col-span-1",
                  )}
                  style={{ animationDelay: `${index * 0.15}s` }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-600 rounded-3xl blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-700 scale-95 group-hover:scale-105" />
                  <Card className="relative bg-white border-2 border-gray-100 shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-8 hover:rotate-2 h-full overflow-hidden group-hover:border-black/20">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/95 text-black font-semibold shadow-lg">
                          {project.year}
                        </Badge>
                      </div>
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black text-white font-semibold animate-pulse shadow-lg">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-black transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-base leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-sm hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        {project.demo && (
                          <Button
                            size="sm"
                            className="flex-1 bg-black text-white hover:bg-gray-800 transition-all duration-300"
                            asChild
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
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
                Comprehensive solutions across multiple domains, from systems programming to security consulting.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {[
                {
                  icon: Shield,
                  title: "Security Consulting",
                  description:
                    "Comprehensive security audits, vulnerability assessments, and penetration testing for your systems.",
                  features: [
                    "Code Review & Analysis",
                    "Infrastructure Security",
                    "Threat Modeling",
                    "Compliance Auditing",
                  ],
                  color: "from-red-500 to-orange-500",
                },
                {
                  icon: Cpu,
                  title: "Systems Development",
                  description:
                    "High-performance system software, drivers, and low-level applications built with modern C++ and Rust.",
                  features: [
                    "Custom Allocators",
                    "Device Drivers",
                    "Performance Optimization",
                    "Cross-platform Solutions",
                  ],
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Terminal,
                  title: "DevOps & Automation",
                  description: "Complete infrastructure automation, CI/CD pipelines, and Linux system administration.",
                  features: [
                    "Infrastructure as Code",
                    "Container Orchestration",
                    "Monitoring & Logging",
                    "Backup Solutions",
                  ],
                  color: "from-green-500 to-teal-500",
                },
                {
                  icon: Brain,
                  title: "Technical Consulting",
                  description:
                    "Architecture design, technology selection, and strategic technical guidance for your projects.",
                  features: [
                    "System Architecture",
                    "Technology Stack Selection",
                    "Performance Analysis",
                    "Team Mentoring",
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

        <section id="arcade" className="py-24 px-6 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
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
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-105"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Play Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
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
              <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
                Let's Connect
              </h2>
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
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">zine.rouabah@protonmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">GitHub</div>
                      <div className="text-gray-600">@zinedine</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">LinkedIn</div>
                      <div className="text-gray-600">Zinedine Rouabah</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-up-delay">
                <form className="space-y-6 bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
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
                      placeholder="your.email@example.com"
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
                      <option value="twitch">Twitch</option>
                      <option value="stackoverflow">Stack Overflow</option>
                      <option value="devto">Dev.to</option>
                      <option value="hashnode">Hashnode</option>
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
                    { icon: Github, href: "https://github.com/zinedine", label: "GitHub", color: "hover:bg-gray-800" },
                    {
                      icon: Linkedin,
                      href: "https://linkedin.com/in/zinedine-rouabah",
                      label: "LinkedIn",
                      color: "hover:bg-blue-600",
                    },
                    {
                      icon: Mail,
                      href: "mailto:zine.rouabah@protonmail.com",
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
              <p className="text-gray-400 mb-4 md:mb-0">© 2024 Zinedine Rouabah. All rights reserved.</p>
              <p className="text-gray-400 text-sm">Built with Next.js, TypeScript, and lots of ☕</p>
            </div>
          </div>
        </footer>
      </main>

      {scrollY > 500 && (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110 shadow-2xl"
          aria-label="Go to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in transform-gpu">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 animate-bounce">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access exclusive content</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="h-12 border-2 focus:border-black transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="h-12 border-2 focus:border-black transition-all duration-300 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-black text-white hover:bg-gray-800 font-semibold transition-all duration-300 hover:scale-105"
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="flex justify-between items-center mt-6 text-sm">
              <button className="text-gray-600 hover:text-black transition-colors">Forgot password?</button>
              <button onClick={() => setShowLogin(false)} className="text-gray-600 hover:text-black transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
