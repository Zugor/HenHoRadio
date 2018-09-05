import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Header, HeaderVisible, HeaderMobile } from "../sections";
import { userActions } from "../actions";

class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pass: '',
            repass: '',
            vaildPass: {status: true,message: ''},
            OTPIsExist: {status: true,message: ''},
            vaildOTP: false,
            done : false,
            otp:'',

        }
        this.handleCheckOTP=this.handleCheckOTP.bind(this);
        this.handleChangeOTP=this.handleChangeOTP.bind(this);

        this.handleNewPassWord=this.handleNewPassWord.bind(this);
        this.handleChangePass=this.handleChangePass.bind(this);
        this.handleChangeRePass=this.handleChangeRePass.bind(this);
    }
    newPassResult(err,e){
        if(e.status){
            this.setState({
                done: true,
                vaildPass: {status: true,message: ''},
            })
        }else{
            this.setState({
                vaildPass: {status: false,message: e.error},
            })
        }
    }
    handleNewPassWord(e){
        e.preventDefault();
        const { dispatch, match } = this.props;
        const {pass, repass, otp} = this.state;
        const phone = match.params.phone;
        if(pass && repass)
            if(pass === repass){
                if(pass.length > 5){
                    this.setState({
                        vaildPass: {status: true,message: ''},
                    })
                    dispatch(userActions.newPasswordForget(pass, repass, phone, otp, (err,e)=>this.newPassResult(err,e)));
                }
                else
                    this.setState({
                        vaildPass: {status: false,message: 'Mật khẩu phải có độ dài tứ 6 ký tự trở lên'},
                    })
            }
            else
                this.setState({
                    vaildPass: {status: false,message: 'Mật khẩu nhập lại không giống nhau!'},
                })
        else
            this.setState({
                vaildPass: {status: false,message: 'Vui lòng nhập mật khẩu mới.'},
            })
    }
    handleChangePass(e){
        this.setState({pass: e.target.value});
    }
    handleChangeRePass(e){
        this.setState({repass: e.target.value});
    }
    checkOTP(err,e){
        
        if(e.status){
            this.setState({
                vaildOTP: true,
                OTPIsExist: {status: true,message: ''},
            })
        }else{
            this.setState({
                OTPIsExist: {status: false,message: e.error},
            })
        }
    }
    handleCheckOTP(e){
        e.preventDefault();
        const { dispatch, match } = this.props;
        const phone = match.params.phone;
        const otp   = this.state.otp;
        dispatch(userActions.CheckOTPforgetpassword(phone, otp, (err,e)=>this.checkOTP(err,e)));
    }
    handleChangeOTP(e){
        this.setState({otp: e.target.value});
    }
    render(){
        const { authentication, match } = this.props;
        if(authentication.loggedIn || !match.params.phone || match.params.phone.length < 10 || match.params.phone.length > 11){
            return <Redirect to={"/"} />
        }
        const phone = match.params.phone;
        return (
        <div className="tw3-wrapper">
            <Header />
            <HeaderVisible />
            <HeaderMobile />
            <div className="tw3-content">
                <div className="tw3-container">
                    <div className="tw3-box">
                        <p>
                            <a href="/" className="swap">
                                <i className="ficonArrowLeft"></i>
                                <span>Quay lại</span>
                            </a>
                        </p>
                        {this.state.done &&
                        <div>
                            <h1>Hoàn thành!</h1>
                            <p>Mật khẩu mới cho số điện thoại {phone} đã được cập nhật!</p>
                        </div>
                        }
                        {!this.state.vaildOTP && !this.state.done &&
                        <div>
                            <h1>Nhập mã OTP</h1>
                            <p>Nhập mã OTP được gửi tới số điện thoại {phone}</p>
                            <form onSubmit={this.handleCheckOTP}>
                                <div className="tw3-form--stacked">
                                    <div className={this.state.OTPIsExist.status ? "tw3-form__row" : "tw3-form__row jsFieldRow tw3-form__row--error"}>
                                        <div className="tw3-form__row__label">
                                            <label htmlFor="otp">Mã OTP <span className="text--red">*</span></label>
                                        </div>
                                        <div className="tw3-form__row__input">
                                            <input className="tw3-text" type="text" value={this.state.otp} onChange={this.handleChangeOTP} maxLength="10" id="otp" name="otp" autoComplete="off"/>
                                        </div>
                                        { !this.state.OTPIsExist.status &&
                                            <div className="tw3-form__row__error jsRowError">{this.state.OTPIsExist.message}</div>
                                        }
                                    </div>
                                    <div className="tw3-form__row">
                                        <div className="tw3-form__row__input">
                                            <input type="submit" className="tw3-button tw3-button--blue tw3-button--rounded" value="Xác nhận"/><br/>
                                            <p className="text--smaller text--subtle"><span className="text--red">*</span>Mục bắt buộc.</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        }
                        {this.state.vaildOTP && !this.state.done &&
                        <div>
                            <h1>Mật khẩu mới</h1>
                            <p>Nhập mật khẩu mới.</p>
                            <form onSubmit={this.handleNewPassWord}>
                                <div className="tw3-form--stacked">
                                    <div className={this.state.vaildPass.status ? "tw3-form__row" : "tw3-form__row jsFieldRow tw3-form__row--error"}>
                                        <div className="tw3-form__row__label">
                                            <label htmlFor="newPassword">Mật khẩu mới <span className="text--red">*</span></label>
                                        </div>
                                        <div className="tw3-form__row__input">
                                            <input className="tw3-text" type="password" value={this.state.pass} onChange={this.handleChangePass} maxLength="80" id="newPassword" name="newPassword" autoComplete="off"/>
                                        </div>
                                    </div>
                                    <div className={this.state.vaildPass.status ? "tw3-form__row" : "tw3-form__row jsFieldRow tw3-form__row--error"}>
                                        <div className="tw3-form__row__label">
                                            <label htmlFor="newPasswordRepeat">Lặp lại mật khẩu <span className="text--red">*</span></label>
                                        </div>
                                        <div className="tw3-form__row__input">
                                            <input className="tw3-text" type="password" value={this.state.repass} onChange={this.handleChangeRePass} maxLength="80" id="newPasswordRepeat" name="newPasswordRepeat" autoComplete="off"/>
                                        </div>
                                        { !this.state.vaildPass.status &&
                                            <div className="tw3-form__row__error jsRowError">{this.state.vaildPass.message}</div>
                                        }
                                    </div>
                                    <div className="tw3-form__row">
                                        <div className="tw3-form__row__input">
                                            <input type="submit" className="tw3-button tw3-button--blue tw3-button--rounded" value="Lưu mật khẩu mới"/>
                                            <p className="text--smaller text--subtle"><span className="text--red">*</span>Mục bắt buộc.</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        )
        
    }
}
function mapStateToProps(state){
    const {authentication} = state;
    return {authentication};
}
const connectedHomePage=connect(mapStateToProps)(ForgotPassword);
export { connectedHomePage as ForgotPassword } 