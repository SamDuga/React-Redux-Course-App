import { combineReducers } from 'redux';
import authors from './authorReducer';
import courses from './courseReducer';
import apiCallsInProgress from './apiCallStatusReducer';

const rootReducer = combineReducers( {
    courses,
    authors,
    apiCallsInProgress
} );

export default rootReducer;
