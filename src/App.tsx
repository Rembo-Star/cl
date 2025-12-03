import { useEffect } from 'react';
import { PrelandingPage } from './components/PrelandingPage';
import { initClarity, trackPageView } from './utils/clarity';

export default function App() {
  useEffect(() => {
    // Set page title
    document.title = 'Welcome';
    
    // Initialize MS Clarity Analytics
    initClarity();
    
    // Optimize for mobile devices
    const viewport = document.querySelector('meta[name=\"viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }

    // Track prelanding page view
    trackPageView('prelanding');
  }, []);

  return <PrelandingPage />;
}
