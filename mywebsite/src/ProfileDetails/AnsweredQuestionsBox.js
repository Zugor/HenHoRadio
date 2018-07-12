import React from "react";
import { connect } from "react-redux";
import { questionActions } from "../actions";
import { ViewQuestionItem } from "./index";

class AnsweredQuestionsBox extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const { authentication, dispatch } = this.props;
        var { question } = this.props;
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';
        dispatch(questionActions.getAnsweredQuestion(user_id));
        const {answeredQuestion} = this.props;
    }
    render(){
        const {answeredQuestion} = this.props;
        const data=(answeredQuestion && answeredQuestion.data ) ? answeredQuestion.data.answeredQuestions : [];
        var answered_num = (answeredQuestion && answeredQuestion.data ) ? answeredQuestion.data.countAnsweredQuestionsForQABox : 0;
        return(
<div className="tw3-profile__body__box">
    <div className="jsQuestionsLoaderSection clearfix">
        <div className="tw3-col-12">
            <h5 className="tw3-h5 text--bold jsQuestionsAnchor">CÂU HỎI ĐÃ TRẢ LỜI</h5>
            <p className="text--subtle mb--default">Bạn đã trả lời <span className="jsTotalQuestionsCountCopy"> {answered_num} câu hỏi</span></p>
        </div>
        <div className="mb--loose jsQuestionsFilter tw3-col-12">
            <div className="tw3-row clearfix">
                <div className="tw3-col-hide tw3-bp3-col-show-block tw3-bp3-col-6">
                    <input type="text" name="keyword" placeholder="Tìm theo từ khóa" value="" className="tw3-text"/>
                </div>
                <div className="tw3-col-12 tw3-bp3-col-6">
                    <div className="tw3-dropdownHolder jsCustomDropdownSingle tw3-dropdownHolder--nativeOnly" name="qaFilter" single="single" copyplaceholder="0" placeholder="">
                        <div className="tw3-dropdownHolder--mobile jsDropdownMobileHolder">
                            <div className="tw3-dropdown--native jsDropdownNative">
                                <div className="tw3-dropdownHolder__native__content jsDropdownContent">
                                    <select className="" name="qaFilter" tabIndex="1">

                                        <option value="">Đã trả lời gần đây</option>
                                        <option value="onlyAncient">Đã trả lời từ rất lâu</option>
                                        <option value="onlyPublic">Đã trả lời công khai</option>
                                        <option value="onlyPrivate">Đã bí mật trả lời</option>
                                        <option value="onlyVeryImportant">Rất quan trọng</option>
                                        <option value="onlySomewhatImportant">Hơi quan trọng</option>
                                        <option value="onlyLittleImportant">Ít quan trọng</option>
                                        <option value="onlyIrrelevant">Không có ý nghĩa</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="jsQuestionsContainer" data-total-questions={answered_num}>
            <div className="tw3-row jsDivStart">
                <div className="tw3-col-12 mb--default">
                    
                { data.length > 0 &&
                    data.map((e,i)=>{
                        return (<ViewQuestionItem key={i} data={e}/>)
                    })
                }

                </div>
            </div>

            <div className="text--center mt--compact jsQaPager">
            </div>
        </div>
    </div>
</div>
        );
    }
}
function mapStateToProps(state){
    const { authentication, question, answeredQuestion }=state;
    return { authentication, question, answeredQuestion };
}
const connected = connect(mapStateToProps)(AnsweredQuestionsBox);
export { connected as AnsweredQuestionsBox }