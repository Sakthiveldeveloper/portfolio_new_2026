import { useState, useEffect } from 'react';
import { Palette, Sparkles, Zap, Moon, Check } from 'lucide-react';
import { BackgroundTheme, getInitialBackgroundTheme } from '@/lib/constants';

const THEMES: { id: BackgroundTheme; label: string; icon: typeof Sparkles }[] = [
  { id: 'cyber_grid', label: 'Cyber Grid', icon: Zap },
  { id: 'aurora', label: 'Aurora Mesh', icon: Sparkles },
  { id: 'stars', label: 'Deep Space', icon: Moon },
];

export const BackgroundThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<BackgroundTheme>(getInitialBackgroundTheme());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleThemeChange = (e: CustomEvent<BackgroundTheme>) => {
      if (e.detail) {
        setCurrentTheme(e.detail);
      }
    };
    window.addEventListener('change_portfolio_theme', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('change_portfolio_theme', handleThemeChange as EventListener);
    };
  }, []);

  const handleSelectTheme = (newTheme: BackgroundTheme) => {
    setCurrentTheme(newTheme);
    localStorage.setItem('portfolio_bg_theme', newTheme);
    window.dispatchEvent(new CustomEvent('change_portfolio_theme', { detail: newTheme }));
    setIsOpen(false);
  };

  const activeOption = THEMES.find((t) => t.id === currentTheme) || THEMES[0];
  const Icon = activeOption.icon;

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {isOpen && (
        <div className="mb-2 p-1.5 bg-[#0c0d14]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-200 min-w-[170px]">
          <div className="px-2.5 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Background Theme
          </div>

          {THEMES.map((theme) => {
            const ItemIcon = theme.icon;
            const isSelected = currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectTheme(theme.id)}
                className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ItemIcon className="w-3.5 h-3.5" />
                  <span>{theme.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Switch Background Theme"
        className="group flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-primary/40 text-foreground transition-all shadow-lg active:scale-95"
      >
        <Palette className="w-3.5 h-3.5 text-primary group-hover:rotate-45 transition-transform" />
        <span className="text-xs font-medium flex items-center gap-1.5">
          <Icon className="w-3 h-3 text-primary/80" />
          <span>{activeOption.label}</span>
        </span>
      </button>
    </div>
  );
};
