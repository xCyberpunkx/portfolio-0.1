import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandReddit,
  IconBrandDiscord,
  IconBrandMedium,
  IconBrandInstagram,
  IconHome,
  IconShieldLock,
  IconLockAccess,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "http://127.0.0.1",
    },
    {
      title: "Twitter / X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://twitter.com/",
    },
    {
      title: "Reddit",
      icon: (
        <IconBrandReddit className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://reddit.com/",
    },
    {
      title: "Discord",
      icon: (
        <IconBrandDiscord className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://discord.com/",
    },
    {
      title: "Medium",
      icon: (
        <IconBrandMedium className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://medium.com/",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://instagram.com/",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/",
    },
    {
      title: "Hack The Box",
      icon: (
        <IconShieldLock className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.hackthebox.com/",
    },
    {
      title: "TryHackMe",
      icon: (
        <IconLockAccess className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://tryhackme.com/",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <FloatingDock items={links} />
    </div>
  );
}
