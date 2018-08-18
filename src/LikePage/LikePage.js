import React from "react";
import { connect } from "react-redux";
import { LoginPopup,RegisterPopup,Header,AdvancedSearch,RegisterMember,MemberActive, Banner, HeaderVisible, HeaderMobile } from "../sections";
import { LikeBoxView } from "./index";
import {userActions} from "../actions";
class LikePage extends React.Component{
    
    componentDidMount(){
        
        const {authentication} = this.props;
        if(authentication.loggedIn){
            this.props.dispatch(userActions.getLikeByUser(authentication.user.user_id));
            
        }
        
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
                <LikeBoxView view={this.props.view}/>
            </div>
        )
    }
     
}
function mapStateToProps(state){
    const { authentication } = state;
    return {authentication};
}
const connected = connect(mapStateToProps)(LikePage);
export { connected as LikePage}