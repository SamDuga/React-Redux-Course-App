import { Action, actionTypes } from './actionTypes';

export interface ApiStatusAction extends Action {
    apiCallsInProgress?: number;
}

export function beginApiCall() {
    return { type: actionTypes.BEGIN_API_CALL };
}

export function apiCallError() {
    return { type: actionTypes.API_CALL_ERROR };
}
