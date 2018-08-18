import React from "react";
import {connect } from "react-redux";
import {Link } from "react-router-dom";
class LikeView extends React.Component{
    render(){
        const {item}=this.props;
       // console.log(item);
        var data={
            fullname:item.fullname,
            age:2,
            avatar:'/image/t/'+item.like_user_id,
        }
        return(
            <li className="row cp jsVisitButton">
                <div className="peopleList__item__image">
                    <Link to=" /photos/?u=1450808601&amp;view=show&amp;id=674691327#photo" className="tw3-avatarContainer photoBox">
                        <img src={data.avatar} alt={data.fullname} className="tw3-avatar--circle tw3-avatar--fluid" />
                        </Link>
                </div>
                <div className="peopleList__item__info">
                    <p className="peopleList__item__info__title">
                        <Link to={`/profile/`+item.like_user_id} className="text--bold jsVisitButton" >{data.fullname}, {data.age}</Link>
                    </p>
                    <p className="peopleList__item__info__description text--small">
                                        {data.description}
                    </p>
                    </div>
                    <div className="peopleList__item__actions">
                    <div>
                        <a href="#" className="jsChatButton tw3-button tw3-button--subtle tw3-button--grey jsChatLink" >
                            <i className="tw3-iconDoubleBubble tw3-iconMedium"></i> 
                                <span>Chat với {(data.gender==1) ? 'anh ấy' : 'cô ấy'}</span>
                        </a>
                    </div>
                </div>
            </li>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected = connect(mapStateToProps)(LikeView);
export { connected as LikeView };