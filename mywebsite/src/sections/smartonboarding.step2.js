import React from "react";
import {connect} from "react-redux";
import { questionActions } from "../actions";

class SmartOnBoarding_Step2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            question_number: 0,
        }
        this.handleSkipQuestion=this.handleSkipQuestion.bind(this);
    }
    handleSkipQuestion(){
        const { authentication, question } = this.props;
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';
        this.props.dispatch(questionActions.skipQuestion(user_id));
        var question_num = (question.data && question.data.randomYesNoQuestion ) ? question.data.randomYesNoQuestion.countAnsweredQuestionsForQABox : this.state.question_number;
        this.setState({question_number: question_num});   
    }
    handleAnswerQuestion(answer){
        const { dispatch, authentication, question } = this.props;
        
        const user_id = authentication.loggedIn ? authentication.user.user_id : '';
        const question_id = (question.data && question.data.randomYesNoQuestion ) ? question.data.randomYesNoQuestion.question_id : '' ;
        dispatch(questionActions.answerQuestion(answer, question_id, user_id));
        var question_num = (question.data && question.data.randomYesNoQuestion ) ? question.data.randomYesNoQuestion.countAnsweredQuestionsForQABox : this.state.question_number;
        this.setState({question_number: question_num});   
    }
    componentDidMount(){
        const { authentication } = this.props;
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';
        this.props.dispatch(questionActions.getQuestion(user_id));
    }
    render(){
        var {question} = this.props;
        
        var question_num = (question.data && question.data.randomYesNoQuestion ) ? question.data.randomYesNoQuestion.countAnsweredQuestionsForQABox : this.state.question_number;
        var question_content = (question.data && question.data.randomYesNoQuestion ) ? question.data.randomYesNoQuestion.question : '' ;
        var question_id = (question.data && question.data.randomYesNoQuestion ) ? question.data.randomYesNoQuestion.question_id : '' ;
        return(
        <div id="smart-onboarding-2" className="tw3-smartOnboarding__step tw3-smartOnboarding--step2">
            <div className="tw3-mediav2 tw3-mediav2--auto">
                <div className="tw3-mediav2__figure">
                    <span className="tw3-smartOnboarding__step__qaCounter"><span className="jsAnsweredQuestions">{question_num+1}/10</span></span>
                    <img src="https://twoo-a.akamaihd.net/static/71545153354471295584464/images/v3/onboarding/img-question.png" width="56" height="56" className="mh--default"/>
                </div>
                <div className="tw3-mediav2__body text--white tw3-h5 text--bold">
                    <p className="tw3-h5 m0">Câu hỏi <span className="jsAnsweredQuestions">{question_num+1}/10</span></p>
                    <p className="tw3-h4 text--white jsQuestion">{question_content}</p>
                </div>
                <div className="tw3-mediav2__actions">
                    <p>
                        <a className="tw3-button tw3-button--white tw3-button--subtle tw3-button--large tw3-button--rounded jsAnswerQuestion mr--compact" onClick={this.handleAnswerQuestion.bind(this, 1)}>có</a>
                        <a className="tw3-button tw3-button--white tw3-button--subtle tw3-button--large tw3-button--rounded jsAnswerQuestion" onClick={this.handleAnswerQuestion.bind(this, 0)}>không</a>
                    </p>
                    <p className="m0">
                        <a className="text--white jsSkipQuestion text--line" onClick={this.handleSkipQuestion}>bỏ qua</a>
                    </p>
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    const { authentication, users, question }=state;
    return { authentication, users, question };
}
const connectedSmartOnBoardingStep2=connect(mapStateToProps)(SmartOnBoarding_Step2);
export { connectedSmartOnBoardingStep2 as SmartOnBoarding_Step2 }