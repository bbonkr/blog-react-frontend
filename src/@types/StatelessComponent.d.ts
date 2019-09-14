export declare module 'react' {
    export interface FunctionComponent<P = {}> {
        getInitialProps?: (ctx: any) => Promise<P>
      }
}