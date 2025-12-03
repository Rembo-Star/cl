// MS Clarity Analytics Helper
// Project: Chilean Casino Prelanding
// Clarity ID: ufq3clrf2z

// Declare clarity function for TypeScript
declare global {
  interface Window {
    clarity?: (action: string, key: string, value: any) => void;
  }
}

/**
 * Initialize MS Clarity tracking
 * Call this once in App.tsx
 */
export function initClarity(): void {
  if (typeof window === 'undefined') return;
  
  // Prevent double initialization
  if (window.clarity) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/ufq3clrf2z";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ufq3clrf2z");
  `;
  
  document.head.appendChild(script);
  
  console.log('✅ MS Clarity initialized');
}

/**
 * Track custom event in Clarity
 * @param eventName - Event identifier (e.g., "cta_main_click")
 * @param value - Event value (usually true or metadata object)
 */
export function trackClarityEvent(eventName: string, value: any = true): void {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', eventName, value);
    console.log(`📊 Clarity event: ${eventName}`, value);
  }
}

/**
 * Track page view
 * @param pageName - Page identifier
 */
export function trackPageView(pageName: string): void {
  trackClarityEvent('page_view', pageName);
}

/**
 * Track scroll depth
 * @param section - Section identifier
 * @param depth - Percentage scrolled
 */
export function trackScrollDepth(section: string, depth: number): void {
  trackClarityEvent(`scroll_${section}`, depth);
}

/**
 * Track CTA click
 * @param ctaName - CTA identifier
 */
export function trackCTAClick(ctaName: string): void {
  trackClarityEvent(`cta_${ctaName}_click`, true);
}

/**
 * Track hover event (desktop)
 * @param elementName - Element identifier
 */
export function trackHover(elementName: string): void {
  trackClarityEvent(`hover_${elementName}`, true);
}

/**
 * Track rage click (multiple clicks in short time)
 * @param elementName - Element identifier
 */
export function trackRageClick(elementName: string): void {
  trackClarityEvent(`rage_click_${elementName}`, true);
}

/**
 * Track modal/popup open
 * @param modalName - Modal identifier
 */
export function trackModalOpen(modalName: string): void {
  trackClarityEvent(`modal_${modalName}_open`, true);
}

/**
 * Track form interaction
 * @param formName - Form identifier
 * @param action - Action type (start, complete, abandon)
 */
export function trackFormInteraction(formName: string, action: 'start' | 'complete' | 'abandon'): void {
  trackClarityEvent(`form_${formName}_${action}`, true);
}

/**
 * Track redirect to main offer
 * @param source - Source of redirect (e.g., 'auto_redirect', 'page_click', 'button_click')
 */
export function trackRedirectToOffer(source: string = 'unknown'): void {
  trackClarityEvent(`redirect_to_offer_${source}`, {
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  });
}

/**
 * Track user hesitation (long hover without click)
 * @param elementName - Element identifier
 * @param duration - Hover duration in ms
 */
export function trackHesitation(elementName: string, duration: number): void {
  trackClarityEvent(`hesitation_${elementName}`, duration);
}

/**
 * Track exit intent
 */
export function trackExitIntent(): void {
  trackClarityEvent('exit_intent', true);
}
