"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Download,
  MapPin,
  Heart,
  Code,
  Shield,
  Terminal,
  Cpu,
  Globe,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Play,
  Gamepad2,
  Zap,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Star,
  Trophy,
  Brain,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [showLogin, setShowLogin] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["hero", "about", "journey", "skills", "projects", "services", "arcade", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
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
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 animate-gradient-x"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-black/10 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-in-up">
              <h1 className="text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent animate-text-shimmer">
                Zinedine Rouabah
              </h1>
              <div className="text-2xl lg:text-3xl text-gray-600 mb-8 font-light animate-typewriter">
                Systems Programmer • Security Researcher • Linux Enthusiast
              </div>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
                Crafting secure, high-performance systems with Rust, C++, and cutting-edge technology. From Algeria to
                the world, building the future one line of code at a time.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up-delay-2">
              {["Rust", "C++", "Linux", "Security", "Open Source"].map((tech, index) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="px-6 py-3 text-lg border-2 hover:border-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 animate-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up-delay-3">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
                About Me
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
                A passionate developer from Algeria with a deep love for systems programming, cybersecurity, and the
                endless possibilities of technology.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in-left">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-black rounded-xl group-hover:rotate-12 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Based in Algeria</h3>
                      <p className="text-gray-600">
                        Working remotely and collaborating with teams worldwide, bringing North African innovation to
                        global projects.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-black rounded-xl group-hover:rotate-12 transition-transform duration-300">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Passion for Systems</h3>
                      <p className="text-gray-600">
                        Deep fascination with low-level programming, memory management, and building efficient, secure
                        systems from the ground up.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group hover:scale-105 transition-all duration-300">
                    <div className="p-3 bg-black rounded-xl group-hover:rotate-12 transition-transform duration-300">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Security First</h3>
                      <p className="text-gray-600">
                        Committed to writing secure code and researching vulnerabilities to make the digital world safer
                        for everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in-right">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-600 rounded-3xl blur-3xl opacity-20 animate-pulse" />
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                  <img
                    src="/anime-cyberpunk-programmer.png"
                    alt="Zinedine Rouabah - Developer"
                    className="w-full h-80 object-cover rounded-2xl mb-6 hover:scale-105 transition-transform duration-300"
                  />
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Always Learning</h3>
                    <p className="text-gray-600">
                      Constantly exploring new technologies and pushing the boundaries of what's possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section id="journey" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                My Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From curious beginner to systems programming enthusiast - here's how my passion for technology evolved.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-black via-gray-400 to-black" />

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
                    className={`flex items-center ${item.side === "right" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-1/2 ${item.side === "right" ? "pl-16" : "pr-16"}`}>
                      <Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <CardContent className="p-8">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-black rounded-xl">
                              <item.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-black">{item.year}</div>
                              <div className="text-lg font-semibold text-gray-800">{item.title}</div>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="relative z-10">
                      <div className="w-6 h-6 bg-black rounded-full border-4 border-white shadow-lg" />
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
                        { name: "Rust", level: 95, color: "bg-orange-500" },
                        { name: "C++", level: 90, color: "bg-blue-500" },
                        { name: "C", level: 85, color: "bg-gray-700" },
                        { name: "Assembly", level: 75, color: "bg-red-500" },
                      ].map((skill, index) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{skill.name}</span>
                            <span className="text-sm text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out animate-skill-bar`}
                              style={{
                                width: `${skill.level}%`,
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
                        { name: "Linux Administration", level: 95, color: "bg-yellow-500" },
                        { name: "Network Security", level: 88, color: "bg-red-500" },
                        { name: "Docker & K8s", level: 82, color: "bg-blue-500" },
                        { name: "CI/CD Pipelines", level: 85, color: "bg-green-500" },
                      ].map((skill, index) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{skill.name}</span>
                            <span className="text-sm text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out animate-skill-bar`}
                              style={{
                                width: `${skill.level}%`,
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
                        { name: "React/Next.js", level: 90, color: "bg-cyan-500" },
                        { name: "TypeScript", level: 88, color: "bg-blue-600" },
                        { name: "Vim/Neovim", level: 95, color: "bg-green-600" },
                        { name: "Git & GitHub", level: 92, color: "bg-gray-700" },
                      ].map((skill, index) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{skill.name}</span>
                            <span className="text-sm text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
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

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay">
                Building the future with systems programming, security research, and innovative solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "RustSec Scanner",
                  description:
                    "Advanced vulnerability scanner built in Rust for real-time security analysis with ML-powered threat detection",
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
                    "Complete Arch Linux installation and configuration automation with Hyprland, dotfiles, and custom scripts",
                  image: "/arch-automation.png",
                  tags: ["Bash", "Linux", "Automation", "Hyprland"],
                  github: "https://github.com/zinedine/arch-automation",
                  year: "2024",
                  featured: true,
                },
                {
                  title: "Memory Allocator",
                  description:
                    "High-performance custom memory allocator in C++ with advanced debugging and profiling capabilities",
                  image: "/memory-allocator.png",
                  tags: ["C++", "Systems", "Performance", "Memory"],
                  github: "https://github.com/zinedine/memory-allocator",
                  year: "2023",
                  featured: true,
                },
                {
                  title: "Packet Analyzer Pro",
                  description:
                    "Real-time network packet analysis tool with protocol detection and traffic visualization",
                  image: "/packet-analyzer.png",
                  tags: ["C", "Networking", "Security", "Wireshark"],
                  github: "https://github.com/zinedine/packet-analyzer",
                  year: "2023",
                  featured: false,
                },
                {
                  title: "Vim Plugin Suite",
                  description: "Collection of powerful Neovim plugins for systems programming with LSP integration",
                  image: "/vim-plugins.png",
                  tags: ["Lua", "Vim", "LSP", "Productivity"],
                  github: "https://github.com/zinedine/vim-plugins",
                  year: "2024",
                  featured: false,
                },
                {
                  title: "Blockchain Explorer",
                  description:
                    "Fast blockchain explorer built with Rust and WebAssembly for real-time transaction analysis",
                  image: "/blockchain-explorer-graphs.png",
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
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500" />
                  <Card className="relative bg-white border-2 border-gray-100 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-6 hover:rotate-1 h-full overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-black font-semibold">
                          {project.year}
                        </Badge>
                      </div>
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black text-white font-semibold animate-pulse">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-black transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs hover:bg-black hover:text-white transition-all duration-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(project.github, "_blank")}
                          className="flex-1 hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                        {project.demo && (
                          <Button
                            size="sm"
                            onClick={() => window.open(project.demo, "_blank")}
                            className="flex-1 bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
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

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto animate-fade-in-up-delay">
              Ready to collaborate on your next systems project, security challenge, or innovative idea? I'm always
              excited to work on meaningful projects that make a difference.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "zinedine@example.com",
                  description: "Drop me a line anytime",
                  action: () => window.open("mailto:zinedine@example.com"),
                },
                {
                  icon: Github,
                  title: "GitHub",
                  value: "@zinedine",
                  description: "Check out my open source work",
                  action: () => window.open("https://github.com/zinedine"),
                },
                {
                  icon: Linkedin,
                  title: "LinkedIn",
                  value: "Zinedine Rouabah",
                  description: "Let's connect professionally",
                  action: () => window.open("https://linkedin.com/in/zinedine-rouabah"),
                },
              ].map((contact, index) => (
                <Card
                  key={contact.title}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={contact.action}
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 group-hover:rotate-12 transition-transform duration-300">
                      <contact.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                    <p className="text-lg font-semibold text-gray-800 mb-2">{contact.value}</p>
                    <p className="text-gray-600">{contact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

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
