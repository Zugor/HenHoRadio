import React from "react";
import { connect } from "react-redux";
import { pageActions } from "../actions";

class QuestionCatalog extends React.Component{
    constructor(props){
        super(props);
        this.handleSwitchView=this.handleSwitchView.bind(this);
    }
    handleSwitchView(){
         const {dispatch } = this.props;
         dispatch(pageActions.switchView('question'));
     }
    render(){
        return (
            <div className="tw3-profile__body__box">
                <h5 className="jsEditableBlockTitle text--bold tw3-h5">CÂU HỎI PHÙ HỢP</h5>
                <p className="mb--none text--subtle text--smaller">
                Điểm phù hợp cao nhất của bạn là <strong>75%</strong>.
                </p>
                <p className="text--subtle mb--default text--smaller">
                Bạn đã trả lời <strong>2</strong> câu hỏi.
                </p>
                <a href="javascript://" onClick={this.handleSwitchView} className="tw3-button tw3-button--subtle tw3-button--blue tw3-button--full tw3-button--rounded jsSwitchView" data-view="questions">
                TRẢ LỜI THÊM
                </a>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connectedQuestionCatalog=connect(mapStateToProps)(QuestionCatalog);
export {connectedQuestionCatalog as QuestionCatalog}