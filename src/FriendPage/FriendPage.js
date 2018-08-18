import React from "react";
import { connect } from "react-redux";
import { Header, HeaderVisible, SmartOnBoarding, HeaderMobile } from "../sections";
import { ViewInfo, IndexDetails } from "./index";
class FriendPage extends React.Component{
    
    render(){
        return(
            <div>
                    <Header view={this.props.view}/>
                    <HeaderVisible />
                    <HeaderMobile />
                    <SmartOnBoarding/>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(FriendPage);
export {connected as FriendPage}