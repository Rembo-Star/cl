import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight, Zap } from 'lucide-react';
import { 
  trackCTAClick, 
  trackScrollDepth, 
  trackHover, 
  trackRageClick,
  trackRedirectToOffer,
  trackExitIntent,
  trackHesitation,
  trackPageView
} from '../utils/clarity';

// 🎯 CONFIGURATION: Replace with your actual landing page URL
const LANDING_URL = 'https://fresh-blrs10.com/c8212cb08';

export function PrelandingPage() {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickCount, setClickCount] = useState<{ [key: string]: number }>({});
  const [hoverStart, setHoverStart] = useState<{ [key: string]: number }>({});
  const [redirectProgress, setRedirectProgress] = useState(0);

  useEffect(() => {
    // Ensure smooth load
    setIsLoaded(true);

    // 🎯 AUTO-REDIRECT: Automatically redirect to landing after 15 seconds
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setRedirectProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / 1500); // 1500 frames for 15000ms at ~60fps
      });
    }, 10);

    const autoRedirectTimer = setTimeout(() => {
      trackPageView('prelanding');
      trackRedirectToOffer('auto_redirect');
      window.location.href = LANDING_URL;
    }, 15000); // 15 seconds delay - gives user time to view content and MS Clarity to track

    // Track exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        trackExitIntent();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(autoRedirectTimer);
      clearInterval(progressInterval);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll depth tracking
  useEffect(() => {
    let lastScrollDepth = 0;
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      // Track at 25%, 50%, 75%, 100%
      if (scrollPercentage >= 25 && lastScrollDepth < 25) {
        trackScrollDepth('hero', 25);
        lastScrollDepth = 25;
      } else if (scrollPercentage >= 50 && lastScrollDepth < 50) {
        trackScrollDepth('hero', 50);
        lastScrollDepth = 50;
      } else if (scrollPercentage >= 75 && lastScrollDepth < 75) {
        trackScrollDepth('hero', 75);
        lastScrollDepth = 75;
      } else if (scrollPercentage >= 100 && lastScrollDepth < 100) {
        trackScrollDepth('hero', 100);
        lastScrollDepth = 100;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rage click detection helper
  const detectRageClick = useCallback((elementId: string) => {
    const now = Date.now();
    const key = `${elementId}_${Math.floor(now / 1000)}`;
    
    setClickCount(prev => {
      const newCount = { ...prev };
      newCount[key] = (newCount[key] || 0) + 1;
      
      // If 3+ clicks within 1 second = rage click
      if (newCount[key] >= 3) {
        trackRageClick(elementId);
        newCount[key] = 0;
      }
      
      return newCount;
    });
  }, []);

  // Main CTA click handler - memoized for performance
  const handleCTAClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // Track click
    trackCTAClick('main_continuar');
    detectRageClick('cta_main');
    trackRedirectToOffer();
    
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    
    // Navigate to your main landing page
    setTimeout(() => {
      window.location.href = LANDING_URL;
    }, 400);
  }, [detectRageClick]);

  // Logo click handler - memoized
  const handleLogoClick = useCallback(() => {
    trackCTAClick('logo_chile_access');
    detectRageClick('logo');
    window.location.href = LANDING_URL;
  }, [detectRageClick]);

  // Exclusivo tag click handler - memoized
  const handleExclusivoClick = useCallback(() => {
    trackCTAClick('tag_exclusivo_hoy');
    detectRageClick('exclusivo_tag');
    window.location.href = LANDING_URL;
  }, [detectRageClick]);

  // Hover tracking for desktop
  const handleCTAHoverStart = useCallback((elementId: string) => {
    const now = Date.now();
    setHoverStart(prev => ({ ...prev, [elementId]: now }));
    trackHover(elementId);
  }, []);

  const handleCTAHoverEnd = useCallback((elementId: string) => {
    const start = hoverStart[elementId];
    if (start) {
      const duration = Date.now() - start;
      // If hover > 2 seconds without click = hesitation
      if (duration > 2000) {
        trackHesitation(elementId, duration);
      }
    }
  }, [hoverStart]);

  // Global click handler - any click redirects to landing
  const handleGlobalClick = useCallback((e: React.MouseEvent) => {
    trackCTAClick('global_page_click');
    trackRedirectToOffer('page_click');
    window.location.href = LANDING_URL;
  }, []);

  return (
    <div 
      onClick={handleGlobalClick}
      className="h-screen overflow-hidden bg-gradient-to-b from-[#0C0E12] via-[#0F111A] to-[#111827] relative flex flex-col cursor-pointer"
      data-clarity-region="prelanding_main"
      data-page="prelanding"
    >
      {/* Auto-redirect progress bar */}
      <div 
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#A3F73B] via-[#27C7E6] to-[#93FB58] transition-all duration-100 ease-linear z-50"
        style={{ 
          width: `${redirectProgress}%`,
          boxShadow: '0 0 8px rgba(163, 247, 59, 0.6), 0 0 16px rgba(39, 199, 230, 0.4)'
        }}
      />

      {/* Optimized background - reduced blur for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-8%] w-[700px] h-[700px] bg-gradient-to-br from-[#A3F73B] to-[#7BC91A] opacity-[0.09] rounded-full" style={{ filter: 'blur(100px)' }}></div>
        <div className="absolute bottom-[-20%] left-[-15%] w-[800px] h-[800px] bg-gradient-to-tr from-[#27C7E6] to-[#1E9FB8] opacity-[0.07] rounded-full" style={{ filter: 'blur(100px)' }}></div>
        <div className="absolute top-[25%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-[#93FB58] via-[#4FD4EB] to-[#93FB58] opacity-[0.06] rounded-full" style={{ filter: 'blur(80px)' }}></div>
        
        {/* Static decorative circle - no heavy animation */}
        <div
          className="absolute top-[35%] right-[8%] w-[200px] h-[200px] rounded-full hidden lg:block"
          style={{
            background: 'radial-gradient(circle, rgba(79, 212, 235, 0.12) 0%, transparent 70%)',
            border: '1px solid rgba(79, 212, 235, 0.1)',
            opacity: 0.5
          }}
        />
      </div>

      <style>{`
        /* Global page clickable cursor */
        * {
          cursor: pointer !important;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }



        /* Optimized glassmorphism - no animations */
        .glass-frosted {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.2),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
          overflow: hidden;
          isolation: isolate;
        }

        /* Premium CTA Button - Subtle pulse animation */
        .button-cta {
          position: relative;
          background: linear-gradient(180deg, #F5FFB3 0%, #D4FF7A 15%, #A3F73B 50%, #8FE01F 85%, #7BC91A 100%);
          border: 2px solid rgba(200, 255, 94, 0.6);
          box-shadow:
            /* Inner highlights */
            inset 0 3px 8px rgba(255, 255, 255, 0.7),
            inset 0 -3px 8px rgba(0, 0, 0, 0.25),
            /* Soft premium glow */
            0 0 16px rgba(163, 247, 59, 0.22),
            0 0 32px rgba(163, 247, 59, 0.12),
            /* Deep shadow for depth */
            0 24px 64px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          animation: pulse-glow 2.5s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              inset 0 3px 8px rgba(255, 255, 255, 0.7),
              inset 0 -3px 8px rgba(0, 0, 0, 0.25),
              0 0 16px rgba(163, 247, 59, 0.22),
              0 0 32px rgba(163, 247, 59, 0.12),
              0 24px 64px rgba(0, 0, 0, 0.35);
          }
          50% {
            transform: scale(1.02);
            box-shadow:
              inset 0 3px 8px rgba(255, 255, 255, 0.7),
              inset 0 -3px 8px rgba(0, 0, 0, 0.25),
              0 0 24px rgba(163, 247, 59, 0.35),
              0 0 48px rgba(163, 247, 59, 0.2),
              0 24px 64px rgba(0, 0, 0, 0.35);
          }
        }

        @media (max-width: 768px) {
          .glass-frosted {
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
          }
        }
      `}</style>

      <div className="relative z-10 flex flex-col h-full">
        {/* SECTION_header - Header with logo and promo tag */}
        <header 
          className="px-4 py-3 sm:px-6 sm:py-4"
          data-clarity-region="header"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* CTA_logo_chile_access - Logo left - clickable */}
            <button
              onClick={handleLogoClick}
              onMouseEnter={() => handleCTAHoverStart('logo_chile_access')}
              onMouseLeave={() => handleCTAHoverEnd('logo_chile_access')}
              className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
              data-clarity-click="cta_logo"
              data-element-name="CTA_logo_chile_access"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #A3F73B 0%, #27C7E6 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.5)'
              }}>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#0C0E12]" fill="currentColor" />
              </div>
              <span className="text-white text-sm sm:text-base hidden sm:block" style={{
                textShadow: '0 1px 4px rgba(0,0,0,0.6)'
              }}>Chile Access</span>
            </button>
            
            {/* CTA_tag_exclusivo_hoy - Tag right - clickable promo */}
            <button
              onClick={handleExclusivoClick}
              onMouseEnter={() => handleCTAHoverStart('tag_exclusivo')}
              onMouseLeave={() => handleCTAHoverEnd('tag_exclusivo')}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer border-none"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px) saturate(150%)',
                WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                overflow: 'hidden'
              }}
              data-clarity-click="cta_exclusivo"
              data-element-name="CTA_tag_exclusivo_hoy"
            >
              <span className="text-white text-xs sm:text-sm" style={{
                textShadow: '0 1px 4px rgba(0,0,0,0.6)'
              }}>
                Exclusivo hoy
              </span>
            </button>
          </div>
        </header>

        {/* SECTION_hero - Main content area */}
        <main 
          ref={heroRef}
          className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8"
          data-clarity-region="hero"
        >
          <div className="max-w-4xl mx-auto w-full text-center">

            {/* SECTION_headline - Main headline with gradient */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 sm:mb-8"
              data-clarity-region="headline"
            >
              <h1 className="text-white leading-tight mb-3 sm:mb-4">
                <span className="block text-3xl sm:text-5xl lg:text-6xl mb-2 sm:mb-3" style={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.7)',
                  letterSpacing: '-0.02em'
                }}>Acceso especial disponible</span>
                <span className="block text-4xl sm:text-6xl lg:text-7xl" style={{
                  background: 'linear-gradient(135deg, #A3F73B 0%, #27C7E6 50%, #93FB58 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(79,212,235,0.35))',
                  letterSpacing: '-0.02em'
                }}>
                  para usuarios de Chile hoy
                </span>
              </h1>
              <p className="text-white/95 text-base sm:text-xl lg:text-2xl max-w-2xl mx-auto px-4 mt-4 sm:mt-5" style={{
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                lineHeight: '1.4'
              }}>
                Explora una experiencia exclusiva disponible por tiempo limitado.
              </p>
              
              {/* Single game hint - the strongest one */}
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={prefersReducedMotion ? false : { opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-[#A3F73B] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 mt-4 sm:mt-5 flex items-center justify-center gap-2"
                style={{
                  textShadow: '0 0 18px rgba(163,247,59,0.6), 0 2px 10px rgba(0,0,0,0.7)',
                  fontWeight: '500'
                }}
              >
                ⭐ Incluye una dinámica interactiva tipo juego para nuevos usuarios.
              </motion.p>
            </motion.div>

            {/* EVENTS_cta_section - CTA Button section */}
            <motion.div
              ref={ctaRef}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-6 sm:mb-8"
              data-clarity-region="cta_section"
            >
              {/* Optimized button container */}
              <div className="relative mb-5 sm:mb-6">

                {/* CTA_main_continuar - Primary call-to-action button */}
                <button
                  ref={buttonRef}
                  onClick={handleCTAClick}
                  onMouseEnter={() => handleCTAHoverStart('main_continuar')}
                  onMouseLeave={() => handleCTAHoverEnd('main_continuar')}
                  className="button-cta px-14 sm:px-28 lg:px-36 py-5 sm:py-7 lg:py-8 rounded-2xl sm:rounded-3xl text-xl sm:text-3xl lg:text-4xl w-full sm:w-auto max-w-3xl mx-auto block overflow-hidden cursor-pointer touch-manipulation text-[#0C0E12] relative"
                  style={{ fontWeight: '600' }}
                  data-clarity-click="cta_main"
                  data-element-name="CTA_main_continuar"
                  data-clarity-track-rage="true"
                >
                  <span className="relative flex items-center justify-center gap-3 sm:gap-4" style={{
                    textShadow: '0 3px 6px rgba(255,255,255,0.9), 0 -1px 3px rgba(0,0,0,0.5)',
                    zIndex: 2
                  }}>
                    <span className="tracking-wide">Continuar</span>
                    <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11" style={{
                      filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))'
                    }} />
                  </span>
                </button>
              </div>
              
              {/* SECTION_social_proof - Trust message */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={prefersReducedMotion ? false : { opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-4 sm:mb-5"
                data-clarity-region="social_proof"
              >
                <p className="text-white/85 text-sm sm:text-base" style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)'
                }}>
                  <span className="text-[#27C7E6]">★</span> Más de 5.000 usuarios en Chile ya accedieron hoy.
                </p>
              </motion.div>

              {/* SECTION_benefits - Benefit line */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={prefersReducedMotion ? false : { opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center justify-center"
                data-clarity-region="benefits"
              >
                <div className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-white/75 text-xs sm:text-sm" style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(39, 199, 230, 0.2)',
                  backdropFilter: 'blur(14px)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  maxWidth: '85%',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}>
                  Acceso inmediato · Sin registro previo · Contenido interactivo
                </div>
              </motion.div>
            </motion.div>

          </div>
        </main>

        {/* SECTION_footer - Compliance footer */}
        <footer 
          className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
          data-clarity-region="footer"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Auto-redirect indicator */}
            <div className="mb-3 sm:mb-4">
              <p className="text-[#27C7E6] text-xs sm:text-sm flex items-center justify-center gap-2" style={{
                textShadow: '0 0 12px rgba(39, 199, 230, 0.5)'
              }}>
                <span className="inline-block w-2 h-2 bg-[#27C7E6] rounded-full animate-pulse"></span>
                Redirigiendo automáticamente...
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 text-white/50 text-[10px] sm:text-xs">
              <div>18+</div>
              <div className="w-1 h-1 rounded-full bg-white/30"></div>
              <div>Entretenimiento</div>
              <div className="w-1 h-1 rounded-full bg-white/30"></div>
              <div>Uso responsable</div>
            </div>
            <p className="text-white/40 text-[9px] sm:text-[11px] max-w-2xl mx-auto">
              Contenido de entretenimiento para adultos (18+). No garantiza ningún resultado.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
