"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Code2,
  Terminal,
  Cpu,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Heart,
  Coffee,
  Zap,
  Gamepad2,
  Rocket,
  Star,
} from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { TerminalTypewriter } from "@/components/terminal-typewriter"
import { GlitchText } from "@/components/glitch-text"
import { NeonCard } from "@/components/neon-card"
import { cn } from "@/lib/utils"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [projectFilter, setProjectFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(false)
  const [showTerminal, setShowTerminal] = useState(true)
  const [terminalComplete, setTerminalComplete] = useState(false)

  const config = {
    personal: {
      name: "Zine Eddine",
      title: "Systems Programmer & Arcade Enthusiast",
      tagline: "Crafting high-performance systems with Rust, C++, and a touch of neon magic",
      bio: "I'm a passionate systems programmer who loves diving deep into low-level code, optimizing performance, and building tools that make developers' lives easier. When I'm not coding, you'll find me exploring the latest anime or perfecting my Vim configuration.",
    },
    social: {
      github: "https://github.com/zineeddine",
      linkedin: "https://linkedin.com/in/zineeddine",
      twitter: "https://twitter.com/zineeddine",
      email: "zine@example.com",
    },
  }

  const projects = [
    {
      id: 1,
      title: "RustOS Kernel",
      description:
        "A minimal operating system kernel written in Rust with custom memory management and process scheduling.",
      image: "/placeholder-ihe36.png",
      tags: ["Rust", "OS", "Kernel", "Assembly"],
      category: "Systems",
      github: "https://github.com/zineeddine/rustos",
      demo: null,
      featured: true,
    },
    {
      id: 2,
      title: "Neural Network Engine",
      description:
        "High-performance neural network library in C++ with CUDA acceleration and custom SIMD optimizations.",
      image: "/purple-neon-neural-network.png",
      tags: ["C++", "CUDA", "AI", "Performance"],
      category: "AI",
      github: "https://github.com/zineeddine/neural-engine",
      demo: "https://neural-demo.example.com",
      featured: true,
    },
    {
      id: 3,
      title: "Vim Plugin Suite",
      description: "Collection of Vim plugins for systems programming with syntax highlighting and debugging tools.",
      image: "/vim-editor-terminal.png",
      tags: ["Vim", "Plugin", "Developer Tools"],
      category: "Tools",
      github: "https://github.com/zineeddine/vim-suite",
      demo: null,
      featured: false,
    },
    {
      id: 4,
      title: "Retro Game Engine",
      description: "2D game engine built in C# with pixel-perfect rendering and arcade-style physics.",
      image: "/retro-neon-arcade-game.png",
      tags: ["C#", "Game Engine", "Graphics"],
      category: "Games",
      github: "https://github.com/zineeddine/retro-engine",
      demo: "https://retro-demo.example.com",
      featured: true,
    },
    {
      id: 5,
      title: "Linux Performance Monitor",
      description: "Real-time system monitoring tool with beautiful terminal UI and performance analytics.",
      image: "/linux-terminal-monitor.png",
      tags: ["Linux", "C++", "TUI", "Performance"],
      category: "Tools",
      github: "https://github.com/zineeddine/perfmon",
      demo: null,
      featured: false,
    },
    {
      id: 6,
      title: "Blockchain Validator",
      description: "High-throughput blockchain validator node written in Rust with custom consensus algorithm.",
      image: "/placeholder-x7i33.png",
      tags: ["Rust", "Blockchain", "Networking"],
      category: "Systems",
      github: "https://github.com/zineeddine/validator",
      demo: null,
      featured: false,
    },
  ]

  const skills = [
    { name: "Rust", level: 95, category: "Systems" },
    { name: "C++", level: 90, category: "Systems" },
    { name: "C#", level: 85, category: "Systems" },
    { name: "Linux", level: 92, category: "OS" },
    { name: "Assembly", level: 80, category: "Systems" },
    { name: "OpenGL", level: 75, category: "Graphics" },
    { name: "CUDA", level: 70, category: "GPU" },
    { name: "Vim", level: 98, category: "Editor" },
    { name: "Git", level: 88, category: "VCS" },
    { name: "Docker", level: 82, category: "DevOps" },
    { name: "React", level: 85, category: "Web" },
    { name: "TypeScript", level: 87, category: "Web" },
  ]

  const terminalLines = [
    "Initializing neural pathways...",
    "Loading personality matrix...",
    "Compiling dreams into reality...",
    "Establishing connection to the matrix...",
    "Welcome to the digital realm of Zine Eddine",
  ]

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
  const filteredProjects = projectFilter === "All" ? projects : projects.filter((p) => p.category === projectFilter)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      alert("Message sent! I'll get back to you soon.")
    }, 2000)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-x-hidden">
      <AnimatedBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-green-400/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <GlitchText text={config.personal.name} className="font-mono text-lg font-bold text-green-400" />
            <div className="hidden md:flex items-center gap-2">
              {["hero", "about", "skills", "projects", "contact"].map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "ghost"}
                  size="sm"
                  onClick={() => scrollToSection(section)}
                  className={cn(
                    "capitalize transition-all font-mono",
                    activeSection === section
                      ? "bg-green-400 text-black hover:bg-green-300"
                      : "text-green-400 hover:text-green-300 hover:bg-green-400/10",
                  )}
                >
                  {section}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-400 animate-pulse" />
            <span className="font-mono text-xs text-purple-400">ONLINE</span>
          </div>
        </div>
      </nav>

      <main className="pt-16 relative z-10">
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {showTerminal && !terminalComplete && (
              <div className="mb-8 p-6 bg-black/80 border border-green-400/30 rounded-lg backdrop-blur-sm">
                <TerminalTypewriter
                  lines={terminalLines}
                  onComplete={() => {
                    setTerminalComplete(true)
                    setTimeout(() => setShowTerminal(false), 2000)
                  }}
                />
              </div>
            )}

            {(!showTerminal || terminalComplete) && (
              <div className="animate-fade-in">
                <div className="mb-6 inline-block px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono animate-pulse">
                  <Gamepad2 className="inline h-4 w-4 mr-2" />
                  {config.personal.title}
                </div>

                <h1 className="mb-6 text-4xl md:text-7xl font-bold tracking-tight font-mono">
                  <GlitchText text={config.personal.name} className="text-green-400 animate-neon-glow" />
                </h1>

                <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto text-cyan-300 font-mono leading-relaxed">
                  {config.personal.tagline}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("projects")}
                    className="bg-green-400 hover:bg-green-300 text-black font-mono font-bold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/50"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Launch Projects
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection("contact")}
                    className="border-purple-400 text-purple-400 hover:bg-purple-400/10 font-mono font-bold transform hover:scale-105 transition-all duration-300"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Initialize Contact
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {["Rust", "C++", "Linux", "Vim"].map((skill, index) => (
              <div
                key={skill}
                className="absolute animate-float font-mono text-xs px-2 py-1 bg-black/60 border border-cyan-400/30 rounded text-cyan-400"
                style={{
                  top: `${20 + index * 15}%`,
                  left: `${10 + index * 20}%`,
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-mono text-green-400 animate-neon-glow">
              <Terminal className="inline h-8 w-8 mr-2" />
              System Information
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <NeonCard glowColor="cyan" className="p-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-purple-500 p-1">
                    <img
                      src="/anime-cyberpunk-programmer.png"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 font-mono mb-2">{config.personal.name}</h3>
                  <p className="text-purple-300 font-mono text-sm">Level 99 Code Wizard</p>
                </div>
              </NeonCard>

              <div>
                <p className="text-lg mb-6 leading-relaxed text-cyan-300 font-mono">{config.personal.bio}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Linux", "Rust", "C++", "C#", "Vim", "OpenGL", "Anime", "Coffee"].map((tech, index) => (
                    <Badge
                      key={tech}
                      className={cn(
                        "font-mono transition-all duration-300 hover:scale-110",
                        index % 4 === 0 && "bg-green-500/20 text-green-300 border-green-500/30",
                        index % 4 === 1 && "bg-purple-500/20 text-purple-300 border-purple-500/30",
                        index % 4 === 2 && "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
                        index % 4 === 3 && "bg-pink-500/20 text-pink-300 border-pink-500/30",
                      )}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  {config.social.github && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-green-400 text-green-400 hover:bg-green-400/10 font-mono bg-transparent"
                    >
                      <a href={config.social.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {config.social.linkedin && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-purple-400 text-purple-400 hover:bg-purple-400/10 font-mono bg-transparent"
                    >
                      <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-mono text-green-400 animate-neon-glow">
              <Cpu className="inline h-8 w-8 mr-2" />
              Skill Matrix
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Systems", "Web", "Tools"].map((category) => {
                const categorySkills = skills.filter(
                  (skill) =>
                    (category === "Systems" && ["Systems", "OS", "Graphics", "GPU"].includes(skill.category)) ||
                    (category === "Web" && ["Web"].includes(skill.category)) ||
                    (category === "Tools" && ["Editor", "VCS", "DevOps"].includes(skill.category)),
                )

                const colors = {
                  Systems: "green",
                  Web: "purple",
                  Tools: "cyan",
                } as const

                return (
                  <NeonCard key={category} glowColor={colors[category as keyof typeof colors]} className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 font-mono text-green-400">
                      {category === "Systems" && <Cpu className="h-5 w-5" />}
                      {category === "Web" && <Code2 className="h-5 w-5" />}
                      {category === "Tools" && <Terminal className="h-5 w-5" />}
                      {category}
                    </h3>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-cyan-300 font-mono">{skill.name}</span>
                            <span className="text-xs text-purple-400 font-mono">{skill.level}%</span>
                          </div>
                          <Progress
                            value={skill.level}
                            className="h-2 bg-black/50 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-cyan-400"
                          />
                        </div>
                      ))}
                    </div>
                  </NeonCard>
                )
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold font-mono text-green-400 animate-neon-glow">
                <Star className="inline h-8 w-8 mr-2" />
                Project Arcade
              </h2>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={projectFilter === category ? "default" : "outline"}
                    onClick={() => setProjectFilter(category)}
                    className={cn(
                      "transition-all font-mono",
                      projectFilter === category
                        ? "bg-purple-500 text-black hover:bg-purple-400"
                        : "border-purple-500/30 text-purple-300 hover:bg-purple-500/10",
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <NeonCard
                  key={project.id}
                  glowColor={index % 4 === 0 ? "green" : index % 4 === 1 ? "purple" : index % 4 === 2 ? "cyan" : "pink"}
                  className="p-0 overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-lg font-bold text-green-400 font-mono mb-1">{project.title}</h3>
                      <p className="text-sm text-cyan-300 font-mono line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30 font-mono"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-green-400/30 text-green-400 hover:bg-green-400/10 font-mono bg-transparent"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Button>
                      )}
                      {project.demo && (
                        <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-400 text-black font-mono">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </NeonCard>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-mono text-green-400 animate-neon-glow">
              <Mail className="inline h-8 w-8 mr-2" />
              Initialize Contact Protocol
            </h2>

            <NeonCard glowColor="green" className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-cyan-300 font-mono">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="mt-1 border-green-400/20 bg-black/50 font-mono text-green-400 focus:border-green-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-cyan-300 font-mono">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 border-green-400/20 bg-black/50 font-mono text-green-400 focus:border-green-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-cyan-300 font-mono">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    className="mt-1 border-green-400/20 bg-black/50 font-mono text-green-400 focus:border-green-400"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-cyan-300 font-mono">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-1 border-green-400/20 bg-black/50 font-mono text-green-400 focus:border-green-400 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-400 hover:bg-green-300 text-black font-mono font-bold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-green-400/20">
                <div className="flex justify-center gap-4">
                  {config.social.github && (
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
                    >
                      <a href={config.social.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {config.social.linkedin && (
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
                    >
                      <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {config.social.twitter && (
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                    >
                      <a href={config.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </NeonCard>
          </div>
        </section>
      </main>

      <footer className="border-t border-green-400/20 py-8 px-4 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cyan-400 font-mono">
            © {new Date().getFullYear()} {config.personal.name}. Powered by caffeine and neon dreams.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-400 font-mono">Made with</span>
            <Heart className="h-4 w-4 text-pink-400 animate-pulse" />
            <span className="text-sm text-purple-400 font-mono">and</span>
            <Coffee className="h-4 w-4 text-green-400" />
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-black border-2 border-green-400/50 text-green-400">
          <DialogHeader>
            <DialogTitle className="font-mono text-green-400 text-xl">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              {selectedProject.image && (
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full aspect-video object-cover rounded-lg border border-green-400/30"
                />
              )}
              <p className="text-cyan-300 font-mono leading-relaxed">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag: string) => (
                  <Badge key={tag} className="bg-purple-500/20 text-purple-300 border-purple-500/30 font-mono">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 pt-4">
                {selectedProject.github && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400/10 font-mono bg-transparent"
                  >
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
                {selectedProject.demo && (
                  <Button asChild className="bg-purple-500 hover:bg-purple-400 text-black font-mono">
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
