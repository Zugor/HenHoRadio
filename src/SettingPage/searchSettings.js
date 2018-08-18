import React from "react";
import { connect } from "react-redux";

class SearchSettings extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }
    render(){
        return (
<div className="tw3-box mb--compact" id="search-settings">
    <div className="tw3-editable__block jsEditableBlock jsSearchSettingsContainer">

        <div className="tw3-field__editIcon">
            <a href="javascript://" className="jsEditButton">
                <i className="tw3-iconGrey tw3-iconPencil"></i>
            </a>
            <a href="javascript://" className="jsDoneButton text--bold text--blue text--smaller cursor--pt" style={{display: 'none'}}>
                XONG <i className="tw3-iconCheckSolid"></i>
            </a>
        </div>
        <h5 className="jsEditableBlockTitle text--bold mb--default">
            <i className="tw3-iconGrey mr--compact tw3-iconSearch"></i>LỰA CHỌN TÌM KIẾM
        </h5>
        <div className="tw3-field">
            <div className="tw3-field__view">
                <div className="tw3-form">
                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight text--subtle">
                            Tôi ở đây để
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            Chat
                        </div>
                    </div>

                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight text--subtle">
                            Với
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            Phụ nữ
                        </div>
                    </div>

                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight text--subtle">
                            Độ tuổi
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            18 - 30</div>
                    </div>

                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight text--subtle">
                            Vị trí
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            Hà Nội</div>
                    </div>

                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight text--subtle">
                            Trong vòng
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            Trong vòng 200 km</div>
                    </div>
                </div>
            </div>

            <div className="tw3-field__edit tw3-field__edit--area">
                <form action="/settings" method="post">
                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight">
                            <label htmlFor="hereTo" className="text--subtle">Tôi ở đây để</label>
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            <div className="tw3-dropdownHolder jsCustomDropdownSingle tw3-dropdownHolder--nativeOnly" name="hereto" single="single" copyplaceholder="0" placeholder="">
                                <div className="tw3-dropdownHolder--mobile jsDropdownMobileHolder">
                                    <div className="tw3-dropdown--native jsDropdownNative">
                                        <div className="tw3-dropdownHolder__native__content jsDropdownContent">
                                            <select className="" name="hereto" tabIndex="7">

                                                <option value="chat" selected="selected">Chat</option>
                                                <option value="friends">Kết bạn</option>
                                                <option value="date">Hẹn hò</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight">
                            <label htmlFor="gender" className="text--subtle">Với</label>
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            <div className="tw3-dropdownHolder jsCustomDropdownSingle tw3-dropdownHolder--nativeOnly" name="gender" single="single" copyplaceholder="0" placeholder="">
                                <div className="tw3-dropdownHolder--mobile jsDropdownMobileHolder">
                                    <div className="tw3-dropdown--native jsDropdownNative">
                                        <div className="tw3-dropdownHolder__native__content jsDropdownContent">
                                            <select className="" name="gender" tabIndex="1">

                                                <option value="FEMALE" selected="selected">Phụ nữ</option>
                                                <option value="MALE">Đàn ông</option>
                                                <option value="BOTH">Mọi người</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tw3-form__row tw3-row jsSliderContainer">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight">
                            <label htmlFor="ageRange" className="text--subtle">Độ tuổi</label>
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            <div className="tw3-col-2 text--center">
                                <span className="text--bold text--subtle jsSliderValue pr--tight" data-value="18">18</span>
                            </div>
                            <div className="tw3-col-8 pt--compact">
                                <div className="jsSlider noUi-target noUi-ltr noUi-horizontal" data-minimum-value="18" data-maximum-value="90" data-margin-value="2">
                                    <div className="noUi-base">
                                        <div className="noUi-origin" style={{left : '0%'}}>
                                            <div className="noUi-handle noUi-handle-lower"></div>
                                        </div>
                                        <div className="noUi-connect" style={{left: '0%', right: '83.3333%'}}></div>
                                        <div className="noUi-origin" style={{left: '16.6667%'}}>
                                            <div className="noUi-handle noUi-handle-upper"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tw3-col-2 text--center ml--tight">
                                <span className="text--bold text--subtle jsSliderValue pl--tight">30</span>
                            </div>
                            <input type="hidden" className="jsFormValue" name="minAge" value="18"/>
                            <input type="hidden" className="jsFormValue" name="maxAge" value="30"/>
                        </div>
                    </div>

                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight">
                            <label htmlFor="location" className="text--subtle">Vị trí</label>
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            <div className="jsAutoCompleterLocation">
                                <input placeholder="Nhập thành phố của bạn" type="text" className="jsInputLocation autoCompleter tw3-text" autoComplete="off" style={{width: '100%'}} name="q" id="completeProfileLocation" defaultValue="Hà Nội" tabIndex="1" data-id="1581130"/>
                                <div className="autoCompleterSuggestions jsAutoCompleterSuggestionsContainer " style={{display: 'none'}}></div>
                            </div>
                        </div>
                    </div>

                    <div className="tw3-form__row tw3-row jsSliderContainer">
                        <div className="tw3-col-12 tw3-bp3-col-5 pb--tight">
                            <label htmlFor="gender" className="text--subtle">
                                <span className="jsSliderValue" style={{display: 'none'}} data-value="0">Trong toàn thành phố</span>
                                <span className="jsSliderValue" style={{display: 'none'}} data-value="1">Trong vòng 25 km</span>
                                <span className="jsSliderValue" style={{display: 'none'}} data-value="2">Trong vòng 50 km</span>
                                <span className="jsSliderValue" style={{display: 'none'}} data-value="3">Trong vòng 100 km</span>
                                <span className="jsSliderValue" style={{display: 'inline'}} data-value="4">Trong vòng 200 km</span>
                                <span className="jsSliderValue" style={{display: 'none'}} data-value="5">Cả quốc gia</span>
                                <span className="jsSliderValue" style={{display: 'none'}} data-value="7">Cả thế giới</span>
                            </label>
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7 ">
                            <div className="tw3-col-12 mb--compact pt--compact">
                                <div className="jsSlider noUi-target noUi-ltr noUi-horizontal">
                                    <div className="noUi-base">
                                        <div className="noUi-origin" style={{left: '66.6667%'}}>
                                            <div className="noUi-handle noUi-handle-lower"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>
        )
    }
}
function mapStateToProps(state){
    const { authentication }=state;
    return { authentication };
}
const connected=connect(mapStateToProps)(SearchSettings);
export { connected as SearchSettings } 