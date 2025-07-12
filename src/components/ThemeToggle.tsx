import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 p-0 flex items-center overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <span className="absolute left-1 top-1/2 -translate-y-1/2 z-10">
        <Sun className="w-4 h-4 text-yellow-500" />
      </span>
      {/* Moon Icon */}
      <span className="absolute right-1 top-1/2 -translate-y-1/2 z-10">
        <Moon className="w-4 h-4 text-blue-500" />
      </span>
      {/* Knob */}
      <span
        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 z-20 border border-gray-300 dark:border-gray-600 ${
          theme === 'dark' ? 'translate-x-[1.5rem]' : 'translate-x-0'
        }`}
      />
    </Button>
  );
};

export default ThemeToggle; 