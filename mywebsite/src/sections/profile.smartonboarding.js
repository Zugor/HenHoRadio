import React from "react";
import {connect} from "react-redux";
import {AddImages} from "../ProfileDetails"
import { userActions, modalAction } from "../actions";


class SmartOnBoarding_step1 extends React.Component{
    constructor(props){
        super(props);
        this.handleAddPreviewThumbnail=this.handleAddPreviewThumbnail.bind(this);
    }
    handleAddPreviewThumbnail(){
        const { dispatch } = this.props;
        dispatch(modalAction.openModal({ customClass: 'tw3-modal--small  tw3-modal--photoUploadv4 ',content:<AddImages type="previewThumbnail" />}));
    }
    render(){
        const {users} = this.props;
        return(
            <div id="smart-onboarding-1" className="tw3-smartOnboarding__step tw3-smartOnboarding--step1">
                <div className="tw3-mediav2 tw3-mediav2--auto">
                    <div className="tw3-mediav2__figure">
                        <img src="https://twoo-a.akamaihd.net/static/757517345581938776/images/v3/onboarding/img-picture.png" width="56" height="56" className="mh--default"/>
                    </div>
                    <div className="tw3-mediav2__body text--white tw3-h5 text--bold">
                    {users}, chào mừng bạn vào HenHoRadio! Tải một hình đại diện lên để bắt đầu sử dụng HenHoRadio.
                    </div>
                    <div className="tw3-mediav2__actions">
                        <a href="javascript://" className="tw3-button tw3-button--white tw3-button--rounded jsUploaderTrigger" data-type="PROFILE" onClick={this.handleAddPreviewThumbnail}>Thêm hình</a>
                    </div>
                </div>
            </div>
        )
    }
}

class SmartOnBoarding_step2 extends React.Component{
    render(){
        return(
        <div id="smart-onboarding-2" className="tw3-smartOnboarding__step tw3-smartOnboarding--step2">
            <div className="tw3-mediav2 tw3-mediav2--auto">
                <div className="tw3-mediav2__figure">
                    <span className="tw3-smartOnboarding__step__qaCounter"><span className="jsAnsweredQuestions">2/10</span></span>
                    <img src="https://twoo-a.akamaihd.net/static/71545153354471295584464/images/v3/onboarding/img-question.png" width="56" height="56" className="mh--default"/>
                </div>
                <div className="tw3-mediav2__body text--white tw3-h5 text--bold">
                    <p className="tw3-h5 m0">Câu hỏi <span className="jsAnsweredQuestions">2/10</span></p>
                    <p className="tw3-h4 text--white jsQuestion">'Thời trang' và 'hông' có phải là sự lăng mạ đối với bạn?</p>
                </div>
                <div className="tw3-mediav2__actions">
                    <p>
                        <a className="tw3-button tw3-button--white tw3-button--subtle tw3-button--large tw3-button--rounded jsAnswerQuestion mr--compact" data-question-id="1846" data-answer="1" data-trigger="smartonboarding">có</a>
                        <a className="tw3-button tw3-button--white tw3-button--subtle tw3-button--large tw3-button--rounded jsAnswerQuestion" data-question-id="1846" data-answer="2" data-trigger="smartonboarding">không</a>
                    </p>
                    <p className="m0">
                        <a className="text--white jsSkipQuestion text--line" data-question-id="1846" data-answer="" data-trigger="smartonboarding">bỏ qua</a>
                    </p>
                </div>
            </div>
        </div>
        )
    }
}

class SmartOnBoarding_step3 extends React.Component{
    render(){
        return (
        <div id="smart-onboarding-3" className="tw3-smartOnboarding__step tw3-smartOnboarding--step3">
            <div className="tw3-mediav2 tw3-mediav2--auto">
                <div className="tw3-mediav2__figure">
                    <span className="tw3-smartOnboarding__step__likeCounter"><span className="jsPeopleToLike">10</span></span>
                    <img src="https://twoo-a.akamaihd.net/static/58060887438741087897/images/v3/onboarding/img-discover.png" width="56" height="56" className="mh--default"/>
                </div>
                <div className="tw3-mediav2__body text--white tw3-h5 text--bold jsPeopleToLikeTranslation">
                    To get connected with people you need to start liking their profile! Try liking <span className="jsPeopleToLike">10</span> more profiles in Explore.
                </div>
                <div className="tw3-mediav2__actions">
                    <a href="/game" className="tw3-button tw3-button--white tw3-button--rounded">Go to Explore</a>
                </div>
            </div>
        </div>
        )
    }
}

class SmartOnBoarding_step4 extends React.Component{
    render(){
        return (
        <div id="smart-onboarding-4" className="tw3-smartOnboarding__step tw3-smartOnboarding--step4">
            <div className="tw3-mediav2 tw3-mediav2--auto">
                <div className="tw3-mediav2__figure">
                    <img src="https://twoo-a.akamaihd.net/static/6916570915528933971182/images/v3/onboarding/img-verify.png" width="56" height="62" className="mh--default"/>
                </div>
                <div className="tw3-mediav2__body text--white tw3-h5 mb--default">
                    Having a Verified profile means you will be able to meet more people! You need 3 verifications to get your Verified status. Add your first verification now!
                </div>
                <div className="tw3-mediav2__actions">
                    <a href="javascript://" className="tw3-button tw3-button--white tw3-button--rounded jsVerify" data-trigger="smartonboarding" data-stay-open="1">Verify now</a>
                </div>
            </div>
        </div>
        )
    }
}

class SmartOnBoarding_finish extends React.Component{
    render(){
        return(
        <div id="smart-onboarding-finished" className="onboarding-finished tw3-smartOnboarding__step tw3-smartOnboarding--stepfinished">
            <div className="tw3-mediav2 tw3-mediav2--auto">
                <div className="tw3-mediav2__figure">
                    <img src="https://twoo-a.akamaihd.net/static/8715391006195390714574/images/v3/onboarding/img-complete.png" width="56" height="56" className="mh--default"/>
                </div>
                <div className="tw3-mediav2__body text--white tw3-h5 text--bold">
                    Congratulations! Your basic profile is complete. You are ready to start meeting new people on Twoo
                </div>
            </div>
        </div>
        )
    }
}

class SmartOnBoarding extends React.Component{
    constructor(props){
        super(props);
        	this.state = {step: [{active: 1, done: 0},{active: 0, done: 0},{active: 0, done: 0},{active: 0, done: 0}]};
    }
    componentDidMount(){

    }
    classNames(classes) {
    return Object.entries(classes)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)
      .join(' ');
    }
    render(){
        const {users, dispatch} = this.props;
        var self = this;
        var _users=(users.item && users.item.status && users.item.user.length > 0) ? users.item.user[0] : {};
        var _data={
            fullname            : _users.fullname,
            preview_thumbnail   : _users.preview_thumbnail,
            age                 : (_users.dob_year) ? (new Date().getFullYear() - _users.dob_year) : '0',
            address             : _users.address
        }
        if(!_data.preview_thumbnail){ 
            self.state.step[0].done = 1;
            self.state.step[1].active = 1;
        }
        return(
            <div className="tw3-smartOnboarding">
                <div className="tw3-container">
                    <div id="smartOnboarding" data-options="{&quot;hasAvatar&quot;:true,&quot;hasAnsweredTenQuestions&quot;:false,&quot;hasLikedTenPeople&quot;:false,&quot;hasOneVerification&quot;:true,&quot;peopleToLike&quot;:10}" data-initial-step="2">
                        <a href="javascript://" className="jsCloseSmartBoarding"><span className="tw3-iconCloseCross tw3-iconWhite right"></span></a>
                        <ul className="tw3-steps tw3-row">
                        {
                          self.state.step.map(function(data, index) {
                            var liClassesNumber = self.classNames({
                              'tw3-steps__step__number': true,
                              'tw3-steps__step__number--done': self.state.step[index].done,
                              'tw3-steps__step__number--active': self.state.step[index].active
                            });
                            return (
                                <li className="tw3-steps__step tw3-col-3"><div className={liClassesNumber}><img src="https://twoo-a.akamaihd.net/static/864505989717655270395861131/shared/i/blank.gif" width="25" height="25" className="vat"/></div></li>
                            )
                          })
                        }
                        </ul>
                        {
                            !self.state.step[0].done ? 
                                <SmartOnBoarding_step1 users={_data.fullname} dispatch={dispatch}/>
                            : ''
                        }
                        {
                            self.state.step[0].done ?
                                <SmartOnBoarding_step2/>
                            : ''
                        }
                        {
                            self.state.step[1].done ?
                               <SmartOnBoarding_step3/>
                            : ''
                        }
                        {
                            self.state.step[2].done ?
                                <SmartOnBoarding_step4/>
                            : ''
                        }
                        {   self.state.step[3].done ?
                                <SmartOnBoarding_finish/>
                            : ''
                        }
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
const connectedSmartOnBoarding=connect(mapStateToProps)(SmartOnBoarding);
export { connectedSmartOnBoarding as SmartOnBoarding }
