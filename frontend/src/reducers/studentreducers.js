import { STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_REQUEST, STUDENT_DELETE_FAIL, STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_RESET, STUDENT_UPDATE_SUCCESS, STUDENT_ADD_REQUEST, STUDENT_ADD_SUCCESS, STUDENT_ADD_FAIL, STUDENT_ADD_RESET, STUDENT_SEARCH_FAIL, STUDENT_SEARCH_REQUEST, STUDENT_SEARCH_SUCCESS, STUDENT_LIST_ALL_REQUEST, STUDENT_LIST_ALL_SUCCESS, STUDENT_LIST_ALL_FAIL } from '../constants/studentconstants';

export const studentlistReducer = (state = { students: [] }, action) => {
    switch (action.type) {
        case STUDENT_LIST_REQUEST:
            return { loading: true, students: [] };
        case STUDENT_LIST_SUCCESS:
            return { loading: false, students: action.payload };
        case STUDENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const studentdetailsReducer = (state = { student: { parents: {} } }, action) => {
    switch (action.type) {
        case STUDENT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case STUDENT_DETAILS_SUCCESS:
            return { loading: false, student: action.payload };
        case STUDENT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deletestudentReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_DELETE_REQUEST:
            return { loading: true };
        case STUDENT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case STUDENT_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const updatestudentReducer = (state = { student: { parents: {} } }, action) => {
    switch (action.type) {
        case STUDENT_UPDATE_REQUEST:
            return { loading: true };
        case STUDENT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case STUDENT_UPDATE_FAIL:
            return { loading: false, success: false, error: action.payload };
        case STUDENT_UPDATE_RESET:
            return { student: { parents: {} } };
        default:
            return state;
    }
};

export const addstudentReducer = (state = { student: { parents: {} } }, action) => {
    switch (action.type) {
        case STUDENT_ADD_REQUEST:
            return { loading: true };
        case STUDENT_ADD_SUCCESS:
            return { loading: false, success: true, student: action.payload };
        case STUDENT_ADD_FAIL:
            return { loading: false, success: false, error: action.payload };
        case STUDENT_ADD_RESET:
            return { student: { parents: {} } };
        default:
            return state;
    }
};

export const studentsearchReducer = (state = { students: [] }, action) => {
    switch (action.type) {
        case STUDENT_SEARCH_REQUEST:
            return { loading: true, students: [] };
        case STUDENT_SEARCH_SUCCESS:
            return { loading: false, success: true, students: action.payload };
        case STUDENT_SEARCH_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const studentlistallReducer = (state = { students: [] }, action) => {
    switch (action.type) {
        case STUDENT_LIST_ALL_REQUEST:
            return { loading: true, students: [] };
        case STUDENT_LIST_ALL_SUCCESS:
            return { loading: false, success: true, students: action.payload };
        case STUDENT_LIST_ALL_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};