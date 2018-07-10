import React from "react";
import { connect } from "react-redux";
import {pageActions,userActions} from "../actions";
import {ImproveMatchYours, QuestionsLoaderSection} from "./index";
class EditQuestion extends React.Component{
    constructor(props){
        super(props);
        this.handleSwitchView=this.handleSwitchView.bind(this);
    }
    handleSwitchView(){
        const {dispatch,authentication } = this.props;
        dispatch(pageActions.switchView('details'));
        dispatch(userActions.getMemberDetails(authentication.user.user_id));
        
    }
    render(){
        return(
            <div className="jsView">
                <div className="tw3-profile__header">
                <a href="javascript://" className="jsSwitchView" onClick={this.handleSwitchView}><i className="tw3-iconArrowLeft tw3-iconMedium mr--compact el--vam"></i></a>
                Câu hỏi
                </div>
                <div className="jsQuestionsTabSection">
                    <div className="tw3-profile__body__box">
                        <div className="tw3-row jsHighestMatchContainer">
                            <h4 className="mb--loose text--center">Điểm phù hợp cao nhất của bạn là</h4>
                            <div className="mb--default text--center">
                                <div className="canvasHolder">
                                    <canvas className="jsHighestPossibleMatch tw3-profile__highestPossibleMatchCanvas" dir="ltr" data-value="75" width="100" height="100"></canvas>
                                </div>
                            </div>
                            <div className="tw3-col-12 text--center">
                                <p className="text--smaller mb--default jsQuestionsLeftDiscover">Trả lời <strong><span>96</span> câu hỏi nữa</strong> để có cơ hội khám phá những người phù hợp nhất với bạn</p>
                            </div>
                        </div>
                    </div>
                    <hr className="tw3-hr mb--default" />
                    <ImproveMatchYours/>
                    <hr className="tw3-hr mb--default" />
                    <QuestionsLoaderSection/>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(EditQuestion);
export { connected as EditQuestion}