import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { LoginPopup,RegisterPopup,Header,AdvancedSearch,RegisterMember,MemberActive, Banner, HeaderVisible, HeaderMobile } from "../sections";
import { LikeActivityBoxView } from "./index";
import {userActions} from "../actions";

class LikeActivityPage extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {authentication} = this.props;
        if(authentication.loggedIn){
           // console.log("USerID: ",authentication.user.user_id);
            this.props.dispatch(userActions.getLikeMember(authentication.user.user_id));
            
        }
        //console.log("get like member")
        document.getElementsByTagName('html')[0].setAttribute('class', 'flexbox css3 notouch');
        document.body.className='activity activity--likes ltr vi macintosh chrome';
    }
    componentWillUnmount(){
        document.getElementsByTagName('html')[0].setAttribute('class', 'flexbox css3 notouch');
        document.body.className='profilev4';
    }
    render(){
        return (
            <div className="popup-inner"> 
                <HeaderVisible />
                <HeaderMobile />
                <Header view={this.props.view}/>
                <LikeActivityBoxView view={this.props.view}/>
            </div>
        )
    }
}
function mapStateToProps(state){
    const { authentication } = state;
    return { authentication };
}
const connected = connect(mapStateToProps)(LikeActivityPage);
export {connected as LikeActivityPage}