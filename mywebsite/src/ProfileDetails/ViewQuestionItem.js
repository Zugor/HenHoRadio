import React from "react";
import { connect } from "react-redux";
import {modalActions, questionActions} from "../actions";
import { QaModal } from "./index";           
const QUESTIONTYPE=require('../data/question').questionType;

class ViewQuestionItem extends React.Component{
    constructor(props){
        super(props);
    }
    handleOpenAnswer(data){
        const { dispatch } = this.props;
        dispatch(modalActions.openModal({ className: 'tw3-modal--qAndA  tw3-modal--medium  tw3-modal--padding--slack ',content:<QaModal data={data}/>}));
   }
    render(){
        const { data }  = this.props; 
        const _data ={
            answer              : data.answer,
            answer_accepted     : data.answer_accepted,
            answer_id           : data.answer_id,
            answerlist          : data.answerlist,
            category            : data.category,
            explanation         : data.explanation,
            importance          : data.importance,
            private             : data.private,
            question            : data.question,
            question_id         : data.question_id,
            time_create         : data.time_create,
        }
        return(
<div className="mb--compact">
    <div data-questionid={_data.question_id} className="tw3-box--qAndA--subtle  jsQuestionBlock" data-edit-feedback="Câu trả lời của bạn đã được lưu.">
        <div className={`tw3-qAndACategory__item--${ _data.category }--badge mb--default`}>
        {QUESTIONTYPE[_data.category]}</div>

        <div className="tw3-field">
            <div className="tw3-field__view">

                <div className="tw3-qAndA__question">{_data.question}</div>

                <ul className="tw3-qAndA__answerHolder mb--default">
                    { _data.answerlist.length > 0 &&
                        _data.answerlist.map((e,i)=>{                         
                            return (<li key={i} className={`tw3-qAndA__answer${ (data.answer == i) ? ' tw3-qAndA__answer--answered tw3-qAndA__answer--acceptable' :'' }`} style={{textTransform: 'capitalize'}}>
                                        <i className="tw3-qAndA__answer__bullet"></i>{e}
                                    </li>)
                        })
                    }
                </ul>

                <div className="tw3-qAndA__explanation">
                    <div className="tw3-row">
                        <div className="tw3-col-8">
                            <textarea placeholder="Giải thích thêm..." className="tw3-textarea tw3-textarea--autogrow jsTextAreaAutoGrow jsQuestionExplanation" name="explanation" maxLength="250" defaultValue={_data.explanation}/>
                        </div>
                        <div className="tw3-col-4 text--right">
                            <input type="submit" defaultValue="Gửi" className="tw3-qAndA__explanation__send tw3-qAndA__explanation__send--disabled jsQuestionExplanationSubmit mr--default"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tw3-field__editIcon">
                <i className="tw3-iconPencil tw3-iconDefault tw3-iconGrey jsQaEdit" onClick={this.handleOpenAnswer.bind(this, _data)}></i>
            </div>
        </div>
    </div>

</div>

        );
    }
}
function mapStateToProps(state){
    const { AnsweredQuestion }=state;
    return { AnsweredQuestion };
}
const connected = connect(mapStateToProps)(ViewQuestionItem);
export { connected as ViewQuestionItem }