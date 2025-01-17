import React, { useEffect } from 'react';

function ElfsightWidget({ widgetId }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    script.onload = () => {
      if (window.ElfsightApp) {
        window.ElfsightApp.init();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={`elfsight-app-${widgetId}`}
      data-elfsight-app-lazy
    ></div>
  );
}

export default ElfsightWidget;
