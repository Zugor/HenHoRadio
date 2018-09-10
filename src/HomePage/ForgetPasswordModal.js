import React from "react";
import { connect } from "react-redux";
import { userActions } from "../actions";
const MESSAGE={
    Phone: {
        invalid : 'Vui lòng nhập số điện thoại hợp lệ.',
        require : 'Vui lòng nhập số điện thoại của bạn.',
        exist   : 'Số bạn nhập chưa đăng ký HHR. Vui lòng dùng SĐT đã đăng ký HHR để lấy Mật khẩu.'
        
    }
}
class ForgetPasswordModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            phone: '',
            phoneIsValid: {status: true,message: ''},
            phoneIsExist: false,
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onBlur=this.onBlur.bind(this);
        
    }
    onChange(e){
        const { name ,value} =e.target;
        this.setState({
            [name]: value
        })
    }
    onBlur(){
        const { dispatch } = this.props;
        if(this.state.phone && this.state.phone.length >= 9 &&  this.state.phone.length <=11){
            dispatch(userActions.getPhone(this.state.phone,(err,e)=>this.checkphone(err,e)));
        }else{
            this.setState({
                phoneIsValid: {status: false, message: MESSAGE.Phone.invalid}
            })
        }
    }
    checkphone(err,e){
        //console.log(e);
        if(e.status){
                    this.setState({
                        phoneIsExist: true,
                        phoneIsValid: {status: true,message: ''},
                    })
        }else{
            this.setState({
                        phoneIsExist: false,
                        phoneIsValid: {status: false,message: MESSAGE.Phone.exist},
                    })
        }
    }
    handleSubmit(e){
        e.preventDefault();
        const { dispatch } = this.props;
        const { phoneIsValid,phone, phoneIsExist}= this.state;
        let _phone={status: true,message: ''};
        let isValid=true;
        //console.log(phoneIsExist);
        if(phone.length == 0){
            _phone={status: false,message: MESSAGE.Phone.require};
            isValid=false;
        }else if(!phoneIsExist){
            _phone= {status: false,message: MESSAGE.Phone.exist}
            isValid=false;
        }

        if(!isValid){
            this.setState({
                phoneIsValid: _phone,
            })
        }else{
            dispatch(userActions.forgetPassword(phone));
            document.location.href = '/forgotpassword/'+phone;
        }
        console.log(phoneIsExist, isValid);
        
    }
    render(){
        const { users } = this.props;
        
        return(
        <div className="tw3-modal__content__header">
        <h4>Quên mật khẩu?</h4>
        <p className="text--subtle text--smaller">
        Để lấy mật khẩu mới, mời bạn dùng số điện thoại đã đăng ký tài khoản HHR, soạn tin nhắn theo cú pháp:
        </p>
        <p>
        <center><strong>HHR MK</strong> gửi <strong>8179</strong> <i>(1000đ/sms)</i></center>
        </p>
        <form action="/login?view=forgot" method="post" className="jsForgotForm" onSubmit={this.handleSubmit}>
            <div className="tw3-form--stacked">
                <div className={this.state.phoneIsValid.status ? "tw3-form__row" : "tw3-form__row jsFieldRow tw3-form__row--error"}>
                    <div className="tw3-form__row__label"><label htmlFor="">Số điện thoại</label></div>
                    <div className="tw3-form__row__input">
            <input className="tw3-text" type="text" name="phone" onChange={this.onChange} placeholder="Nhập số điện thoại hợp lệ" onBlur={this.onBlur} /></div>
            { !this.state.phoneIsValid.status &&
                <div className="tw3-form__row__error jsRowError">{this.state.phoneIsValid.message}</div>
            }
                    
                    
                </div>
                <div className="tw3-form__row text--center"><input type="submit" className="tw3-button tw3-button--blue tw3-button--rounded" value="Yêu cầu mật khẩu mới"/></div>
            </div>
        </form>
    </div>

        )
    }
}
function mapStateToProps(state){
    const { users } =state;
    return {users};
}
const connected=connect(mapStateToProps)(ForgetPasswordModal);
export {connected as ForgetPasswordModal}