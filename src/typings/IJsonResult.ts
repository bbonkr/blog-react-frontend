export interface IJsonResult<T> {
    success: boolean;
    data?: T | null;
    message?: string;
}
