import React from "react";
import { connect } from "react-redux";
import {modalActions} from "../actions";
import { QuestionAndAnswer } from "./index";

class ImproveMatchYours extends React.Component{
    constructor(props){
        super(props);
        this.handleOpenAnswer=this.handleOpenAnswer.bind(this);
    }
    handleOpenAnswer(){
         const { dispatch } = this.props;
         dispatch(modalActions.openModal({ className: 'tw3-modal--qAndA  tw3-modal--medium  tw3-modal--padding--slack ',content:<QuestionAndAnswer/>}));
    }
    render(){
        return(
<div className="tw3-profile__body__box">
    <div className="jsImproveMatchYours">
        <h5 className="tw3-h4 text--bold">NÂNG CAO ĐIỂM PHÙ HỢP</h5>
        <div className="text--center">
            <div data-questionid="1296" className="tw3-box--qAndA--subtle--noCategory    text--center jsQuestionBlock" data-edit-feedback="Câu trả lời của bạn đã được lưu.">
                <div className="tw3-qAndACategory__item--dating--badge mb--default">CÁC MỐI QUAN HỆ</div>
                <div className="tw3-field">
                    <div className="tw3-field__view">
                        <div className="tw3-qAndA__question">Bạn muốn kéo dài mối quan hệ của bạn bao lâu?</div>
                        <div className="mb--default">
                            <a className="jsQaEdit tw3-button tw3-button--blue tw3-button--rounded" href="javascript://" onClick={this.handleOpenAnswer}>Trả lời</a>
                        </div>
                        <div className="mb--default">
                            <a className="jsQuestionSkip text--grey" href=""><i className="tw3-iconRotateIcon tw3-iconGrey mr--tight"></i>Bỏ qua</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        );
    }
}
function mapStateToProps(state){
    const {userDetails} = state;
    return { userDetails };
}
const connected = connect(mapStateToProps)(ImproveMatchYours);
export { connected as ImproveMatchYours }