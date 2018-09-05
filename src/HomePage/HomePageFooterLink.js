import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
class HomePageFooterLink extends React.Component{
    
    render(){
        return(
            <div className="homepageLinks homepageLinks--bottom jsHomepageFooterLinks">
            <div className="homepageLinks--bottom__links">
                <ul>
                    <li>
                        <Link to="/about">Thông tin</Link>
                    </li>
                    <li>
                        <a href="http://www.massivemedia.eu" target="_blank">Việc làm</a>
                    </li>
                    <li>
                        <Link to="/download">Ứng dụng</Link>
                    </li>
                    <li>
                        <Link to="/faq">Hỏi đáp</Link>
                    </li>
                    <li>
                        <Link to="/about/terms">Đ. khoản &amp; Đ. kiện</Link>
                    </li>
                    <li>
                        <Link to="/about/privacy">Riêng tư</Link>
                    </li>
                    <li>
                        <Link to="/about/cookie">Cookie</Link>
                    </li>
                    <li>
                        <Link to="/about/safety">An toàn</Link>
                    </li>
                    <li>
                        <a href="https://www.twoo.com/blog" target="_blank">Blog</a>
                    </li>
                </ul>
            </div>
            <div className="homepageLinks--bottom__counter">
                
            </div>
            <div className="tw3-homepage--abstract__loader jsHomepageFacebookLoader">
                <div className="centerBlock">
                    <div className="centerBlock__item">
                        <span>
        Đăng nhập bằng Facebook...
        </span>
                    </div>
                </div>
            </div>
            <div className="homepageLinks--bottom__mobile">

            </div>
        </div>

        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(HomePageFooterLink)
export {connected as HomePageFooterLink }