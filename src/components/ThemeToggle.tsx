import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useStore();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-lg"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
