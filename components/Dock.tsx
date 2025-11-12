'use client';
import { MenuDock, type MenuDockItem } from '@/components/ui/mac-os-dock';
import { Github, Gitlab, Linkedin, Twitter, BookOpen, Globe, Codepen } from 'lucide-react';
// Note: Hashnode and Behance are not in lucide-react by default. 
// You might need to use custom SVG components or another icon library.


const devMenuItems: MenuDockItem[] = [
  { 
    label: 'github', 
    icon: Github, 
    onClick: () => window.open('https://github.com/yourusername', '_blank') 
  },
  { 
    label: 'discord', 
    icon: Gitlab, 
    onClick: () => window.open('https://discord.com/invite/yourusername', '_blank') 
  },
  { 
    label: 'linkedin', 
    icon: Linkedin, 
    onClick: () => window.open('https://linkedin.com/in/yourusername', '_blank') 
  },
  { 
    label: 'twitter', 
    icon: Twitter, 
    onClick: () => window.open('https://twitter.com/yourusername', '_blank') 
  },
  { 
    label: 'daily dev', 
    icon: BookOpen, 
    onClick: () => window.open('https://daily.dev/@yourusername', '_blank') 
  },
  {  
    label: 'codepen', 
    icon: Codepen, 
    onClick: () => window.open('https://codepen.io/yourusername', '_blank') 
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
