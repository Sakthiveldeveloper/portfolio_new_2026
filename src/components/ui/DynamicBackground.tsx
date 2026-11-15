import { AuroraNodeBackground } from '@/components/ui/AuroraNodeBackground';
import { StarField } from '@/components/ui/StarField';
import { BACKGROUND_CONFIG } from '@/lib/constants';

export const DynamicBackground = () => {
  if (BACKGROUND_CONFIG.theme === 'stars') {
    return (
      <>
        {/* Original Deep Space Background */}
        <StarField />
        <div className="fixed inset-0 -z-30 bg-[#05050A]" />
      </>
    );
  }

  // Modern Aurora Mesh + Architectural Node Constellation
  return <AuroraNodeBackground />;
};
