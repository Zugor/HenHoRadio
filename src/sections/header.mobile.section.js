import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class HeaderMobile extends React.Component{
    render(){
        const { users } = this.props;
        var _users=(users.item && users.item.status && users.item.user.length > 0) ? users.item.user[0] : {};
        let previewThumbnail='';
        if(_users.preview_thumbnail){
            previewThumbnail=hostname+"/image/t/"+_users.preview_thumbnail;
        }else{
            if(_users.gender == 1){
                previewThumbnail="/img/avatar-male-sm.jpg";
            }
            if(_users.gender==2){
                previewThumbnail="/img/avatar-female-sm.jpg";
            }
        }
        if(previewThumbnail==''){
            previewThumbnail="/img/avatar-male-sm.jpg";
        }
        var _data={
            fullname            : _users.fullname,
            preview_thumbnail   : previewThumbnail
        }
        return (
<div className="tw3-header--mobile--menu jsHeaderMobileMenu">
    <ul className="tw3-menu">
        <li>
            <div className="tw3-row">
                <Link to="/profile">
                    <div className="tw3-menu__avatar">
                        <img src={_data.preview_thumbnail} className="tw3-avatar tw3-avatar--circle tw3-avatar--fluid" width="32" height="32"/>
                    </div>
                    <div className="tw3-menu__title">
                        Sơ yếu
                    </div>
                </Link>
            </div>
        </li>
        <li>
            <div className="tw3-row">
                <a href="#" data-type="PREMIUM" data-trigger="dropdownlink" className="jsPaywall noline clearfix">
                    <div className="tw3-menu__avatar"><i className="tw3-iconPremiumSolid tw3-iconGreen tw3-iconBig"></i></div>
                    <div className="tw3-menu__title"><span className="tw3-header__navigation__item__label">Kích hoạt Gói Cao Cấp</span></div>
                </a>
            </div>
        </li>
        <li>
            <div className="tw3-row">
                <Link to="/activity/likes">
                    <div className="tw3-menu__avatar"><i className="tw3-iconVoteYes tw3-iconBig"></i></div>
                    <div className="tw3-menu__title">
                        Người bạn thích
                    </div>
                </Link>
            </div>
        </li>
        <li>
            <div className="tw3-row">
                <Link to="/activity/whoiknow">
                    <div className="tw3-menu__avatar"><i className="tw3-iconWhoYouKnow tw3-iconBig"></i></div>
                    <div className="tw3-menu__title">
                        Bạn bè
                        <span className="jsCount tw3-badge badge--darkRed" data-type="friend_invites" data-count="1">•</span></div>
                </Link>
            </div>
        </li>
        <li>
            <div className="tw3-row">
                <Link to="/activity/matches">
                    <div className="tw3-menu__avatar"><i className="tw3-iconHeartLine tw3-iconBig"></i></div>
                    <div className="tw3-menu__title">
                        Người phù hợp với bạn
                        <span data-type="matches" data-count="0" className="jsCount tw3-badge badge--darkRed" style={{display : 'none'}}></span></div>
                </Link>
            </div>
        </li>
        <li>
            <div className="tw3-row">
                <a href="#" className="jsPaywall" data-type="CREDITS" data-trigger="dropdownlink">
                    <div className="tw3-menu__avatar"><i className="tw3-iconCreditsFilled tw3-iconYellowOrange tw3-iconBig"></i></div>
                    <div className="tw3-menu__title">
                        Tín dụng
                    </div>
                </a>
            </div>
        </li>
        <li>
            <div className="tw3-row">
                <a href="javascript:;" data-trigger="dropdown" data-productid="38" className="jsBuyProduct">
                    <div className="tw3-menu__avatar"><i className="tw3-iconBoost tw3-iconBoostColor tw3-iconBig"></i></div>
                    <div className="tw3-menu__title">
                        Gây Chú ý</div>
                </a>
            </div>
        </li>
        <li className="tw3-menu__row--grey">
            <div className="tw3-row">
                <div className="tw3-menu__avatar"><i className="tw3-iconBrowseInvisible tw3-iconBig tw3-iconBlue"></i></div>
                <div className="tw3-menu__title">
                    Duyệt ẩn danh
                    <div className="right jsToggleAnonymousContainer">
                        <a data-gavpv="/premium/trigger/browseanonymously" data-type="PREMIUM" data-trigger="anonymousbrowsing" href="#" className="jsPaywall trackgavpv" title="Chúng tôi ẩn danh tính của bạn khi bạn thăm các thành viên khác">
                            <div className="tw3-switch">
                                <input id="cmn-mobile-toggle-4" className="tw3-switch__ui tw3-switch__ui--flat" type="checkbox"/>
                                <label htmlFor="cmn-mobile-toggle-4"></label>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </li>
        <li className="tw3-menu__row--grey">
            <div className="tw3-row">
                <Link to="/settings">
                    <div className="tw3-menu__avatar"><i className="tw3-iconSettings tw3-iconBig"></i></div>
                    <div className="tw3-menu__title">
                        Thiết lập
                    </div>
                </Link>
            </div>
        </li>
        <li className="tw3-menu__row--grey">
            <div className="tw3-row">
                <a href="/logout" onClick={this.handleLogout}>
                    <div className="tw3-menu__avatar"><i className="tw3-iconLogout tw3-iconBig"></i></div>
                    <div className="tw3-menu__title">
                        Đăng xuất
                    </div>
                </a>
            </div>
        </li>
    </ul>
</div>
        )
    }
}
function mapStateToProps(state){
    const { users } = state;
    return { users };
}
const connectedBanner=connect(mapStateToProps)(HeaderMobile);
export { connectedBanner as HeaderMobile};