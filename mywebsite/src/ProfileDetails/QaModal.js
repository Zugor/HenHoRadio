import React from "react";
import { connect } from "react-redux";
import { modalActions, questionActions } from "../actions";
const QUESTIONTYPE=require('../data/question').questionType;

class QaModal extends React.Component{
    constructor(props){
        super(props);
        var {data} = this.props;
        this.state={
            answer_id : (data && data.answer_id) ? data.answer_id : null,
            answer  : (data && data.answer) ? data.answer : null,
            accepted : (data && data.answer_accepted) ? data.answer_accepted : null,
            importance : (data && data.importance) ? data.importance : null,
            disabled  : (data && data.answer != null  && data.importance != null  && data.answer_accepted) ? 0 : 1,
            private : (data && data.private) ? data.private : 0,
            explanation : (data && data.explanation) ? data.explanation : '',
        }
        
        this.closeModal=this.closeModal.bind(this);
        this.setPrivate = this.setPrivate.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    setPrivate() {
        this.setState({private : !this.state.private});
    }
    deleteAnswer() {
        const { authentication, dispatch } = this.props;
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';
        var answer_id = this.state.answer_id;
        if(answer_id){
            this.props.dispatch(questionActions.deleteAnsweredQuestion(answer_id, user_id));
            dispatch(modalActions.closeModal());
        }
    }
    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({[name]: value});
        if(this.state.answer != null && this.state.importance != null)
            this.setState({disabled: 0});
        else
            this.setState({disabled: 1});
    }
    handleSubmit(event) {
        event.preventDefault();
        const { authentication, data, dispatch } = this.props;
        var _data = event.target;
        var accepted = [];
        if(_data.accepted) _data.accepted.forEach(function (item) {
            accepted.push(+item.checked);
        });
        
        var answer_object = {
                            answer          : data.answerlist.length == 2 ? +!Number(_data.answer.value) : Number(_data.answer.value),
                            explanation     : _data.explanation.value,
                            answer_accepted : accepted,
                            private         : Number(this.state.private),
                            importance      : Number(_data.importance.value),
                            };
        var answer_id = this.state.answer_id;
        var user_id=authentication.loggedIn ? authentication.user.user_id : '';
        var question_id = data.question_id;

        answer_id   ?   dispatch(questionActions.updateAnsweredQuestion(answer_id, user_id, answer_object))
        :   dispatch(questionActions.answerImproveQuestion(answer_object, question_id, user_id));
        dispatch(modalActions.closeModal());
        dispatch(questionActions.getAnsweredQuestion(user_id));
    }
    closeModal(e){
        const { dispatch } =this.props;
        dispatch(modalActions.closeModal());
    }
    render(){
        var {data} = this.props;

        const _data ={
            answerlist          : (data) ? data.answerlist : [],
            category            : (data) ? data.category : null,
            question            : (data) ? data.question : null,
            question_id         : (data) ? data.question_id : null,
            answer              : (data && 'answer' in data) ? data.answer : null,
            answer_accepted     : (data && data.answer_accepted) ? data.answer_accepted : [],
            answer_id           : (data && data.answer_id) ? data.answer_id : null,
            explanation         : (data && data.explanation) ? data.explanation : null,
            importance          : (data && data.importance) ? data.importance : 0,
            private             : (data && data.private) ? data.private : 0,
            time_create         : (data && data.time_create) ? data.time_create : null,
        }
        return(
<div className="jsQaModalContent" data-questionid={_data.question_id}>
<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
    {data && data.answer_id &&
    <a className="tw3-box--qAndA__delete jsQuestionDelete right tw3-tooltip jsTooltip cp" href="javascript://" onClick={this.deleteAnswer} data-text="Xóa và bỏ qua câu hỏi">
        <i className="tw3-iconTrash tw3-iconMedium tw3-iconGrey right"></i>
    </a>
    }
    <div className="tw3-row text--center">
        <div className={`mb--compact tw3-qAndACategory__item--${ _data.category }--badge mb--default`}>
        {QUESTIONTYPE[_data.category]}</div>
    </div>
    <h4 className="tw3-qAndA__question text--bold pb--default">{_data.question}</h4>
    <ul className="tw3-qAndA__answerHolder mb--default mb--loose">
        { _data.answerlist.length > 0 &&
            _data.answerlist.map((e,i)=>{   

                return (<li key={i}>
                    <label>
                        <input type="radio" defaultChecked={(_data.answer === +!i && _data.answerlist.length==2) || (_data.answer === i && _data.answerlist.length!=2)} name="answer" defaultValue={_data.answerlist.length>2 ? +!i : i} className="mr--compact tw3-radio--custom"/>
                        <span style={{textTransform: 'capitalize'}}>{e}</span>
                    </label>
                    </li>)
            })
        }
    </ul>

    <h6 className="text--subtle text--upper">Những câu trả lời bạn có thể chấp nhận</h6>
    <ul className="tw3-qAndA__answerHolder mb--default mb--loose">
        { _data.answerlist.length > 0 &&
            _data.answerlist.map((e,i)=>{  
                console.log(_data.answer_accepted[i]);
                                       
                return (<li key={i}>
                        <label>
                            <input type="checkbox" name="accepted" defaultChecked={(_data.answer_accepted[1-i] && _data.answer_accepted.length==2) || (_data.answer_accepted[i] && _data.answer_accepted.length>2)} defaultValue={_data.answerlist.length==2 ? +!i : i} className="mr--compact tw3-checkbox--custom jsAcceptedAnswer"/>
                            <span style={{textTransform: 'capitalize'}}>{e}</span>
                        </label>
                        </li>)
            })
        }
    </ul>

    <h6 className="text--subtle text--upper">Tầm quan trọng</h6>

    <div className="jsImportanceBlock">
        <ul className="tw3-qAndA__answerHolder mb--default mb--loose">
            <li>
                <label><input type="radio" name="importance" defaultChecked={_data.importance==1} value="1" className="mr--compact tw3-radio--custom"/><span>Một chút</span></label>
            </li>
            <li>
                <label><input type="radio" name="importance" defaultChecked={_data.importance==2} value="2" className="mr--compact tw3-radio--custom"/><span>Hơi</span></label>
            </li>
            <li>
                <label><input type="radio" name="importance" defaultChecked={_data.importance==3} value="3" className="mr--compact tw3-radio--custom"/><span>Rất</span></label>
            </li>
        </ul>
    </div>

    <p className="jsImportanceBlockIrrelevant text--italic text--subtle mb--default hide">
        Bạn chấp nhận tất cả câu trả lời cho câu hỏi này, và như vậy câu hỏi này sẽ không còn quan trọng nữa.
    </p>

    <h6 className="text--subtle text--upper">Lời giải thích của bạn</h6>
    <textarea name="explanation" className="tw3-textarea tw3-textarea--autogrow mb--default jsTextAreaAutoGrow" placeholder="Giải thích cho câu trả lời (không bắt buộc)" maxLength="250" defaultValue={_data.explanation}/>
    <div className="tw3-qAndA__anonymousToggle jsQuestionPrivateToggleHolder text--right">
        <input type="hidden" id="private" name="private" value="0"/>
        <a href="javascript://" onClick={this.setPrivate} className={`jsQuestionPrivateToggle tw3-tooltip jsTooltip el--inlineBlock tw3-qAndA__anonymousToggle__${ this.state.private ? 'inactive' : 'active' }`} data-text="Đặt thành câu hỏi riêng tư">
            <i className={`tw3-iconAnonymous tw3-iconLarge ${this.state.private ? 'tw3-iconBlue' : 'tw3-iconGrey'}`}></i>
        </a>
    </div>
    <div className="tw3-buttonGroup text--center mb--default">
        <input type="submit" className={`tw3-button tw3-button--blue tw3-button--rounded${ this.state.disabled ? ' tw3-button--disabled' : ''}`} value="Lưu" disabled={ this.state.disabled }/>
        <a className="tw3-button tw3-button--subtle jsClose tw3-button--rounded" href="javascript://" onClick={this.closeModal}>Hủy</a>
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
const connected=connect(mapStateToProps)(QaModal);
export {connected as QaModal}