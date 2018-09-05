import { usersConstant } from "../constants";
import { usersService } from "../services";
export const usersAction={
    getUserList,
    addUser,
}

function addUser(user){
    return dispatch=>{
        dispatch(request());
        usersService.addUser(user)
            .then(
                users    => dispatch(success(users)),
                error   => dispatch(failure(error))
        )
    }
    function request() { return {type: usersConstant.ADD_USER_REQUEST}};
    function success(users){ return { type: usersConstant.ADD_USER_SUCCESS,users}};
    function failure(error){ return { type: usersConstant.ADD_USER_FAILURE,error}}; 
    
}

function getUserList(page){
    return dispatch=>{
        dispatch(request());
        usersService.getUserList(page)
            .then(
                users    => dispatch(success(users)),
                error   => dispatch(failure(error))
        )
    }
    function request() { return {type: usersConstant.USER_LIST_REQUEST}};
    function success(users){ return { type: usersConstant.USER_LIST_SUCCESS,users}};
    function failure(error){ return { type: usersConstant.USER_LIST_FAILURE,error}}; 
    
}