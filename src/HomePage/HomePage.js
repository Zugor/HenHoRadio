import React from "react";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LoginForm, RegisterForm,HomePageMobile, HomePageFooterLink } from "./index";
import { pageActions } from "../actions";
require('PUBLIC/css/homepage.css');

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            login: true,
            register: false,
            className: 'jsHomepage homepageLogin',
            loading: false,
        }
        this.handleHomePageSwitch=this.handleHomePageSwitch.bind(this);
    }
    handleHomePageSwitch(view){
        const { dispatch } = this.props;
        dispatch(pageActions.switchView(view));
        
    }
    componentDidMount(){
        //this.props.dispatch(userAction.All());
        //console.log();
        
        document.body.className='ltr vi default unconfirmed macintosh';
        //console.log(document.head);
        var sc = document.createElement("link");
        document.getElementsByTagName('html')[0].setAttribute('class', 'css3 flexbox notouch');
        
    }
    componentWillUnmount(){
        let head=document.head;
        let myNode = document.getElementsByTagName("link");
        //console.log(myNode[0].firstChild);
        for(var i=0 ; i< myNode.length ; i++){
            if(myNode[i].href.indexOf('homepage') > -1 ){
                myNode[i].parentNode.removeChild(myNode[i]);
            //    console.log(myNode[i]);
            }
        }
        //console.log(this._stylesheetPromises);
        
    }
    render(){
        const {register,login,className} = this.state;
        const { page }      =this.props;
            //console.log(this.state);
        
        var _register=register;
        var _login=login;
        var _className=className;
        //var view='login';
        if(page.view){
            switch(page.view){
            case 'login':
                _login=true;
                _className='jsHomepage homepageLogin'
                break;
            case 'register':
                _register=true;
                _className= 'jsHomepage homepageRegister';
                break;
            default:
                _register=register;
                _login=login;
                _className=className;
                break;
        }
        }
        return (
            <div className={_className} id="wrapper">
                <div className="tw3-homepage--abstract tw3-homepage--abstract--desktop">
                    <div className="homepageLinks homepageLinks--top">
                      <div className="homepageLinks--top__left">
                         <a href="https://www.facebook.com/ilikeTwoo" className="el--inlineBlock vam"><i className="tw3-iconCircleFacebook tw3-iconWhite tw3-iconLarge"></i></a>
                      </div>
                      <div className="homepageLinks--top__right">
                         <a href="javascript:;" className={(_login) ? "tw3-button tw3-button--orange tw3-button--rounded jsHomepageSwitch loginButton" :"tw3-button tw3-button--orange tw3-button--rounded jsHomepageSwitch loginButton slected"} onClick={()=>{this.handleHomePageSwitch('login')}}  >Đăng nhập</a>
                         <a href="javascript:;" className={(_login) ? "tw3-button tw3-button--white tw3-button--rounded jsHomepageSwitch loginButton" :"tw3-button tw3-button--white tw3-button--rounded jsHomepageSwitch loginButton slected"} onClick={()=>{this.handleHomePageSwitch('login')}} >Đăng nhập</a>
                         <a href="javascript:;" className={(_register) ? "tw3-button tw3-button--orange tw3-button--rounded jsHomepageSwitch registerButton" :"tw3-button tw3-button--orange tw3-button--rounded jsHomepageSwitch registerButton slected"} onClick={()=>{this.handleHomePageSwitch('register')}} >Đăng ký</a>
                         <a href="javascript:;" className={(_register) ? "tw3-button tw3-button--orange tw3-button--rounded jsHomepageSwitch registerButton" :"tw3-button tw3-button--white tw3-button--rounded jsHomepageSwitch registerButton slected"} onClick={()=>{this.handleHomePageSwitch('register')}} >Đăng ký</a>
                      </div>
                   </div>
                    <RegisterForm />
                    <LoginForm />         
                </div>
                <HomePageMobile />     
                <HomePageFooterLink />             
            </div>
        )
        
    }
}
function mapStateToProps(state){
    const {page} = state;
    return {page};
}
const connectedHomePage=connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage } 