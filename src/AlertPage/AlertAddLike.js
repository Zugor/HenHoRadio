import React from "react";
import { connect } from "react-redux";
import { alertActions } from "../actions";
class AlertAddLike extends React.Component{
    constructor(props){
        super(props);
        this.handleCloseAlert=this.handleCloseAlert.bind(this);
        this.state={
            clearTimeout: false,
        }
    }
    componentDidMount(){
        var time=setTimeout(
                function(){
                    this.props.dispatch(alertActions.closeBottom(this.props.obj))
                }.bind(this),
                6000
        );
    }
    handleCloseAlert(){
        this.props.dispatch(alertActions.closeBottom(this.props.obj))
        
    }
    render(){
        var name=this.props.obj[0].fullname;
        return (
            <div className="jsAlert tw3-alert--bottom">
                    <div className="tw3-alert__icon text--center"><i className="tw3-iconCheckThin tw3-iconWhite"></i></div>
                    <div className="tw3-alert__title"> Bạn thích {name}. </div>
                    <a href="javascript:;" onClick={this.handleCloseAlert} className="jsAlertClose tw3-alert__close"><i className="tw3-iconCloseCross tw3-iconWhite tw3-iconMedium"></i></a>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(AlertAddLike)
export {connected as AlertAddLike}