import React from "react";
import {connect} from "react-redux";
import {AddImages} from "../ProfileDetails"
import { modalActions } from "../actions";

class SmartOnBoarding_Step1 extends React.Component{
    constructor(props){
        super(props);
        this.handleAddPreviewThumbnail=this.handleAddPreviewThumbnail.bind(this);
    }
    handleAddPreviewThumbnail(){
        const { dispatch } = this.props;
        dispatch(modalActions.openModal({ customClass: 'tw3-modal--small  tw3-modal--photoUploadv4 ',content:<AddImages type="previewThumbnail" />}));
    }
    render(){
        const {users} = this.props;
        var _users=(users.item && users.item.status && users.item.user.length > 0) ? users.item.user[0] : {};
        var _data={
            id                  : _users ? _users.id : null,
            name                : _users ? _users.fullname : null,
        }
        return(
            <div id="smart-onboarding-1" className="tw3-smartOnboarding__step tw3-smartOnboarding--step1">
                <div className="tw3-mediav2 tw3-mediav2--auto">
                    <div className="tw3-mediav2__figure">
                        <img src="https://twoo-a.akamaihd.net/static/757517345581938776/images/v3/onboarding/img-picture.png" width="56" height="56" className="mh--default"/>
                    </div>
                    <div className="tw3-mediav2__body text--white tw3-h5 text--bold">
                    {_data.name}, chào mừng bạn vào HenHoRadio! Tải một hình đại diện lên để bắt đầu sử dụng HenHoRadio.
                    </div>
                    <div className="tw3-mediav2__actions">
                        <a href="javascript://" className="tw3-button tw3-button--white tw3-button--rounded jsUploaderTrigger" data-type="PROFILE" onClick={this.handleAddPreviewThumbnail}>Thêm hình</a>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { users }= state;
    return { users };
}
const connectedSmartOnBoardingStep1=connect(mapStateToProps)(SmartOnBoarding_Step1);
export { connectedSmartOnBoardingStep1 as SmartOnBoarding_Step1 }