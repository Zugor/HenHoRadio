import { usersConstant } from "../constants";
const initialState={
    users:[]
}
export function users(state=initialState,action){
    
    switch(action.type){
        case usersConstant.ADD_USER_REQUEST:
            return{
                loading: true
            }
        case usersConstant.ADD_USER_SUCCESS:
            return {
                data: action.users
            };
        case usersConstant.ADD_USER_FAILURE:
            return {
                error: action.error
            };

        case usersConstant.USER_LIST_REQUEST:
            return{
                loading: true
            }
        case usersConstant.USER_LIST_SUCCESS:
            return {
                data: action.users
            };
        case usersConstant.USER_LIST_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
    
}