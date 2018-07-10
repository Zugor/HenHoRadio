import React from "react";
import { connect } from "react-redux";
import {Redirect } from "react-router-dom";
import {userActions} from "../actions";
class QuestionAndAnswer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
<div className="jsQaModalContent" data-questionid="57">
    <form method="post" action="/1517780220">
        <input type="hidden" name="twoo_csrf_token" value="29f9199c83bffddd84ad8ebac138cb6a_1531241435"/>
        <input type="hidden" name="action" value="saveBlock"/>
        <input type="hidden" name="block" value="question"/>
        <input type="hidden" name="questionid" value="57"/>
        <div className="tw3-row text--center">
            <div className="mb--compact tw3-qAndACategory__item--lifestyle--badge mb--default">
            PHONG CÁCH SỐNG</div>
            </div>
            <h4 className="tw3-qAndA__question text--bold pb--default">Bạn nghĩ gì về loại chất gây nghiện mạnh hơn?</h4>
        <ul className="tw3-qAndA__answerHolder mb--default mb--loose">
            <li>
                <label>
                    <input type="radio" name="answer" value="1" className="mr--compact tw3-radio--custom"/>
                    <span>Tôi vẫn thường sử dụng.</span>
                </label>
            </li>
            <li>
                <label>
                    <input type="radio" name="answer" value="2" className="mr--compact tw3-radio--custom"/>
                    <span>Thỉnh thoảng tôi mới sử dụng.</span>
                </label>
            </li>
            <li>
                <label>
                    <input type="radio" name="answer" value="3" className="mr--compact tw3-radio--custom"/>
                    <span>Tôi đã từng nhưng tôi đã bỏ.</span>
                </label>
            </li>
            <li>
                <label>
                <input type="radio" name="answer" value="4" className="mr--compact tw3-radio--custom"/>
                <span>Tôi chưa bao giờ sử dụng.</span>
                </label>
            </li>
        </ul>

        <h6 className="text--subtle text--upper">Những câu trả lời bạn có thể chấp nhận</h6>
    <ul className="tw3-qAndA__answerHolder mb--default mb--loose">
    <li>
    <label>
    <input type="checkbox" name="accepted[]" value="1" className="mr--compact tw3-checkbox--custom jsAcceptedAnswer"/>
    <span>Tôi vẫn thường sử dụng.</span>
    </label>
    </li>
    <li>
    <label>
    <input type="checkbox" name="accepted[]" value="2" className="mr--compact tw3-checkbox--custom jsAcceptedAnswer"/>
    <span>Thỉnh thoảng tôi mới sử dụng.</span>
    </label>
    </li>
    <li>
    <label>
    <input type="checkbox" name="accepted[]" value="3" className="mr--compact tw3-checkbox--custom jsAcceptedAnswer"/>
    <span>Tôi đã từng nhưng tôi đã bỏ.</span>
    </label>
    </li>
    <li>
    <label>
    <input type="checkbox" name="accepted[]" value="4" className="mr--compact tw3-checkbox--custom jsAcceptedAnswer"/>
    <span>Tôi chưa bao giờ sử dụng.</span>
    </label>
    </li>
    <li>
    <label>
    <input type="checkbox" name="acceptany" value="1" className="mr--compact tw3-checkbox--custom jsAcceptAny"/>
    <span>Bất kể đáp án nào ở trên</span>
    </label>
    </li>
    </ul>

    <h6 className="text--subtle text--upper">Tầm quan trọng</h6>

    <div className="jsImportanceBlock">
    <ul className="tw3-qAndA__answerHolder mb--default mb--loose">
    <li>
    <label><input type="radio" name="importance" value="1" className="mr--compact tw3-radio--custom"/><span>Một chút</span></label>
    </li>
    <li>
    <label><input type="radio" name="importance" value="10" className="mr--compact tw3-radio--custom"/><span>Hơi</span></label>
    </li>
    <li>
    <label><input type="radio" name="importance" value="50" className="mr--compact tw3-radio--custom"/><span>Rất</span></label>
    </li>
    </ul>
    </div>

<p className="jsImportanceBlockIrrelevant text--italic text--subtle mb--default hide">
Bạn chấp nhận tất cả câu trả lời cho câu hỏi này, và như vậy câu hỏi này sẽ không còn quan trọng nữa.
</p>

<h6 className="text--subtle text--upper">Lời giải thích của bạn</h6>
<textarea name="explanation" className="tw3-textarea tw3-textarea--autogrow mb--default jsTextAreaAutoGrow" placeholder="Giải thích cho câu trả lời (không bắt buộc)" maxLength="250"></textarea>
<div className="tw3-qAndA__anonymousToggle jsQuestionPrivateToggleHolder text--right">
<input type="hidden" name="private" value="0"/>
<a href="javascript://" className="jsQuestionPrivateToggle tw3-tooltip jsTooltip tw3-qAndA__anonymousToggle__inactive el--inlineBlock" data-text="Đặt thành câu hỏi riêng tư" data-value="1">
<i className="tw3-iconAnonymous tw3-iconGrey tw3-iconLarge"></i>
</a>
<a href="javascript://" className="jsQuestionPrivateToggle tw3-tooltip jsTooltip tw3-qAndA__anonymousToggle__active" data-text="Đặt thành câu hỏi công khai" data-value="0">
<i className="tw3-iconAnonymous tw3-iconBlue tw3-iconLarge"></i>
</a>
</div>
<div className="tw3-buttonGroup text--center mb--default">
<input type="submit" className="tw3-button tw3-button--blue tw3-button--disabled tw3-button--rounded" value="Lưu" disabled="disabled"/>
<a className="tw3-button tw3-button--subtle jsClose tw3-button--rounded" href="javascript://">Hủy</a>
</div>
</form>
</div>
        )
    }
    
}
function mapStateToProps(state){
    const { authentication } = state;
    return { authentication };
}
const connected=connect(mapStateToProps)(QuestionAndAnswer);
export {connected as QuestionAndAnswer}