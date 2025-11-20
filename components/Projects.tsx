"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Sawerni",
    description:
      "Algeria’s platform for matching clients with verified photographers in seconds. Features automated trust scoring and microservices architecture.",
    tags: ["Rust", "TypeScript", "PostgreSQL", "Microservices"],
    image: "/sawerni.png",
    link: "https://sawerni.vercel.app/",
    github: "https://github.com/xCyberpunkx/sawerni-kv",
    stats: "120ms Latency • 48 Provinces",
  },
  {
    title: "Optimize Construction",
    description:
      "Enterprise site for modular construction specialists with realtime lead routing. Headless CMS implementation improved SEO by 61%.",
    tags: ["Next.js", "Cloudflare", "WordPress", "Headless"],
    image: "/optimize.png",
    link: "https://optimize-construction.dz",
    stats: "+37% Leads • SEO Optimized",
  },
  {
    title: "Remdani Dental Center",
    description:
      "Conversion-focused landing for a modern clinic with calendar sync. HIPAA-ready forms and OTP booking flow.",
    tags: ["Next.js", "OAuth", "Tailwind", "Healthcare"],
    image: "/ramdani.png",
    link: "https://ramdani.vercel.app/",
    github: "https://github.com/xCyberpunkx/dental-frontend",
    stats: "24% Conversion Rate • 98 PageSpeed",
  },
  {
    title: "Arcade Lab",
    description:
      "Interactive mini-games platform for latency testing and binary logic training. Built with high-performance rendering in mind.",
    tags: ["React", "Canvas API", "Game Dev", "Performance"],
    image: "/arcade.jpg",
    link: "/arcade",
    stats: "60 FPS • <16ms Frame Time",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Work</h2>
            <p className="text-gray-600 max-w-xl">
              A selection of projects that demonstrate my passion for performance, user experience, and robust
              engineering.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex bg-transparent">
            View All Projects <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{project.stats}</p>
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button variant="outline" className="w-full bg-transparent">
            View All Projects <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
