import { EMPLOYEE_LIST_REQUEST, EMPLOYEE_LIST_SUCCESS, EMPLOYEE_LIST_FAIL, EMPLOYEE_DETAILS_FAIL, EMPLOYEE_DETAILS_REQUEST, EMPLOYEE_DETAILS_SUCCESS, EMPLOYEE_DELETE_FAIL, EMPLOYEE_DELETE_REQUEST, EMPLOYEE_DELETE_SUCCESS, EMPLOYEE_UPDATE_REQUEST, EMPLOYEE_UPDATE_SUCCESS, EMPLOYEE_UPDATE_FAIL, EMPLOYEE_UPDATE_RESET, EMPLOYEE_ADD_REQUEST, EMPLOYEE_ADD_SUCCESS, EMPLOYEE_ADD_FAIL, EMPLOYEE_ADD_RESET, EMPLOYEE_SEARCH_REQUEST, EMPLOYEE_SEARCH_SUCCESS, EMPLOYEE_SEARCH_FAIL } from '../constants/employeeconstants';

export const employeelistReducer = (state = { employees: [] }, action) => {
    switch (action.type) {
        case EMPLOYEE_LIST_REQUEST:
            return { loading: true, employees: [] };
        case EMPLOYEE_LIST_SUCCESS:
            return { loading: false, employees: action.payload };
        case EMPLOYEE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const employeedetailsReducer = (state = { employee: {} }, action) => {
    switch (action.type) {
        case EMPLOYEE_DETAILS_REQUEST:
            return { loading: true, ...state };
        case EMPLOYEE_DETAILS_SUCCESS:
            return { loading: false, employee: action.payload };
        case EMPLOYEE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteemployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case EMPLOYEE_DELETE_REQUEST:
            return { loading: true };
        case EMPLOYEE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case EMPLOYEE_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const updateemployeeReducer = (state = { employee: {} }, action) => {
    switch (action.type) {
        case EMPLOYEE_UPDATE_REQUEST:
            return { loading: true };
        case EMPLOYEE_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case EMPLOYEE_UPDATE_FAIL:
            return { loading: false, success: false, error: action.payload };
        case EMPLOYEE_UPDATE_RESET:
            return { employee: {} };
        default:
            return state;
    }
};

export const addemployeeReducer = (state = { employee: {} }, action) => {
    switch (action.type) {
        case EMPLOYEE_ADD_REQUEST:
            return { loading: true };
        case EMPLOYEE_ADD_SUCCESS:
            return { loading: false, success: true, employee: action.payload };
        case EMPLOYEE_ADD_FAIL:
            return { loading: false, success: false, error: action.payload };
        case EMPLOYEE_ADD_RESET:
            return { employee: {} };
        default:
            return state;
    }
};

export const employeesearchReducer = (state = { employees: [] }, action) => {
    switch (action.type) {
        case EMPLOYEE_SEARCH_REQUEST:
            return { loading: true, employees: [] };
        case EMPLOYEE_SEARCH_SUCCESS:
            return { loading: false, success: true, employees: action.payload };
        case EMPLOYEE_SEARCH_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
