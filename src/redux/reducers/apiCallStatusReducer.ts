/* eslint-disable indent */
import { actionTypes } from '../actions/actionTypes';
import { ApiStatusAction } from '../actions/apiStatusActions';

function actionTypeEndsInSuccess( type: string ): boolean {
    return type.substring( type.length - 8 ) === '_SUCCESS';
}

export default function apiCallStatusReducer( state = 0, action: ApiStatusAction ): number {
    if ( action.type === actionTypes.BEGIN_API_CALL ) {
        return state + 1;
    }
    else if ( actionTypeEndsInSuccess( action.type ) || action.type === actionTypes.API_CALL_ERROR ) {
        return state - 1;
    }

    return state;
}
