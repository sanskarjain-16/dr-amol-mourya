// src/utils/attribution.js

export function initAttributionTracking() {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source')?.toLowerCase();
  
  // If there's no utm_source, we don't overwrite existing attribution data.
  // We only set/update attribution if a valid UTM source is explicitly provided in the URL.
  if (utmSource) {
    const isMetaAd = utmSource === 'meta' || utmSource === 'facebook' || utmSource === 'instagram' || utmSource === 'fb' || utmSource === 'ig';
    
    // We strictly identify it as a META_AD if the campaign explicitly indicates paid social
    // or if utm_source specifically is set to 'meta'.
    // Otherwise, ordinary social sharing falls back to WEBSITE unless proven to be an ad.
    // However, the rule is: "If utm_source=meta (or facebook/instagram), set acquisition_source = META_AD, otherwise WEBSITE."
    // Wait, the explicit instruction was: 
    // "Only classify a visitor as META_AD when explicit campaign attribution exists. 
    // Preferred detection: utm_source=meta AND/OR an explicitly configured Meta paid-social attribution pattern."
    
    const utmMedium = urlParams.get('utm_medium')?.toLowerCase();
    
    let acquisitionSource = 'WEBSITE';
    if (utmSource === 'meta' || utmMedium === 'paid_social' || utmMedium === 'ad') {
      acquisitionSource = 'META_AD';
    }

    const attributionData = {
      acquisition_source: acquisitionSource,
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      landing_page: window.location.pathname + window.location.search,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('rgc_attribution', JSON.stringify(attributionData));
  } else if (!localStorage.getItem('rgc_attribution')) {
    // If no attribution is in the URL and we have never set it before, default to WEBSITE
    const defaultAttribution = {
      acquisition_source: 'WEBSITE',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      landing_page: window.location.pathname + window.location.search,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('rgc_attribution', JSON.stringify(defaultAttribution));
  }
}

export function getAttributionData() {
  if (typeof window === 'undefined') return null;
  
  const data = localStorage.getItem('rgc_attribution');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
  
  return {
    acquisition_source: 'WEBSITE',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    landing_page: window.location.pathname,
  };
}
