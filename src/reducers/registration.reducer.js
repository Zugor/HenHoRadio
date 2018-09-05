import { userConstants } from "../constants";

export function registration(state={},action){
    switch(action.type){
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true
            };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        case userConstants.GET_PHONE_REQUEST:
            return {
                check: true
            };
        case userConstants.GET_PHONE_SUCCESS:
            return {
                phone: action.status
            };
        case userConstants.GET_PHONE_FAILURE:
            return {};
        default:
            return state;
    }
}

export function registrationWith3rd(state={},action){
    switch(action.type){
        case userConstants.LOGIN_WITH_3RD_REQUEST:
            return {
                loading: true
            };
        case userConstants.LOGIN_WITH_3RD_SUCCESS:
            return {
                user: action.user.user
            };
        case userConstants.LOGIN_WITH_3RD_FAILURE:
            return {};
        default:
            return state;
    }
}