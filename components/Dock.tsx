"use client"

import React from "react"
import { Dock, DockIcon } from "@/components/ui/floating-dock"
import {
  FaGithub,
  FaGoogleDrive,
  FaWhatsapp,
  FaTwitter,
  FaReddit,
  FaDiscord,
  FaMedium,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa"

export function DockDemo() {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <span className="text-sm font-semibold">Follow me on social media</span>
      <Dock direction="middle">
        <DockIcon href="https://github.com" target="_blank">
          <FaGithub className="w-6 h-6 text-black dark:text-white" />
        </DockIcon>
        <DockIcon href="https://drive.google.com" target="_blank">
          <FaGoogleDrive className="w-6 h-6 text-green-600" />
        </DockIcon>
        <DockIcon href="https://wa.me/" target="_blank">
          <FaWhatsapp className="w-6 h-6 text-green-500" />
        </DockIcon>
        <DockIcon href="https://twitter.com" target="_blank">
          <FaTwitter className="w-6 h-6 text-blue-400" />
        </DockIcon>
        <DockIcon href="https://reddit.com" target="_blank">
          <FaReddit className="w-6 h-6 text-orange-500" />
        </DockIcon>
        <DockIcon href="https://discord.com" target="_blank">
          <FaDiscord className="w-6 h-6 text-indigo-600" />
        </DockIcon>
        <DockIcon href="https://medium.com" target="_blank">
          <FaMedium className="w-6 h-6 text-gray-900" />
        </DockIcon>
        <DockIcon href="https://instagram.com" target="_blank">
          <FaInstagram className="w-6 h-6 text-pink-500" />
        </DockIcon>
        <DockIcon href="https://linkedin.com" target="_blank">
          <FaLinkedin className="w-6 h-6 text-blue-700" />
        </DockIcon>
        <DockIcon href="https://facebook.com" target="_blank">
          <FaFacebook className="w-6 h-6 text-blue-600" />
        </DockIcon>
      </Dock>
    </div>
  )
}
