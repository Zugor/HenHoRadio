import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions";
import { AlertAddLike } from "../AlertPage";
class AlertBottom extends React.Component{
    constructor(props){
        super(props);
        const { alert }=this.props;
        var ls=[];
        this.state={
            list: ls,
        };
    }
    
    render(){
        const message='';
        const { alert } =this.props;
        const { list }=this.state;
        var ls=[];
        if(alert.alerts.length > 0){
            alert.alerts.forEach(function(item,index,err){
                switch(item.action){
                    case 'add_like':
                        ls.push(<AlertAddLike obj={item.result} />);
                        break;
                    default:
                        ls.push(<AlertAddLike obj={item.result} />);
                        break;
                }
            });
        }
        return(
            <div className="jsAlertContainerBottom tw3-alertContainer--bottom">
            {
                ls.map((item,i) =>{
                    return (<div key={i}>{item}</div>)
                })
            }
            </div>
        )
    }
}
function mapStateToProps(state){
    const { alert, authentication} = state;
    return { alert, authentication };
}
const connected=connect(mapStateToProps)(AlertBottom);
export {connected as AlertBottom};