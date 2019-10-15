import { appOptions } from '../config/appOptions';

export const trackPageView = (url: string) => {
    try {
        if (typeof window === 'object' && !!appOptions.googleAnalyticsTraceId) {
            window.gtag('config', appOptions.googleAnalyticsTraceId, {
                page_location: url,
            });
        }
    } catch (error) {
        // silence at error
    }
};
