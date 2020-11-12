import React from 'react';
import TextInput from '../common/TextInput';
import { AuthorData, CourseData } from '../../dataTypes';
import SelectInput from '../common/SelectInput';

interface CourseFormProps {
    errors;
    course: CourseData;
    authors: Array<AuthorData>;
    handleChange( event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> );
    handleSubmit( event: React.FormEvent );
}

export default function CourseForm( props: CourseFormProps ) {
    const values: Array<{ key: string, value: string; }> = [];
    for ( let author of props.authors ) {
        values.push( { key: author.id.toString(), value: author.name } );
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <h2>Courses</h2>
            <h3>Manage Course</h3>
            <TextInput id='title' name='title' value={props.course.title} label='Course Title' error={props.errors.title} onChange={props.handleChange} />

            <SelectInput id='authorId' label='Author' name='authorId' options={values} value={props.course.authorId.toString()} onChange={props.handleChange} error={props.errors.authorId?.toString()} />

            <TextInput id='category' name='category' value={props.course.category} label='Category' error={props.errors.category} onChange={props.handleChange} />

            <button type='submit'>Save</button>
        </form>
    );
}
