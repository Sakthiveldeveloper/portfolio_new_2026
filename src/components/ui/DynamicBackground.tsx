import { useState, useEffect } from 'react';
import { AuroraNodeBackground } from '@/components/ui/AuroraNodeBackground';
import { CyberGridBackground } from '@/components/ui/CyberGridBackground';
import { StarField } from '@/components/ui/StarField';
import { BackgroundTheme, getInitialBackgroundTheme } from '@/lib/constants';

export const DynamicBackground = () => {
  const [theme, setTheme] = useState<BackgroundTheme>(getInitialBackgroundTheme());

  useEffect(() => {
    const handleThemeChange = (e: CustomEvent<BackgroundTheme>) => {
      if (e.detail) {
        setTheme(e.detail);
      }
    };

    window.addEventListener('change_portfolio_theme', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('change_portfolio_theme', handleThemeChange as EventListener);
    };
  }, []);

  if (theme === 'stars') {
    return (
      <>
        {/* Theme 1: Classic Deep Space Background */}
        <StarField />
        <div className="fixed inset-0 -z-30 bg-[#05050A]" />
      </>
    );
  }

  if (theme === 'cyber_grid') {
    // Theme 3: 3D Cyber Perspective Terrain Grid
    return <CyberGridBackground />;
  }

  // Theme 2: Modern Aurora Mesh + Architectural Node Constellation
  return <AuroraNodeBackground />;
};
