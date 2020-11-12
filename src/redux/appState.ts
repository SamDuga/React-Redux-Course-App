import { AuthorData, CourseData } from '../dataTypes';

export interface AppState {
    courses: Array<CourseData>;
    authors: Array<AuthorData>;
}
