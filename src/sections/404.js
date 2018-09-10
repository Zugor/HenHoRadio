import React from "react";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { HeaderVisible, Header, HeaderMobile } from "./index";
class PageNotFound extends React.Component{
    componentDidMount(){
        //this.props.dispatch(userAction.All());
    }
    render(){
        const { authentication }=this.props;
        
        if(!authentication.loggedIn){
           return  <Redirect to={ `/#login` } />
        }
        return (
            <div>
            <HeaderVisible />
            <HeaderMobile />
            <Header view={this.props.view}/>
            <div className="tw3-wrapper">
                <div className="tw3-content">
                    <div className="notfound__heroImage"></div>
                        <div className="tw3-container">
                            <div className="text--center">
                                <h2 className="tw3-h2 text--blue">404</h2>
                                <h4 className="tw3-h4 text--bold">Không tìm thấy trang này.</h4>
                                <p className="text--subtle">
                                Có thể đường dẫn bạn dùng bị hỏng, sơ yếu đã bị xóa, hoặc có thể trang của chúng tôi đang bị lỗi.
                                </p>
                            <div className="text--center">
                                <Link to="/" className="tw3-button tw3-button--blue tw3-button--rounded">Trở lại mục Tìm bạn</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connectedPageNotFound=connect(mapStateToProps)(PageNotFound);
export { connectedPageNotFound as PageNotFound } 