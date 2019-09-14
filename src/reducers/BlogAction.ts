import { actionTypes } from "./actionTypes";
import { Action } from "redux";
import { IDictionary } from "./IDictionary";

export interface BlogAction extends Action<actionTypes> {
    data?: IDictionary<any>;
    error?: Error;
    message?: string;
}

