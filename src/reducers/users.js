import {
    USER_PAGE_LOADED,
    USER_VIEW_PAGE_LOADED,
    USER_CREATE,
    USER_EDITOR_PAGE_LOADED,
    USER_EDITOR_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case USER_PAGE_LOADED:
            return {
                ...state,
                users: action.payload.data,
                inProgress: false,
                errors: action.error ? action.payload.error : null
            };
        case USER_VIEW_PAGE_LOADED:
            return {
                ...state,
                user: action.payload.data,
                inProgress: false,
                errors: action.error ? action.payload.error : null
            };
        case USER_CREATE:
            return {
                ...state,
                user: action.payload.data,
                inProgress: false,
                errors: action.error ? action.payload.error : null,
                redirectTo: action.error ? null : '/access/user',
            };
        case USER_EDITOR_PAGE_LOADED:
            return {
                ...state,
                user: action.payload ? action.payload.data : '',
            };
        case USER_EDITOR_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }
};
