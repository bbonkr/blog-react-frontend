import { appOptions } from '../config/appOptions';
import { IPageviewParameters } from '../@types/global';

export const trackPageView = (
    pageviewParameters: IPageviewParameters,
): void => {
    try {
        if (typeof window === 'object' && !!appOptions.googleAnalyticsTraceId) {
            const { href, pathname } = window.location;
            const { title } = window.document;

            // console.info(`page_title: ${pageviewParameters.page_title}`);
            // console.info(`page_location: ${pageviewParameters.page_location}`);
            // console.info(`page_path: ${pageviewParameters.page_path}`);

            // window.gtag('config', appOptions.googleAnalyticsTraceId, {
            //     page_title: pageviewParameters.page_title,
            //     page_location: pageviewParameters.page_location,
            //     page_path: pageviewParameters.page_path,
            // });

            // console.info(`page_title: ${title}`);
            // console.info(`page_location: ${href}`);
            // console.info(`page_path: ${pathname}`);

            window.gtag('config', appOptions.googleAnalyticsTraceId, {
                page_title: title,
                page_location: href,
                page_path: pathname,
            });
        }
    } catch (error) {
        // silence at error
    }
};
