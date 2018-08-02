import React from "react";
import { connect } from "react-redux";
import { modalActions, paymentActions, userActions } from "../actions";

class PaymentMobile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error   : null,
            phone   : null,
            otp     : '',
        }
        this.handleCheckSubmit = this.handleCheckSubmit.bind(this);
        this.handleOTPSubmit = this.handleOTPSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal(){
        const { authentication, dispatch }=this.props;
        if(authentication.loggedIn) dispatch(userActions.getUserById(authentication.user.user_id));
        dispatch(modalActions.closeModal());
    }
    handleOTPSubmit(event) {
        event.preventDefault();
        const { authentication, dispatch } = this.props;
        var otp = event.target.otp.value;
        
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';

        dispatch(paymentActions.checkOTPverifyMobile(user_id, this.state.phone, otp));
        this.setState({otp: ''});
    }
    handleCheckSubmit(event) {
        event.preventDefault();
        const { authentication, dispatch } = this.props;
        var phone_number = event.target.phone_number.value;
        this.setState({phone: phone_number});
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';
        
        dispatch(paymentActions.checkSentOTP(user_id, phone_number));
    }
    render(){
        var {payment} = this.props;
        var _data ={
            error          : this.state.error,
        }
        return(
<div className="jsPaymentForm">
    <div>
        <div className={`tw3-modal--payments__error jsGeneralError ${ payment && payment.data && payment.data.results.error ? '' : 'hide'}`}>
            <i className="tw3-iconWarning tw3-iconRed tw3-iconMedium left mr--compact"></i>
            <div className="oh">
            {payment && payment.data && payment.data.results.error ? payment.data.results.message : null}
            </div>
        </div>
        <div className="payment-area step-userdata" id="main">
            <div className='msisdn-form clear' style={ payment && payment.data && !payment.data.results.error && payment.data.results.message ? {} : {display : 'none'} }>
                <div className="msisdn-field-with-prefix">
                    <div>
                        <div className="msisdn-input">
                        <h2>{payment && payment.data && !payment.data.results.error && payment.data.results.message ? payment.data.results.message : null}</h2>
                        </div>
                    </div>
                </div>
                <div className="msisdn-action">
                    <input className="msisdn-submit button" onClick={this.closeModal} type="button" defaultValue="Xong"/>
                </div>
            </div>
            <div className={(payment && payment.data && !payment.data.results.error && payment.data.results.message) ? 'hide' : ''}>
                <h2>
                <span id="tc_id_credits_244" className="credit_amount_holder">1</span> x Tin dung - 100 cho <span id="tc_id_price_244" className="total_amount_holder"> 15&nbsp;000,00 VND </span>
                </h2>
                <p className="cost-charge">Chi phí thanh toán sẽ được tính vào hóa đơn điện thoại của bạn.</p>
                
                <form onSubmit={this.handleOTPSubmit} className={!payment || (payment && (!payment.data || payment.data.results.error)) ? 'hide' : ''}>
                    <div className="msisdn-form clear" id="phone">
                        <div className="msisdn-field-with-prefix">
                            <div>
                                <div className="msisdn-prefix">
                                    <span id="nr" className="resize-font01">OTP</span>
                                </div>
                                <div className="msisdn-input">
                                    <input className="field required" autoComplete="off" id="payment_otp" maxLength="8" name="otp" placeholder="Nhập mã OTP nhận được" required="required" size="8" title="Vui lòng điền vào số chính xác" type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className="msisdn-action">
                            <input className="msisdn-submit" type="submit" value="OK"/>
                        </div>
                    </div>
                </form>
                
                <form onSubmit={this.handleCheckSubmit} className={payment && payment.data && !payment.data.results.error ? 'hide' : ''}>
                    <div className="msisdn-form clear" id="phone">
                        <div className="msisdn-field-with-prefix">
                            <div>
                                <div className="msisdn-prefix">
                                    <span id="nr" className="resize-font01">+84</span>
                                </div>
                                <div className="msisdn-input">
                                    <input className="field required" id="payment_phone_number" maxLength="20" name="phone_number" pattern="^0?[1-9][0-9]{8,9}$" placeholder="ví dụ973427676" required="required" size="20" title="Vui lòng điền vào số chính xác" type="tel"/>
                                </div>
                            </div>
                        </div>

                        <div className="msisdn-action">
                            <input className="msisdn-submit" type="submit" value="OK"/>
                        </div>
                    </div>
                </form>
                
                <p className="rescue-code-cta">
                    <a className="js-open-rescue-entry" href="javascript:;">Hoàn tất giao dịch bằng một mã thanh toán</a>
                </p>

                <div className="operator-info" id="operators">
                    <div>
                        <img alt="Viettel" className="operator_logo" src="https://assets.fortumo.com/cd/operators/original/viettel.png"/>
                        <img alt="Mobifone" className="operator_logo" src="https://assets.fortumo.com/cd/operators/original/mobifone.png"/>
                        <img alt="Vinaphone" className="operator_logo" src="https://assets.fortumo.com/cd/operators/original/vinaphone.png"/>
                        <img alt="Vietnamobile" className="operator_logo" src="https://assets.fortumo.com/cd/operators/original/vietnamobile.png"/>
                        <img alt="Gmobile" className="operator_logo" src="https://assets.fortumo.com/cd/operators/original/gmobile.png"/>
                    </div>
                </div>

                <div className="service-info" id="company">
                    <div className="service-info">
                        <div className="help-link">
                            <a href="javascript:;"><span>Trợ giúp</span></a>
                        </div>
                        <div className="provider">
                            <span>Nhà cung cấp công cụ thanh toán</span> Twoo.com
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
        )
    }
}
function mapStateToProps(state){
    const { authentication, payment } = state;
    return { authentication, payment };
}
const connected = connect(mapStateToProps)(PaymentMobile);
export { connected as PaymentMobile }