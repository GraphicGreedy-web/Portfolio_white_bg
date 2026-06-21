import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (gaMeasurementId) {
  const existingScript = document.querySelector(
    `script[data-ga-id="${gaMeasurementId}"]`
  );

  if (!existingScript) {
    const externalScript = document.createElement("script");
    externalScript.async = true;
    externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    externalScript.dataset.gaId = gaMeasurementId;
    document.head.appendChild(externalScript);

    const inlineScript = document.createElement("script");
    inlineScript.dataset.gaId = `${gaMeasurementId}-config`;
    inlineScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaMeasurementId}');
    `;
    document.head.appendChild(inlineScript);
  }
}

createRoot(document.getElementById('root')!).render(
    <App />
);
