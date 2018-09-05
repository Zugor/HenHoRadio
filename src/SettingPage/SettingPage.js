import React from "react";
import { Link, Redirect,Router,Route, Switch } from "react-router-dom";
import { history } from "../store";
import { connect } from "react-redux";
import { userActions } from "../actions";
import { Header, HeaderVisible, SmartOnBoarding, HeaderMobile } from "../sections";
import { SearchSettings, AccountSettings, ProfileBar } from "./index";

class SettingPage extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillUpdate(nextProps){
        const { location } = this.props;
        if(nextProps.history.action !=="POP" && 
           (!location.state || !location.state.modal)    
          ){
            history.location = this.props.location;
        }
    }
    componentDidMount(){
        const { authentication }=this.props;
        if(authentication.loggedIn){
            this.props.dispatch(userActions.getMemberById(this.props.authentication.user.user_id));
            this.props.dispatch(userActions.getMemberDetails(this.props.authentication.user.user_id));
        }
        document.getElementsByTagName('html')[0].setAttribute('class', 'flexbox css3 notouch');
        document.body.className='profilev4 ltr vi macintosh chrome';
    }
    render(){
        const { authentication }=this.props;
        
        if(!authentication.loggedIn){
           return  <Redirect to={ `/#login?return_url=/settings` } />
        }
        return (
            <div>
                    <Header />
                    <HeaderVisible />
                    <HeaderMobile />
                    <div className="tw3-wrapper">
                        <SmartOnBoarding/>
                        <div className="tw3-content">
                            <div className="tw3-container">
                                <div className="tw3-row">
                                    <div className="tw3-bp4-col-8 tw3-col-12">
                                        <SearchSettings/>
                                        <AccountSettings/>
                                    </div>
                                    <div className="tw3-bp3-col-4 tw3-col-hide tw3-bp4-col-show-block">
                                        <ProfileBar/>
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
    const { authentication }=state;
    return { authentication };
}
const connected=connect(mapStateToProps)(SettingPage);
export { connected as SettingPage } 