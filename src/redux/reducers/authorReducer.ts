import { AuthorData } from '../../dataTypes';
import { actionTypes } from '../actions/actionTypes';
import { AuthorAction } from '../actions/authorActions';

export default function courseReducer(state: Array<AuthorData> = [], action: AuthorAction ): Array<AuthorData> {
    switch(action.type) {
        case actionTypes.CREATE_AUTHOR_SUCCESS:
            if(!action) return state;
            return [...state, {...action.author!}];
            case actionTypes.UPDATE_AUTHOR_SUCCESS:
                if(!action) return state;
                return state.map(author => author.id === action.author!.id ? action.author! : author)
        case actionTypes.LOAD_AUTHORS_SUCCESS:
            return action.authors!;
        default:
            return state;
    }
}
