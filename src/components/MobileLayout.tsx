
import React, { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Add mobile-specific meta tags
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }

    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        if (window.innerWidth < 768) {
          document.body.style.zoom = '1';
        }
      });
    });
  }, []);

  return (
    <>
      <div className={`min-h-screen ${isMobile ? 'mobile-app' : ''}`}>
        {children}
      </div>
      <style>{`
        .mobile-app {
          /* Safe area handling for iOS */
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        
        /* Improve touch targets */
        .mobile-app button {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Better scrolling on mobile */
        .mobile-app {
          -webkit-overflow-scrolling: touch;
          overflow-scrolling: touch;
        }
        
        /* Prevent text selection on buttons */
        .mobile-app button {
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
      `}</style>
    </>
  );
};

export default MobileLayout;
