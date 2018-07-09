import React from "react";
import {connect} from "react-redux";
import { SmartOnBoarding_Step1 } from "./smartonboarding.step1";
import { SmartOnBoarding_Step2 } from "./smartonboarding.step2";

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
        const {users} = this.props;
        var self = this;
        var _users=(users.item && users.item.status && users.item.user.length > 0) ? users.item.user[0] : {};
        var _data={
            id                  : _users.id,
            preview_thumbnail   : _users.preview_thumbnail,
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
                              'tw3-steps__step__number--done': data.done,
                              'tw3-steps__step__number--active': data.active
                            });
                            return (
                                <li key={index} className="tw3-steps__step tw3-col-3"><div className={liClassesNumber}><img src="https://twoo-a.akamaihd.net/static/864505989717655270395861131/shared/i/blank.gif" width="25" height="25" className="vat"/></div></li>
                            )
                          })
                        }
                        </ul>
                        {
                            !self.state.step[0].done ? 
                                <SmartOnBoarding_Step1/>
                            : ''
                        }
                        {
                            self.state.step[0].done ?
                                <SmartOnBoarding_Step2/>
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
