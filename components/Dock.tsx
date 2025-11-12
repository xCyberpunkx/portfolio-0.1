'use client';
import { MenuDock, type MenuDockItem } from '@/components/ui/mac-os-dock';
import { Github, Linkedin, Twitter, BookOpen, Globe, Codepen } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
// Note: Hashnode and Behance are not in lucide-react by default. 
// You might need to use custom SVG components or another icon library.


const devMenuItems: MenuDockItem[] = [
  { 
    label: 'github', 
    icon: Github, 
    onClick: () => window.open('https://github.com/xCyberpunkx', '_blank') 
  },
  { 
    label: 'discord', 
    icon: SiDiscord, 
    onClick: () => window.open('https://discord.com/users/557172887799463937', '_blank', 'noopener,noreferrer') 
  },
  { 
    label: 'linkedin', 
    icon: Linkedin, 
    onClick: () => window.open('https://www.linkedin.com/in/zine-eddine-rouabah/', '_blank') 
  },
  { 
    label: 'twitter', 
    icon: Twitter, 
    onClick: () => window.open('https://x.com/peeplil6666', '_blank') 
  },
  { 
    label: 'daily dev', 
    icon: BookOpen, 
    onClick: () => window.open('https://app.daily.dev/skibidii', '_blank') 
  },
  {  
    label: 'codepen', 
    icon: Codepen, 
    onClick: () => window.open('https://codepen.io/xCyberpunkx', '_blank') 
  },
 
];

export default function MenuDockDev() {
  return (
    <div className="flex items-start justify-center min-h-[120px]">
      <MenuDock 
        items={devMenuItems}
        variant="default"
        orientation="horizontal"
        showLabels={true}
        animated={true}
      />
    </div>
  );
}
