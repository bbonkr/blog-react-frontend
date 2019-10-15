export declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        gtag: (action: string, id: string, {}) => void;
    }
}
