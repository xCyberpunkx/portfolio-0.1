"use client";

import { useState, useEffect, useRef, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, JSX } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download, User, Mail, Code, Globe, Terminal, Shield, Cpu, Github, Linkedin,
  ExternalLink, ChevronUp, Menu, X, Play, Gamepad2, Zap, Star, Rocket, Brain,
  Trophy, Send, HelpCircle, Twitter, Phone, MessageCircle, GitBranch, ChevronDown,
  Search as SearchIcon, Sparkles, Flame, Bot, Palette, Layout, Smartphone, Laptop,
  Database, Cloud, Server, Network, ChartBar, BarChart3, TrendingUp, Award,
  Users, Briefcase, GraduationCap, Calendar, Clock, MapPin, ChevronRight,
  Eye, EyeOff, Key, Lock, Unlock, Settings, Bell, CircleDollarSign,
  CreditCard, ShoppingCart, Heart, Bookmark, Share2, Copy, Edit3, Trash2,
  MoreVertical, MoreHorizontal, Filter, Sliders, Grid, List, Grid3x3,
  RotateCcw, RotateCw, Minimize2, Maximize2, Square, Minus, Plus, HopIcon,
  Keyboard,
  Book
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import React from "react";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  megaContent?: any;
  href?: string;
};

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Rocket
  },
  {
    id: "about",
    label: "About",
    icon: User,
    megaContent: {
      title: "About Me",
      description: "Get to know the person behind the code",
      sections: [
        {
          title: "My Story",
          items: [
            { title: "The Beginning", description: "How I discovered programming", icon: Rocket, badge: "Journey", target: "journey" },
            { title: "Passion & Purpose", description: "Why I love what I do", icon: Heart, badge: "Values", target: "about" },
            { title: "Philosophy", description: "My approach to development", icon: Brain, badge: "Mindset", target: "about" }
          ]
        },
        {
          title: "Credentials",
          items: [
            { title: "Education", description: "Academic achievements & learning", icon: GraduationCap, badge: "Degrees", target: "journey" },
            { title: "Certifications", description: "Professional credentials & skills", icon: Award, badge: "Verified", target: "skills" },
            { title: "Experience", description: "Professional background & roles", icon: Briefcase, badge: "Years", target: "projects" }
          ]
        }
      ]
    }
  },
  {
    id: "projects",
    label: "Projects",
    icon: Code
  },
  {
    id: "services",
    label: "Services",
    icon: Zap,
    megaContent: {
      title: "Professional Services",
      description: "End-to-end digital solutions for your business",
      services: [
        { title: "Web Development", description: "Custom websites and web applications", icon: Layout, features: ["Responsive Design", "SEO Optimization", "Performance", "Security"] },
        { title: "Mobile Development", description: "iOS and Android applications", icon: Smartphone, features: ["Native Performance", "Cross-Platform", "App Store Optimization", "Push Notifications"] },
        { title: "AI Integration", description: "Machine learning and automation", icon: Bot, features: ["Predictive Analytics", "Computer Vision", "NLP", "Custom Models"] },
        { title: "UI/UX Design", description: "Beautiful and intuitive interfaces", icon: Palette, features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"] }
      ],
      process: [
        { step: "1", title: "Discovery", description: "Understand your needs" },
        { step: "2", title: "Planning", description: "Create roadmap & timeline" },
        { step: "3", title: "Development", description: "Build & test solutions" },
        { step: "4", title: "Launch", description: "Deploy & optimize" },
        { step: "5", title: "Support", description: "Ongoing maintenance" }
      ]
    }
  },
  {
    id: "skills",
    label: "Skills",
    icon: Shield,
    megaContent: {
      title: "Technical Expertise",
      description: "Comprehensive skill set across modern technologies",
      techStack: [
        {
          category: "Frontend",
          skills: [
            { name: "React", level: 95, iconHex: "61DAFB" },
            { name: "Next.js", level: 90, iconHex: "ffffff" },
            { name: "TypeScript", level: 88, iconHex: "3178C6" },
            { name: "Tailwind CSS", level: 92, iconHex: "38BDF8" },
            { name: "Framer Motion", level: 85, iconHex: "0055FF" }
          ]
        },
        {
          category: "Backend",
          skills: [
            { name: "Node.js", level: 87, iconHex: "5FA04E" },
            { name: "Python", level: 82, iconHex: "3776AB" },
            { name: "MongoDB", level: 85, iconHex: "47A248" },
            { name: "PostgreSQL", level: 80, iconHex: "4169E1" },
            { name: "Firebase", level: 88, iconHex: "FFCA28" }
          ]
        },
        {
          category: "DevOps & Tools",
          skills: [
            { name: "Git", level: 95, iconHex: "F05032" },
            { name: "Docker", level: 78, iconHex: "2496ED" },
            { name: "AWS", level: 75, iconHex: "FF9900" },
            { name: "Vercel", level: 90, iconHex: "000000" },
            { name: "Figma", level: 85, iconHex: "F24E1E" }
          ]
        }
      ],
      certifications: [
        { title: "AWS Certified", provider: "Amazon", year: "2023" },
        { title: "Google Analytics", provider: "Google", year: "2022" },
        { title: "MongoDB University", provider: "MongoDB", year: "2023" },
        { title: "React Advanced", provider: "Meta", year: "2024" }
      ]
    }
  },
  {
    id: "blog",
    label: "Blog",
    icon: Book,
    href: "/blog"
  },
  {
    id: "arcade",
    label: "Arcade",
    icon: Gamepad2,
    megaContent: {
      title: "Arcade Lab",
      description: "Mini-games for latency, binary logic, and command mastery.",
      games: [
        { id: "latency-tap", title: "Latency Tap", summary: "Reflex trainer for sub-150ms reactions.", icon: Zap },
        { id: "bit-flip", title: "Bit Flip", summary: "Binary builder sharpening mental math.", icon: Cpu },
        { id: "command-sprint", title: "Command Sprint", summary: "Terminal typing races for pros.", icon: Keyboard }
      ],
      cta: {
        label: "Launch Arcade",
        href: "/arcade"
      }
    }
  },
];

export default function Portfolio() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement | null>(null);
  const closeTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const handleDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!navRef.current?.contains(target) && !megaRef.current?.contains(target)) {
        setMegaMenuOpen(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleDocMouseDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleDocMouseDown);
    };
  }, [mouseX, mouseY]);

  const openMega = (id: string) => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = null;
    setMegaMenuOpen(id);
  };

  const scheduleCloseMega = (delay = 180) => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => {
      setMegaMenuOpen(null);
      closeTimeout.current = null;
    }, delay);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    setMegaMenuOpen(null);

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const elementPosition = elementRect.top - bodyRect.top;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigation = (item: NavItem) => {
    if (item.href) {
      router.push(item.href);
      setMobileMenuOpen(false);
      setMegaMenuOpen(null);
      setActiveSection(item.id);
      return;
    }
    scrollToSection(item.id);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const quickLinks: Array<{ title: string; icon: LucideIcon; action: () => void }> = [
    { title: "View All Projects", icon: Grid, action: () => scrollToSection("projects") },
    { title: "Download Portfolio", icon: Download, action: () => window.open("/resume.pdf", "_blank") },
    { title: "Schedule a Call", icon: Phone, action: () => scrollToSection("contact") },
    { title: "Play Arcade Games", icon: Gamepad2, action: () => router.push("/arcade") },
    { title: "Request Quote", icon: CircleDollarSign, action: () => scrollToSection("contact") }
  ];

  return (
    <div>
      <motion.nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/30 shadow-sm transition-all duration-500",
          isScrolled && "shadow-md"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
                <motion.div
                  className="text-2xl"
                  animate={{ rotate: [0, -6, 6, -3, 3, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  🐧
                </motion.div>
                <span className="font-mono tracking-tighter">
                  <span className="md:hidden">ZR</span>
                  <span className="hidden md:inline">Zine Eddine</span>
                </span>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const hasMega = !!item.megaContent;
                return (
                  <div key={item.id} className="relative">
                    <motion.button
                      onClick={() => hasMega ? openMega(item.id) : handleNavigation(item)}
                      onMouseEnter={() => hasMega && openMega(item.id)}
                      onMouseLeave={() => hasMega && scheduleCloseMega()}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative",
                        activeSection === item.id ? "text-black font-semibold" : "text-gray-600 hover:text-black",
                        "hover:bg-gray-100"
                      )}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      aria-haspopup={hasMega ? "true" : "false"}
                      aria-expanded={megaMenuOpen === item.id}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.label}</span>
                      {hasMega && (
                        <ChevronDown
                          className={cn(
                            "ml-1 h-3 w-3 transition-transform duration-300",
                            megaMenuOpen === item.id && "rotate-180"
                          )}
                        />
                      )}

                      {activeSection === item.id && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full"
                          layoutId="activeIndicator"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => window.open("/resume.pdf", "_blank")}
                    className="bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg font-medium group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shine" />
                    <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    <span>Download CV</span>
                  </Button>
                </motion.div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {megaMenuOpen && (
              <motion.div
                ref={(el) => {
                  if (el) megaRef.current = el;
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
                onMouseEnter={() => {
                  if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
                }}
                onMouseLeave={() => scheduleCloseMega()}
              >
                <div className="max-w-7xl mx-auto px-8 py-8">
                  {navItems.find(item => item.id === megaMenuOpen)?.megaContent && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="flex-shrink-0 p-3 bg-black/10 rounded-xl">
                            {(() => {
                              const item = navItems.find(navItem => navItem.id === megaMenuOpen);
                              const IconComponent = item?.icon;
                              return IconComponent && <IconComponent className="h-6 w-6 text-black" />;
                            })()}
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                              {navItems.find(item => item.id === megaMenuOpen)?.megaContent?.title}
                            </h2>
                            <p className="text-gray-600">
                              {navItems.find(item => item.id === megaMenuOpen)?.megaContent?.description}
                            </p>
                          </div>
                        </div>

                        {megaMenuOpen === "about" && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {navItems.find(i => i.id === "about")?.megaContent?.sections?.map((section: { title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; items: any[]; }, idx: Key | null | undefined) => (
                                <div key={idx} className="space-y-3">
                                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-black rounded-full"></span>
                                    {section.title}
                                  </h3>
                                  <div className="space-y-2">
                                    {section.items.map((it: { target: any; icon: JSX.IntrinsicAttributes; title: React.ReactNode; badge: React.ReactNode; description: React.ReactNode }, itemIdx: number) => (
                                      <motion.button
                                        key={itemIdx}
                                        type="button"
                                        onClick={() => scrollToSection(it.target || "about")}
                                        className="flex w-full items-start rounded-lg p-3 text-left transition-all duration-200 group hover:bg-gray-50/80"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: typeof itemIdx === "number" ? itemIdx * 0.05 : 0 }}
                                      >
                                        <div className="shrink-0 mt-0.5 p-1.5 bg-gray-100 rounded-lg group-hover:bg-black group-hover:text-white">
                                          {typeof it.icon === "function" && React.createElement(it.icon as React.ElementType, { className: "h-4 w-4" })}
                                        </div>
                                        <div className="ml-3">
                                          <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-gray-900 group-hover:text-black">{it.title}</h4>
                                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                                              {it.badge}
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-gray-500 group-hover:text-gray-700 mt-1">{it.description}</p>
                                        </div>
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                              <h3 className="font-semibold text-gray-800 mb-3">
                                {navItems.find(i => i.id === "about")?.megaContent?.featured?.title}
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {navItems.find(i => i.id === "about")?.megaContent?.featured?.items?.map((fact, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <fact.icon className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm text-gray-700">{fact.text}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {megaMenuOpen === "services" && (
                          <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {navItems.find(i => i.id === "services")?.megaContent?.services?.map((service, idx) => (
                                <motion.button
                                  key={idx}
                                  type="button"
                                  onClick={() => scrollToSection("services")}
                                  className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-left group"
                                  whileHover={{ y: -5 }}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.06 }}
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-black/10 rounded-lg group-hover:bg-black group-hover:text-white">
                                      <service.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800">{service.title}</h3>
                                  </div>
                                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                  <div className="space-y-1 text-xs text-gray-500">
                                    {service.features.map((feature, fIdx) => (
                                      <div key={fIdx} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        {feature}
                                      </div>
                                    ))}
                                  </div>
                                </motion.button>
                              ))}
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                              <h3 className="font-semibold text-gray-800 mb-4 text-center">Our Process</h3>
                              <div className="flex flex-wrap justify-center gap-4">
                                {navItems.find(i => i.id === "services")?.megaContent?.process?.map((step, idx) => (
                                  <motion.div
                                    key={idx}
                                    className="flex flex-col items-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                  >
                                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mb-2">
                                      {step.step}
                                    </div>
                                    <div className="text-center">
                                      <div className="font-medium text-gray-800">{step.title}</div>
                                      <div className="text-xs text-gray-600">{step.description}</div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {megaMenuOpen === "skills" && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {navItems.find(i => i.id === "skills")?.megaContent?.techStack?.map((category: { category: string; skills: any[] }, idx: number) => (
                                <div key={idx} className="space-y-4">
                                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-black rounded-full"></span>
                                    {category.category}
                                  </h3>
                                  <div className="space-y-3">
                                    {category.skills.map((skill: any, sIdx: number) => (
                                      <motion.div
                                        key={sIdx}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: sIdx * 0.03 }}
                                      >
                                        {skill.iconSlug ? (
                                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white">
                                            <Image
                                              src={`https://cdn.simpleicons.org/${skill.iconSlug}/${skill.iconHex}`}
                                              alt={`${skill.name} logo`}
                                              width={20}
                                              height={20}
                                              className="h-5 w-5 object-contain"
                                            />
                                          </span>
                                        ) : (
                                          <span className="text-lg">{skill.icon}</span>
                                        )}
                                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                              <h3 className="font-semibold text-gray-800 mb-3">Certifications</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {navItems.find(i => i.id === "skills")?.megaContent?.certifications?.map((cert, idx) => (
                                  <motion.div
                                    key={idx}
                                    className="bg-white rounded-lg p-3 border border-purple-200"
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                  >
                                    <div className="font-medium text-gray-800 text-sm">{cert.title}</div>
                                    <div className="text-xs text-gray-600">{cert.provider}</div>
                                    <div className="text-xs text-purple-600 font-medium">{cert.year}</div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {megaMenuOpen === "arcade" && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {navItems.find(i => i.id === "arcade")?.megaContent?.games?.map((game, idx) => (
                                <motion.button
                                  key={game.id}
                                  type="button"
                                  onClick={() => router.push(`/arcade#${game.id}`)}
                                  className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                                      <game.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                      <p className="text-sm font-semibold text-gray-900">{game.title}</p>
                                      <p className="text-xs text-gray-500">{game.summary}</p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                            <Button
                              onClick={() => router.push("/arcade")}
                              className="w-full bg-black text-white hover:bg-gray-900"
                            >
                              Launch Arcade Lab
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6">
                          <h3 className="font-bold text-xl mb-3">🚀 Let's Build Something Amazing</h3>
                          <p className="text-blue-100 mb-4">Ready to start your next project? I'm here to help.</p>
                          <Button
                            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                            onClick={() => scrollToSection("contact")}
                          >
                            Get Started
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold text-gray-800">Quick Links</h3>
                          <div className="space-y-2">
                            {quickLinks.map((link) => {
                              const Icon = link.icon;
                              return (
                                <motion.button
                                  key={link.title}
                                  type="button"
                                  onClick={link.action}
                                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all duration-200 hover:bg-gray-100 group"
                                  whileHover={{ x: 5 }}
                                >
                                  <Icon className="h-4 w-4 text-gray-500 group-hover:text-black" />
                                  <span className="text-sm text-gray-700 group-hover:text-black">{link.title}</span>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
                          <div className="space-y-3">
                            {[
                              { title: "Launched E-commerce Platform", time: "2 hours ago" },
                              { title: "Completed AI Integration", time: "1 day ago" },
                              { title: "Published Case Study", time: "3 days ago" }
                            ].map((activity, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <div className="text-sm text-gray-700">{activity.title}</div>
                                  <div className="text-xs text-gray-500">{activity.time}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
                className="lg:hidden mt-2 pb-4 border-t border-gray-100"
              >
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((section) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 }}
                    >
                      <Button
                        variant={activeSection === section.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleNavigation(section)}
                        className={cn(
                          "w-full justify-start gap-2 h-12 font-medium",
                          activeSection === section.id
                            ? "bg-black text-white"
                            : "text-gray-700 hover:text-black hover:bg-gray-100"
                        )}
                      >
                        <section.icon className="h-4 w-4" />
                        {section.label}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button
                    onClick={() => window.open("/resume.pdf", "_blank")}
                    className="bg-black text-white text-sm font-medium"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Image src="/pirelli.png" alt="Pirelli Logo" width={100} height={40} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}