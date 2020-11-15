import React from 'react';
import { Link } from 'react-router-dom';

import { AuthorData, CourseData } from '../../dataTypes';

interface CourseListProps {
    courses: CourseData[];
    authors: AuthorData[];
    deleteCourse( course: CourseData );
}

export default function CourseList( props: CourseListProps ) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th />
                    <th>Author</th>
                    <th>Category</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {props.courses.map( course => {
                    const author = props.authors.find( x => x.id === course.authorId );
                    return (
                        <tr key={course.id}>
                            <td><Link to={'/course/' + course.slug}>{course.title}</Link></td>
                            <td><a className='btn btn-outline-info' href={'https://pluralsight.com/courses/' + course.slug}>Watch</a></td>
                            <td>{author?.name}</td>
                            <td>{course.category}</td>
                            <td>
                                <button onClick={() => props.deleteCourse( course )} className='btn btn-outline-danger'>Delete</button>
                            </td>
                        </tr> );
                } )}
            </tbody>
        </table>
    );
}
