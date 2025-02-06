import { useEffect } from 'react';

const useGoogleAnalytics = () => {
  useEffect(() => {
    // Load GA script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-029M7KP0YX';

    // Initialize GA
    const script2 = document.createElement('script');
    script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-029M7KP0YX');
    `;

    // Append scripts
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    // Cleanup
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);
};

export default useGoogleAnalytics;