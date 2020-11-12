import * as courseApi from '../../api/courseApi';
import { CourseData } from '../../dataTypes';
import { Action, actionTypes } from './actionTypes';

export interface CourseAction extends Action {
    course?: CourseData;
    courses?: Array<CourseData>;
}

export function loadCoursesSuccess(courses: Array<CourseData>): CourseAction {
    return {type: actionTypes.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(courses: Array<CourseData>): CourseAction {
    return {type: actionTypes.CREATE_COURSE_SUCCESS, courses};
}

export function updateCourseSuccess(courses: Array<CourseData>): CourseAction {
    return {type: actionTypes.UPDATE_COURSE_SUCCESS, courses};
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses))
            })
            .catch(err => {
                throw err;
            })
    }
}

export function saveCourse(course: CourseData) {
    return function(dispatch, getState) {
        return courseApi.saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {throw error});
    }
}
