import * as courseApi from '../../api/courseApi';
import { CourseData } from '../../dataTypes';
import { Action, actionTypes } from './actionTypes';
import { apiCallError, beginApiCall } from './apiStatusActions';

export interface CourseAction extends Action {
    course?: CourseData;
    courses?: Array<CourseData>;
}

export function loadCoursesSuccess( courses: Array<CourseData> ): CourseAction {
    return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess( courses: Array<CourseData> ): CourseAction {
    return { type: actionTypes.CREATE_COURSE_SUCCESS, courses };
}

export function updateCourseSuccess( courses: Array<CourseData> ): CourseAction {
    return { type: actionTypes.UPDATE_COURSE_SUCCESS, courses };
}

export function deleteCourseOptimistic( course: CourseData ): CourseAction {
    return { type: actionTypes.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
    return function ( dispatch ) {
        dispatch( beginApiCall() );
        return courseApi.getCourses()
            .then( courses => {
                dispatch( loadCoursesSuccess( courses ) );
            } )
            .catch( err => {
                dispatch( apiCallError() );
                throw err;
            } );
    };
}

export function saveCourse( course: CourseData ) {
    return function ( dispatch, getState ) {
        dispatch( beginApiCall() );
        return courseApi.saveCourse( course )
            .then( savedCourse => {
                course.id
                    ? dispatch( updateCourseSuccess( savedCourse ) )
                    : dispatch( createCourseSuccess( savedCourse ) );
            } )
            .catch( error => {
                dispatch( apiCallError() );
                throw error;
            } );
    };
}

export function deleteCourse( course: CourseData ) {
    return function ( dispatch ) {
        dispatch( deleteCourseOptimistic( course ) );
        return courseApi.deleteCourse( course.id );
    };
}
