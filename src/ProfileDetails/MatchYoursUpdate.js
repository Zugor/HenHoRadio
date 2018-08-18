import React from "react";
import { connect } from "react-redux";
import {modalActions, questionActions} from "../actions";
import { QaModal } from "./index";
const QUESTIONTYPE=require('../data/question').questionType;

class ImproveMatchYours extends React.Component{
    constructor(props){
        super(props);
        this.handleSkipQuestion=this.handleSkipQuestion.bind(this);
    }
    handleOpenAnswer(data){
         const { dispatch } = this.props;
         dispatch(modalActions.openModal({ className: 'tw3-modal--qAndA  tw3-modal--medium  tw3-modal--padding--slack ',content:<QaModal data={data}/>}));
    }
    handleSkipQuestion(){
        const { authentication } = this.props;
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';
        this.props.dispatch(questionActions.skipQuestionImprove(user_id));
    }
    componentDidMount(){
        const { authentication } = this.props;
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';
        this.props.dispatch(questionActions.getQuestionImprove(user_id));
    }
    render(){
        var {questionImprove} = this.props;

        const _data ={
            answerlist          : (questionImprove.data && questionImprove.data.randomQuestion ) ? questionImprove.data.randomQuestion.answerlist : [],
            category            : (questionImprove.data && questionImprove.data.randomQuestion ) ? questionImprove.data.randomQuestion.category : '',
            question            : (questionImprove.data && questionImprove.data.randomQuestion ) ? questionImprove.data.randomQuestion.question : '',
            question_id         : (questionImprove.data && questionImprove.data.randomQuestion ) ? questionImprove.data.randomQuestion.question_id : '',
        }
        return(
<div className="tw3-profile__body__box">
    <div className="jsImproveMatchYours">
        <h5 className="tw3-h4 text--bold">NÂNG CAO ĐIỂM PHÙ HỢP</h5>
        <div className="text--center">
            <div data-questionid={_data.question_id} className="tw3-box--qAndA--subtle--noCategory    text--center jsQuestionBlock" data-edit-feedback="Câu trả lời của bạn đã được lưu.">
                <div className={`tw3-qAndACategory__item--${ _data.category }--badge mb--default`}>{QUESTIONTYPE[_data.category]}</div>
                <div className="tw3-field">
                    <div className="tw3-field__view">
                        <div className="tw3-qAndA__question">{_data.question}</div>
                        <div className="mb--default">
                            <a className="jsQaEdit tw3-button tw3-button--blue tw3-button--rounded" href="javascript://" onClick={this.handleOpenAnswer.bind(this, _data)}>Trả lời</a>
                        </div>
                        <div className="mb--default">
                            <a className="jsQuestionSkip text--grey" href="javascript://" onClick={this.handleSkipQuestion}><i className="tw3-iconRotateIcon tw3-iconGrey mr--tight"></i>Bỏ qua</a>
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
    const {authentication, questionImprove} = state;
    return { authentication, questionImprove };
}
const connected = connect(mapStateToProps)(ImproveMatchYours);
export { connected as ImproveMatchYours }