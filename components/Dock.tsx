'use client';

import React from 'react';
import { MenuDock, type MenuDockItem } from './ui/mac-os-dock'; // Adjust this path if necessary
import { Github, Linkedin, Twitter, BookOpen, Codepen, type LucideIcon } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';

// =====================================================================
// 1. DATA DEFINITION (Separated for clarity and maintenance)
// =====================================================================

// Define a type for the raw link data
export type DevLink = {
  label: string;
  href: string;
  // Allows both LucideIcon components and other React components (like SiDiscord)
  icon: LucideIcon | React.ElementType; 
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
};

// The default set of developer links
export const DEV_LINKS: DevLink[] = [
  { label: 'github', href: 'https://github.com/xCyberpunkx', icon: Github },
  { label: 'discord', href: 'https://discord.com/users/557172887799463937', icon: SiDiscord },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/zine-eddine-rouabah/', icon: Linkedin },
  { label: 'twitter', href: 'https://x.com/peeplil6666', icon: Twitter },
  { label: 'daily dev', href: 'https://app.daily.dev/skibidii', icon: BookOpen },
  { label: 'codepen', href: 'https://codepen.io/xCyberpunkx', icon: Codepen },
];


// =====================================================================
// 2. HELPER FUNCTION (Logic for mapping data to MenuDock format)
// =====================================================================

// Helper function to map DevLink data to MenuDockItem structure and handle click logic
const createMenuItem = (link: DevLink): MenuDockItem => {
  return {
    label: link.label,
    icon: link.icon,
    onClick: () => {
      // Robust and safe way to open external links
      window.open(
        link.href, 
        link.target || '_blank', 
        link.rel || 'noopener,noreferrer'
      );
    },
  };
};


// =====================================================================
// 3. COMPONENT DEFINITION (Reusable and accessible)
// =====================================================================

// Define the component's props for extensibility
type MenuDockDevProps = {
  /** Override the default set of links to be displayed in the dock. */
  links?: DevLink[];
  /** Custom ARIA label for accessibility. */
  ariaLabel?: string;
};

/**
 * A dock component displaying a set of external links for a developer portfolio.
 * It is reusable, accessible, and uses modern React practices.
 * * NOTE: Ensure the path to your MenuDock component (e.g., '@/components/ui/mac-os-dock')
 * is correct in the import statement.
 */
export default function MenuDockDev({ 
  links = DEV_LINKS,
  ariaLabel = "Developer Social and Portfolio Links Dock"
}: MenuDockDevProps) {

  // Use React.useMemo to calculate the MenuDock items only when the links prop changes.
  const devMenuItems: MenuDockItem[] = React.useMemo(() => 
    links.map(createMenuItem), 
    [links]
  );
  
  return (
    // Container for layout: full-width, centered, with padding.
    // Includes an accessible role and label for screen readers.
    <div 
      className="flex w-full justify-center py-4" 
      role="navigation" 
      aria-label={ariaLabel}
    >
      <MenuDock 
        items={devMenuItems}
        variant="default" // Assuming 'default' is a valid variant for your dock component
        orientation="horizontal"
        showLabels={true} // Display labels on hover
        animated={true} // Enable the dock's hover/zoom animation
      />
    </div>
  );
}