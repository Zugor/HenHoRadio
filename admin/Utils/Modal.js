import React from "react";
import { connect } from "react-redux";
import { modalActions } from "../actions";
import { Modal as AntModal } from 'antd'

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.closeModal=this.closeModal.bind(this);
    }
    closeModal(e){
        const { dispatch } =this.props;
        dispatch(modalActions.closeModal());
        //e.stopPropagation();
        //history.goBack();
    }
    render(){
        const { modal } = this.props;
        
        const index=(modal.modals.length - 1 > 0) ? (modal.modals.length - 1) : 0;
        const modalOpts = {
            footer: null,
            visible: true,
            onCancel: this.closeModal
        }
        return (
        <div>    
        { (modal.modals.length > 0) ? (
            <AntModal {...modalOpts}>
                { modal.modals[index].content }
            </AntModal>
         ) : ''
          
        }
        </div>   
        )
    }
}
function mapStateToProps(state){
    const { modal } = state;
    return { modal };
}
const connectedModal =connect(mapStateToProps)(Modal);
export { connectedModal as Modal }
