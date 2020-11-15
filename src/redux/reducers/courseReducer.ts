/* eslint-disable indent */
import { CourseData } from '../../dataTypes';
import { actionTypes } from '../actions/actionTypes';
import { CourseAction } from '../actions/courseActions';

export default function courseReducer( state: Array<CourseData> = [], action: CourseAction ): Array<CourseData> {
    switch ( action.type ) {
        case actionTypes.CREATE_COURSE_SUCCESS:
            if ( !action ) return state;
            return [ ...state, { ...action.course! } ];
        case actionTypes.UPDATE_COURSE_SUCCESS:
            if ( !action ) return state;
            return state.map( course => course.id === action.course!.id ? action.course! : course );
        case actionTypes.LOAD_COURSES_SUCCESS:
            return action.courses!;
        default:
            return state;
    }
}
