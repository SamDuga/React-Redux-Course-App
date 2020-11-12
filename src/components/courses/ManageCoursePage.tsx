import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import { CourseData, EmptyCourse } from '../../dataTypes';
import { AppState } from '../../redux/appState';
import CourseForm from './CourseForm';

function ManageCoursePage( props ) {
    const [ course, setCourse ] = useState<CourseData>( props.course );
    const [ errors, setErrors ] = useState<CourseData>( EmptyCourse );

    useEffect( () => {
        if ( props.courses.length === 0 ) props.actions.loadCourses().catch( err => alert( 'loading courses failed' ) );
        else setCourse( props.course );
        if ( props.authors.length === 0 ) props.actions.loadAuthors().catch( err => alert( 'loading authors failed' ) );
    }, [ props.courses.length, props.authors.length, props.actions, props.history, props.course ] );

    function handleChange( event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) {
        const { name, value } = event.target;
        setCourse( { ...course, [ name ]: name === 'authorId' ? parseInt( value, 10 ) : value } );
    }

    function handleSubmit( event: React.FormEvent ) {
        event.preventDefault();

        if ( !formIsValid() ) return;

        props.actions.saveCourse( course )
            .then( () => {
                props.history.push( '/courses/' );
            } );
    }

    function formIsValid(): boolean {
        let _errors: any = {};

        if ( !course.title ) _errors.title = 'Title is required!';
        if ( !course.authorId ) _errors.authorId = 'Author is required!';
        if ( !course.category ) _errors.category = 'Category is required!';

        setErrors( _errors );
        return ( Object.keys( _errors ).length === 0 );
    }

    return (
        <>
            <CourseForm course={course} authors={props.authors} errors={errors} handleSubmit={handleSubmit} handleChange={handleChange} />
        </>
    );
}

function getCourseBySlug( courses: Array<CourseData>, slug: string ) {
    return courses.find( x => x.slug === slug ) || null;
}

function mapStateToProps( state: AppState, ownProps ) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug( state.courses, slug ) : EmptyCourse;
    return { courses: state.courses, authors: state.authors, course };
}

function mapDispatchToProps( dispatch ) {
    return {
        actions: bindActionCreators( Object.assign( {}, courseActions, authorActions ), dispatch )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ManageCoursePage );
