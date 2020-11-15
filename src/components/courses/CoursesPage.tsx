import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState } from '../../redux/appState';

import { AuthorData, CourseData } from '../../dataTypes';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import LoadSpinner from '../common/LoadSpinner';

interface CoursesPageProps {
    actions;
    courses: Array<CourseData>;
    authors: Array<AuthorData>;
    loading: boolean;
}

function CoursesPage( props: CoursesPageProps ) {

    useEffect( () => {
        if ( props.courses.length === 0 ) props.actions.loadCourses().catch( err => alert( 'loading courses failed' ) );
        if ( props.authors.length === 0 ) props.actions.loadAuthors().catch( err => alert( 'loading authors failed' ) );
    }, [ props.courses.length, props.authors.length, props.actions ] );

    function deleteCourse( id: number ): Promise<any> {
        return props.actions.deleteCourse( id );
    }

    return (
        <>
            <h2>Courses</h2>
            {props.loading
                ? <LoadSpinner />
                : <>
                    <CourseList courses={props.courses} authors={props.authors} deleteCourse={deleteCourse} />
                    <Link to='/course/' className='btn btn-primary' >Add Course</Link>
                </>
            }

        </> );
}

function mapStateToProps( state: AppState, ownProps ) {
    return { courses: state.courses, authors: state.authors, loading: state.apiCallsInProgress > 0 };
}

function mapDispatchToProps( dispatch ) {
    return {
        actions: bindActionCreators( Object.assign( {}, courseActions, authorActions ), dispatch )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CoursesPage );
