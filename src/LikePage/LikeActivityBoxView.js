import React from "react";
import {connect } from "react-redux";
import { LikeActivityListView,LikeRightSide } from "./index";
class LikeActivityBoxView extends React.Component{
    render(){
        return(
            <div className="tw3-content">
                <div className="tw3-container">
                    <div className="tw3-row">
                        <LikeActivityListView />
                        <LikeRightSide view={this.props.view}/>
                    </div>
                </div>
                
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected = connect(mapStateToProps)(LikeActivityBoxView);
export { connected as LikeActivityBoxView };