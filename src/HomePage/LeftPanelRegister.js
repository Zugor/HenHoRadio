import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";

import FacebookLogin from 'react-facebook-login';
import { pageActions,modalActions,userActions } from "../actions";

class LeftPanelRegister extends React.Component{
    constructor(props){
        super(props);
        this.responseFacebook=this.responseFacebook.bind(this);
    }
    responseFacebook(res) {
        const { dispatch } = this.props;
        
        const { id,email,name,accessToken,picture}= res;
        console.log(res);
        let data = {accessToken: accessToken, 
            fullname: name, 
            picture: picture.data ? picture.data.url : null,
            by: 'facebook',
        };
        dispatch(userActions.loginWith3rd(id,email,data,'',(err,e)=>{}));
    }
    render(){
        return(
         <div className="tw3-pane tw3-pane--left">
         <div className="tw3-pane__content">
            <div className="homepageContainer__content__logo">
               <div id="facebookLoadingRegister" className="homepageContainer__content__logo__loader">
                  <div className="mb--default">
                     <img src="https://twoo-a.akamaihd.net/static/682503600911326952191/images/logos/logo-twoo-flat-white@2x.png" height="42" />
                  </div>
                  <h4 className="newFontSize fcor">Vui lòng chờ chúng tôi tạo tài khoản cho bạn...</h4>
                  <div className="tw3-box--loading"></div>
               </div>
               <div id="facebookLoadingLogin" className="homepageContainer__content__logo__loader">
                  <div className="mb--default">
                     <img src="https://twoo-a.akamaihd.net/static/682503600911326952191/images/logos/logo-twoo-flat-white@2x.png" height="42" />
                  </div>
                  <h4 className="newFontSize fcor">Đợi chút! Bạn đang đăng nhập...</h4>
                  <div className="tw3-box--loading"></div>
               </div>
            </div>
            <div className="mb--default">
               <img src="https://twoo-a.akamaihd.net/static/682503600911326952191/images/logos/logo-twoo-flat-white@2x.png" height="42" />
            </div>
            <h1 className="h1--step1 fw500">
              <b> Kết bạn mới nghiêm túc, tin cậy, bảo mật.</b>
            </h1>
            <p>
            HHR nơi gặp những người bạn mới nghiêm túc, tin cậy. Cơ hội mới tìm cho mình một nửa ưng ý. 
            </p>
           <span className="text--bolder">Đăng ký thành viên HHR để: </span><br/>
             <p>   
                <span style={{textIndent:"15px",display:"inline-block"}}>- Tìm những người bạn mới thú vị một cách đơn giản, bảo mật.</span> <br/>
                <span style={{textIndent:"15px",display:"inline-block"}}>- Nghe lại các chương trình Hẹn Hò Radio trên VOV Giao thông.</span>
            </p>
            <span className="text--bolder">Nếu thích, bạn có thể: </span>
            <p className="mb--slack">    
               <span style={{textIndent:"15px",display:"inline-block"}}>
                - Tham gia kết bạn trong chương trình Hẹn Hò radio trên VOV Giao thông.  
                </span>
            </p>   
            
            <div className="mb--tight">
               <div className="jsLoginOptions">
                    <FacebookLogin
                        appId="275785029894237"
                        autoLoad={false}
                        textButton="Đăng nhập với Facebook"
                        language="vi_VN"
                        size="medium"
                        icon="fa-facebook"
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                    />
               </div>
            </div>
            <small>(Đăng nhập cách này nhanh hơn, chúng tôi không bao giờ đăng lên Facebook của bạn)</small>
         </div>
      </div>
        
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(LeftPanelRegister);
export { connected as LeftPanelRegister}