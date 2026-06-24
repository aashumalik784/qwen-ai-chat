'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const icons = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
    system: <Monitor className="w-4 h-4" />,
  };

  return (
    <Dropdown
      align="right"
      trigger={
        <Button variant="ghost" size="icon">
          {icons[theme]}
        </Button>
      }
    >
      <DropdownItem onClick={() => setTheme('light')} icon={<Sun className="w-4 h-4" />}>
        Light
      </DropdownItem>
      <DropdownItem onClick={() => setTheme('dark')} icon={<Moon className="w-4 h-4" />}>
        Dark
      </DropdownItem>
      <DropdownItem onClick={() => setTheme('system')} icon={<Monitor className="w-4 h-4" />}>
        System
      </DropdownItem>
    </Dropdown>
  );
}
