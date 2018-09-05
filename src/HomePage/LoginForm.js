import React from "react";
import {connect} from "react-redux";
import { pageActions,modalActions,userActions } from "../actions";
import {Redirect } from "react-router-dom";
import { ForgetPasswordModal,LeftPanelLogin } from "./index";

const MESSAGE=require('../data/formValid').loginDesktop
class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            submitted: false,
            usernameIsValid: {status: true, message: ''},
            passwordIsValid: {status: true, message: ''},
        }
        this.handleHomePageSwitch=this.handleHomePageSwitch.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.onInputUsernameBlur=this.onInputUsernameBlur.bind(this);
        this.onInputPasswordBlur=this.onInputPasswordBlur.bind(this);
        this.handleForgetPassword=this.handleForgetPassword.bind(this);
        
    }
    handleHomePageSwitch(view){
        const {dispatch} = this.props;
        dispatch(pageActions.switchView('register'));
    }
    onChange(e){
        const {name,value}=e.target;
        this.setState({
            [name]: value
        })
    }
    handleForgetPassword(){
        const { dispatch } = this.props;
        dispatch(modalActions.openModal({ className: 'tw3-modal--forgotPw  tw3-modal--small  tw3-modal--padding--slack ',content:<ForgetPasswordModal />}));
    }
    onInputUsernameBlur(){
         let _usernameIsValid={status: true, message:''};
        const { username }= this.state; 
        if(username.length === 0){
            _usernameIsValid={status: false, message: MESSAGE.Username.required};
        }
        this.setState({
            usernameIsValid: _usernameIsValid
        })
    }
    onInputPasswordBlur(){
        let _passwordIsValid={status: true, message:''};
        const { password }= this.state;
        if(password.length === 0 ){
            _passwordIsValid={status: false, message : MESSAGE.Password.required}
        }
        this.setState({
            passwordIsValid: _passwordIsValid
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({submitted: true});
        const { username,password }= this.state;
        let isValid=true;
        let _usernameIsValid={status: true, message:''},_passwordIsValid={status: true, message:''};
        
        if(username.length === 0){
            _usernameIsValid={status: false, message: MESSAGE.Username.required};
            isValid=false;
        }
        if(password.length === 0 ){
            _passwordIsValid={status: false, message : MESSAGE.Password.required}
            isValid=false;
        }
        if(!isValid){
            let valid={
                usernameIsValid: _usernameIsValid,
                passwordIsValid: _passwordIsValid
            }
            this.setState({
                ...valid
            })
        }else{
            const { dispatch }= this.props;
            if(username && password){
                dispatch(userActions.login(username,password,''));
            }
        }
    }
    
    compoentDidMount(){
        const { dispatch } = this.props;
        //dispatch()
    }
    render(){
        //console.log(this.state);
        const { authentication , alert} = this.props;
        const { loggingIn }  = authentication;
        const { message }   = alert;
        if(authentication.loggedIn){
            return (<Redirect to="/" />)
        }
        return (
    <div className="homepageContainer__content__form homepageContainer__content__form--intro loginContainer jsLoginContainer">
      <LeftPanelLogin />
      <div className="tw3-pane tw3-pane--right">
         <div className="tw3-pane__content">
            <div className="divider hor full white mb--default">
               <span>Đăng nhập bằng số điện thoại</span>
            </div>
            <form action="/?login=0" method="post" onSubmit={this.handleSubmit}>
               <div className="tw3-form--stacked">
                { message &&
                    <div className="tw3-form__row jsFormRow tw3-form__row--error">
                        <div className="tw3-form__row__error">
                                {message}
                        </div>
                    </div>
               }
                  <div className={(this.state.usernameIsValid.status) ? "tw3-form__row jsFormRow" : "tw3-form__row jsFormRow tw3-form__row--error" }>
                     <div className="tw3-form__row__label">
                        <label>
                        <span>Số điện thoại</span>
                        </label>
                     </div>
                     <div className="tw3-form__row__input">
                        <input type="number" name="username" onChange={this.onChange}value={this.state.username}  onBlur={this.onInputUsernameBlur} className="tw3-text jsLoginInputEmail" />
                     </div>
                    { !this.state.usernameIsValid.status &&
                        <div className="tw3-form__row__error">
                            {this.state.usernameIsValid.message}
                         </div>
                    }
                     
                  </div>
                  <div className={(this.state.passwordIsValid.status) ? "tw3-form__row jsFormRow" : "tw3-form__row jsFormRow tw3-form__row--error" }>
                     <div className="tw3-form__row__label">
                        <label>
                        <span className="formLarge__item__label">Mật khẩu</span>
                        </label>
                     </div>
                     <div className="tw3-form__row__input">
                        <input type="password" name="password" onChange={this.onChange} className="tw3-text jsLoginInputPassword"  onBlur={this.onInputPasswordBlur} value={this.state.password} />
                     </div>
                        { !this.state.passwordIsValid.status &&
                            <div className="tw3-form__row__error">
                                <span id="error-default" className="error--label">
                                {this.state.passwordIsValid.message}
                                </span>
                             </div>
                        }
                     
                  </div>
                  <div className="tw3-form__row">
                    {loggingIn &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }    
                     <input type="submit" className="tw3-button tw3-button--green tw3-button--full tw3-button--xlarge tw3-button--rounded" value="ĐĂNG NHẬP" />
                    
                  </div>
                  <div className="tw3-form__row">
                     <div className="form__extraOptions">
                        <p className="m0">
                           <a href="/#login?view=forgot" onClick={this.handleForgetPassword} className="jsForgetPassword">Quên mật khẩu?</a>
                        </p>
                        <p>
                           Chưa là thành viên? <a href="javascript://" className="jsHomepageSwitch" onClick={()=>{this.handleHomePageSwitch('register')}}>Đăng ký tại đây</a>
                        </p>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
        )
    }
}
function mapStateToProps(state){
    const { authentication,alert } = state;                       
    return { authentication, alert};
}
const connected = connect(mapStateToProps)(LoginForm);
export { connected as LoginForm}