export interface IAppOptions {
    title: string;
    description?: string;
    fbAdmin?: string;
    /**
     * api URL
     */
    apiBaseUrl: string;
    /**
     * Google Analytics Trace Id
     * https://analytics.google.com
     */
    googleAnalyticsTraceId?: string;
}
