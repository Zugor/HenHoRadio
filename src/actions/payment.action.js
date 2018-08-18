import { paymentConstants } from "../constants";
import { paymentService } from "../services";

export const paymentActions={
    checkSentOTP,
    checkOTPverifyMobile,
}
function checkSentOTP(user_id, phone){
    return dispatch=>{
        dispatch(request(user_id));
        paymentService.checkSentOTP(user_id, phone)
            .then(
                payment   =>  dispatch(success(payment)),
                error   =>  dispatch(failure(error))
        )
    }
    function request(user_id) { return { type : paymentConstants.CHECK_SENT_OTP_REQUEST, user_id }}
    function success(payment){ return { type: paymentConstants.CHECK_SENT_OTP_SUCCESS, payment }}
    function failure(error) { return { type: paymentConstants.CHECK_SENT_OTP_FAILURE, error }}
}
function checkOTPverifyMobile(user_id, phone, otp){
    return dispatch=>{
        dispatch(request(user_id));
        paymentService.checkOTPverifyMobile(user_id, phone, otp)
            .then(
                payment   =>  dispatch(success(payment)),
                error   =>  dispatch(failure(error))
        )
    }
    function request(user_id) { return { type : paymentConstants.CHECK_OTP_VERIFY_MOBILE_REQUEST, user_id }}
    function success(payment){ return { type: paymentConstants.CHECK_OTP_VERIFY_MOBILE_SUCCESS, payment }}
    function failure(error) { return { type: paymentConstants.CHECK_OTP_VERIFY_MOBILE_FAILURE, error }}
}