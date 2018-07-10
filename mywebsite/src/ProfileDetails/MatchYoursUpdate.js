import React from "react";
import { connect } from "react-redux";

class ImproveMatchYours extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
<div class="tw3-profile__body__box">
    <div class="jsImproveMatchYours">
        <h5 class="tw3-h4 text--bold">NÂNG CAO ĐIỂM PHÙ HỢP</h5>
        <div class="text--center">
            <div data-questionid="1296" class="tw3-box--qAndA--subtle--noCategory    text--center jsQuestionBlock" data-edit-feedback="Câu trả lời của bạn đã được lưu.">
                <div class="tw3-qAndACategory__item--dating--badge mb--default">CÁC MỐI QUAN HỆ</div>
                <div class="tw3-field">
                    <div class="tw3-field__view">
                        <div class="tw3-qAndA__question">Bạn muốn kéo dài mối quan hệ của bạn bao lâu?</div>
                        <div class="mb--default">
                            <a class="jsQaEdit tw3-button tw3-button--blue tw3-button--rounded" href="#">Trả lời</a>
                        </div>
                        <div class="mb--default">
                            <a class="jsQuestionSkip text--grey" href=""><i class="tw3-iconRotateIcon tw3-iconGrey mr--tight"></i>Bỏ qua</a>
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