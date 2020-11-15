import React from 'react';
import TextInput from '../common/TextInput';
import { AuthorData, CourseData } from '../../dataTypes';
import SelectInput from '../common/SelectInput';

interface CourseFormProps {
    errors;
    course: CourseData;
    authors: Array<AuthorData>;
    saving: boolean;
    handleChange( event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> );
    handleSubmit( event: React.FormEvent );
}

export default function CourseForm( props: CourseFormProps ) {
    const values: Array<{ key: string, value: string; }> = [];
    for ( const author of props.authors ) {
        values.push( { key: author.id.toString(), value: author.name } );
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <h2>Courses</h2>
            <h3>{props.course.id ? 'Edit' : 'Add'} Course</h3>

            {props.errors.onSave &&
                <div className='alert alert-danger' role='alert'>
                    {props.errors.onSave}
                </div>
            }

            <TextInput id='title' name='title' value={props.course.title} label='Course Title' error={props.errors.title} onChange={props.handleChange} />

            <SelectInput id='authorId' label='Author' name='authorId' options={values} value={props.course.authorId.toString()} onChange={props.handleChange} error={props.errors.authorId?.toString()} />

            <TextInput id='category' name='category' value={props.course.category} label='Category' error={props.errors.category} onChange={props.handleChange} />

            <button disabled={props.saving} type='submit' className="btn btn-primary">{props.saving ? 'Saving...' : 'Save Course'}</button>
        </form>
    );
}
