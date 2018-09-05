import { modalConstants } from "../constants";
const initialState={
    modals:[]
}
export function modal(state=initialState,action){
    
    switch(action.type){
        case modalConstants.OPEN_MODAL:
            return{
                ...state,
                modals:
                state.modals.concat(action.obj)
            }
        case modalConstants.CLOSE_MODAL:
            //console.log(state);
            
            return {
                modals: (state.modals.length > 1 ) ? state.modals.splice(0,1) : [],
                //state.modals.filter(item => item.id !==action.obj.id)
            };
        default:
            return state;
    }
    
}