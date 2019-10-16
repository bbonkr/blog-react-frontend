export declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        gtag: (
            action: string,
            id: string,
            pageviewsParameter: IPageviewParameters,
        ) => void;
    }
}

export interface IPageviewParameters {
    page_title?: string;
    page_location?: string;
    page_path?: string;
}
