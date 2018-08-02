import { paymentConstants } from "../constants";

export function payment(state={},action){
    
    switch(action.type){
        case paymentConstants.CHECK_SENT_OTP_REQUEST:
            return {
                loading: true
            }
        case paymentConstants.CHECK_OTP_VERIFY_MOBILE_REQUEST:
            return {
                loading: true
            }

        case paymentConstants.CHECK_SENT_OTP_SUCCESS:
            return {
                data: action.payment
            }
        case paymentConstants.CHECK_OTP_VERIFY_MOBILE_SUCCESS:
            return {
                data: action.payment
            }

        case paymentConstants.CHECK_SENT_OTP_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }
        case paymentConstants.CHECK_OTP_VERIFY_MOBILE_FAILURE:
            //console.log(state);
            return {
                error: action.error
            }

        default:
            return state;
    }
    
}