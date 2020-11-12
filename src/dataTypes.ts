export interface CourseData {
    id: number;
    title: string;
    slug: string;
    authorId: number;
    category: string;
}

export interface AuthorData {
    id: number;
    name: string;
}

export const EmptyCourse: CourseData = {
    id: 0,
    title: '',
    slug: '',
    authorId: 0,
    category: ''
}

export const EmptyAuthor: AuthorData = {
    id: 0,
    name: ''
}
