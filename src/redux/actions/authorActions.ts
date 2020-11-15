import * as authorApi from '../../api/authorApi';
import { AuthorData } from '../../dataTypes';
import { Action, actionTypes } from './actionTypes';
import { apiCallError, beginApiCall } from './apiStatusActions';

export interface AuthorAction extends Action {
    author?: AuthorData;
    authors?: Array<AuthorData>;
}

export function loadAuthorsSuccess( authors: Array<AuthorData> ): AuthorAction {
    return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

export function createAuthorSuccess( author: AuthorData ): AuthorAction {
    return { type: actionTypes.CREATE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess( author: AuthorData ): AuthorAction {
    return { type: actionTypes.UPDATE_AUTHOR_SUCCESS, author };
}

export function loadAuthors() {
    return function ( dispatch ) {
        dispatch( beginApiCall() );
        return authorApi.getAuthors()
            .then( courses => {
                dispatch( loadAuthorsSuccess( courses ) );
            } )
            .catch( err => {
                dispatch( apiCallError() );
                throw err;
            } );
    };
}

export function saveAuthor( author: AuthorData ) {
    return function ( dispatch, getState ) {
        dispatch( beginApiCall() );
        return authorApi.saveAuthor( author )
            .then( savedAuthor => {
                author.id
                    ? dispatch( updateAuthorSuccess( savedAuthor ) )
                    : dispatch( createAuthorSuccess( savedAuthor ) );
            } )
            .catch( error => {
                dispatch( apiCallError() );
                throw error;
            } );
    };
}
