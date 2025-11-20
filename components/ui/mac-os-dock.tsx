'use client';
import React, { useMemo, useRef } from 'react';
import { Home, Briefcase, Calendar, Shield, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
type IconComponentType = React.ElementType<{ className?: string }>;
export interface MenuDockItem {
  label: string;
  icon: IconComponentType;
  onClick?: () => void;
}
export interface MenuDockProps {
  items?: MenuDockItem[];
  className?: string;
  variant?: 'default' | 'compact' | 'large';
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  animated?: boolean;
}
const defaultItems: MenuDockItem[] = [
    { label: 'home', icon: Home },
    { label: 'work', icon: Briefcase },
    { label: 'calendar', icon: Calendar },
    { label: 'security', icon: Shield },
    { label: 'settings', icon: Settings },
];
export const MenuDock: React.FC<MenuDockProps> = ({ 
  items, 
  className,
  variant = 'default',
  orientation = 'horizontal',
  showLabels = true,
  animated = true
}) => {
  const finalItems = useMemo(() => {
     const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 8;
     if (!isValid) {
        console.warn("MenuDock: 'items' prop is invalid or missing. Using default items.", items);
        return defaultItems;
     }
     return items;
  }, [items]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'p-1 bg-white/10 backdrop-blur-md shadow-inner shadow-black/20',
          item: 'p-3 min-w-12 rounded-xl',
          icon: 'h-5 w-5',
          text: 'text-xs font-semibold text-gray-900'
        };
      case 'large':
        return {
          container: 'p-3 bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl',
          item: 'p-4 min-w-16 rounded-2xl',
          icon: 'h-6 w-6',
          text: 'text-base font-semibold text-gray-900'
        };
      default:
        return {
          container: 'p-2 bg-white/10 backdrop-blur-sm shadow-md rounded-2xl',
          item: 'p-3 min-w-14 rounded-xl',
          icon: 'h-5 w-5',
          text: 'text-sm font-medium text-gray-900'
        };
    }
  };
  const styles = getVariantStyles();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <nav
      className={cn(
        'relative inline-flex items-center',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        styles.container,
        className
      )}
      role="navigation"
    >
      {finalItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <button
            key={`${item.label}-${index}`}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={cn(
              'relative flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 hover:bg-white/30',
              styles.item,
              'text-gray-700 hover:text-gray-900'
            )}
            onClick={item.onClick}
            aria-label={item.label}
            type="button"
          >
            <div className={cn('flex items-center justify-center', styles.icon)}>
              <IconComponent className={cn(styles.icon, 'transition-transform duration-200')} />
            </div>
            {showLabels && (
              <span className={cn(styles.text, 'mt-1 transition-colors duration-200')}>{item.label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
