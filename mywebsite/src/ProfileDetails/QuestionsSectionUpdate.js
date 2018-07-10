import React from "react";
import { connect } from "react-redux";

class QuestionsLoaderSection extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
<div className="tw3-profile__body__box">
    <div className="jsQuestionsLoaderSection clearfix">
        <div className="tw3-col-12">
            <h5 className="tw3-h5 text--bold jsQuestionsAnchor">CÂU HỎI ĐÃ TRẢ LỜI</h5>
            <p className="text--subtle mb--default">Bạn đã trả lời <span className="jsTotalQuestionsCountCopy"> 4 câu hỏi</span></p>
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

        <div className="jsQuestionsContainer" data-total-questions="4">
            <div className="tw3-row jsDivStart">
                <div className="tw3-col-12 mb--default">

                    <div className="mb--compact">
                        <div data-questionid="15" className="tw3-box--qAndA--subtle  jsQuestionBlock" data-edit-feedback="Câu trả lời của bạn đã được lưu.">
                            <div className="tw3-qAndACategory__item--sex--badge mb--default">
                                GIỚI TÍNH</div>

                            <div className="tw3-field">
                                <div className="tw3-field__view">

                                    <div className="tw3-qAndA__question">Bạn từng có đồ chơi tình dục?</div>

                                    <ul className="tw3-qAndA__answerHolder mb--default">
                                        <li className="tw3-qAndA__answer ">
                                            <i className="tw3-qAndA__answer__bullet"></i>Có</li>
                                        <li className="tw3-qAndA__answer tw3-qAndA__answer--answered tw3-qAndA__answer--acceptable">
                                            <i className="tw3-qAndA__answer__bullet"></i>Không</li>
                                    </ul>

                                    <div className="tw3-qAndA__explanation">
                                        <div className="tw3-row">
                                            <div className="tw3-col-8">
                                                <textarea placeholder="Giải thích thêm..." className="tw3-textarea tw3-textarea--autogrow jsTextAreaAutoGrow jsQuestionExplanation" name="explanation" maxLength="250"></textarea>
                                            </div>
                                            <div className="tw3-col-4 text--right">
                                                <input type="submit" value="Gửi" className="tw3-qAndA__explanation__send tw3-qAndA__explanation__send--disabled jsQuestionExplanationSubmit mr--default"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tw3-field__editIcon">
                                    <i className="tw3-iconPencil tw3-iconDefault tw3-iconGrey jsQaEdit"></i>
                                </div>
                            </div>
                        </div>

                        <div className="tw3-col-hide jsCategoryCounters" data-sex="" data-dating="" data-lifestyle="" data-ethics="" data-religion="">
                        </div>

                    </div>
                    <div className="mb--compact">
                        <div data-questionid="463" className="tw3-box--qAndA--subtle  jsQuestionBlock" data-edit-feedback="Câu trả lời của bạn đã được lưu.">
                            <div className="tw3-qAndACategory__item--dating--badge mb--default">
                                CÁC MỐI QUAN HỆ</div>

                            <div className="tw3-field">
                                <div className="tw3-field__view">

                                    <div className="tw3-qAndA__question">Bạn từng yêu ai đó?</div>

                                    <ul className="tw3-qAndA__answerHolder mb--default">
                                        <li className="tw3-qAndA__answer tw3-qAndA__answer--answered tw3-qAndA__answer--acceptable">
                                            <i className="tw3-qAndA__answer__bullet"></i>Có</li>
                                        <li className="tw3-qAndA__answer ">
                                            <i className="tw3-qAndA__answer__bullet"></i>Không</li>
                                    </ul>

                                    <div className="tw3-qAndA__explanation">
                                        <div className="tw3-row">
                                            <div className="tw3-col-8">
                                                <textarea placeholder="Giải thích thêm..." className="tw3-textarea tw3-textarea--autogrow jsTextAreaAutoGrow jsQuestionExplanation" name="explanation" maxLength="250"></textarea>
                                            </div>
                                            <div className="tw3-col-4 text--right">
                                                <input type="submit" value="Gửi" className="tw3-qAndA__explanation__send tw3-qAndA__explanation__send--disabled jsQuestionExplanationSubmit mr--default"/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="tw3-field__editIcon">
                                    <i className="tw3-iconPencil tw3-iconDefault tw3-iconGrey jsQaEdit"></i>
                                </div>
                            </div>
                        </div>

                        <div className="tw3-col-hide jsCategoryCounters" data-sex="" data-dating="" data-lifestyle="" data-ethics="" data-religion="">
                        </div>

                    </div>

                </div>
            </div>

            <div className="text--center mt--compact jsQaPager">
            </div>

            <div className="tw3-col-hide jsQuestionCounters" data-questions="4" data-answered="" data-highest-match="75" data-questions-left-discovery="96" data-sex="" data-dating="" data-lifestyle="" data-ethics="" data-religion="">
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
const connected = connect(mapStateToProps)(QuestionsLoaderSection);
export { connected as QuestionsLoaderSection }