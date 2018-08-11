import React from "react";
import { connect } from "react-redux";

class ProfileBar extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }
    render(){
        return (
<div className="jsSidebar tw3-sidebarContainer" id="profileBar">
    <div className="tw3-box tw3-box--premium mb--compact">
        <h4 className="tw3-h4 text--bold">Twoo Gói Cao Cấp</h4>
        <p className="text--subtle mb--default">Bạn sẽ có nhiều chức năng hơn để trải nghiệm thú vị hơn.</p>
        <a href="#" data-type="PREMIUM" data-trigger="accountsettings" className="jsPaywall tw3-button tw3-button--full tw3-button--premium" data-has-alias="0">
        Kích hoạt Gói Cao Cấp</a>
    </div>

    <div className="tw3-box tw3-box--credits mb--compact">
        <h4 className="tw3-h4 text--bold">Tín dụng Twoo</h4>
        <p className="text--subtle mb--default">
            Bạn đang có <strong className="text--black"><span className="jsCreditsCount">0</span> Tín dụng</strong>
            <br/> Làm nổi bật sơ yếu với Tín dụng.
        </p>
        <a href="#" data-type="CREDITS" data-trigger="settings" className="jsPaywall tw3-button button--xlarge tw3-button--full tw3-button--credits" style={{border: 'none'}} data-topuptext="Top up" data-has-alias="0">Mua Tín dụng</a>
    </div>

    <div className="tw3-box mb--compact jsAddonFirstInSearchPromoHolder">
        <h4 className="tw3-h4 text--bold">Hiện đầu mục Tìm kiếm Mỗi ngày</h4>
        <p className="text--subtle mb--default">Đăng ký Hiện đầu mục Tìm kiếm, bạn sẽ tự động được hiện đầu các kết quả tìm kiếm mỗi ngày.</p>
        <form method="post" action="/addon?singlePackageFlow=true" className="jsAddonForm">
            <span className="tw3-button--loaderContainer jsLoader" style={{display: 'block'}}>
              <button className="tw3-button tw3-button--fis tw3-button--full jsSubmitButton tw3-button--rounded" style={{width: '100%'}} data-has-alias="0">
              <i className="tw3-iconFisFilled tw3-iconWhite"></i> Để tôi Hiện đầu mục Tìm kiếm
              </button>
              <span></span>
            </span>
        </form>
    </div>

    <div className="tw3-box mb--compact jsAddonBoostPromoHolder">
        <h4 className="tw3-h4 text--bold">Gây Chú ý Mỗi ngày</h4>
        <p className="text--subtle mb--default">Đăng ký dịch vụ Gây Chú ý, sơ yếu của bạn sẽ được Làm mọi người chú ý mỗi ngày.</p>
        <form method="post" action="/addon?singlePackageFlow=true" className="jsAddonForm">
            <span className="tw3-button--loaderContainer jsLoader" style={{display: 'block'}}>
                <button className="tw3-button tw3-button--boost tw3-button--full jsSubmitButton tw3-button--rounded">
                <i className="tw3-iconBoost tw3-iconWhite"></i> Gây Chú ý cho tôi
                </button>
                <span></span>
            </span>
        </form>
    </div>

    <div className="tw3-box mb--compact jsAddonPickMePromoHolder">
        <h4 className="tw3-h4 text--bold">Khám phá Mỗi ngày</h4>
        <p className="text--subtle mb--default">Đăng ký Khám phá, bạn sẽ được hiện 100 lần trong mục Khám phá mỗi ngày.</p>
        <form method="post" action="/addon?singlePackageFlow=true" className="jsAddonForm">
            <span className="tw3-button--loaderContainer jsLoader" style={{display: 'block'}}>
                <button className="tw3-button tw3-button--pickme tw3-button--rounded tw3-button--full jsSubmitButton" style={{width: '100%'}} data-has-alias="0">
                <i className="tw3-iconPickme tw3-iconWhite"></i> Hiện 100 lần ở mục Khám phá
                </button>
                <span></span>
            </span>
        </form>
    </div>

    <div className="tw3-box mb--compact jsAddonSpotlightPromoHolder">
        <h4 className="tw3-h4 text--bold">Tiêu điểm Mỗi ngày</h4>
        <p className="text--subtle mb--default">Đăng ký dịch vụ Tiêu điểm, bạn sẽ lên Tiêu điểm mỗi ngày.</p>
        <form method="post" action="/addon?singlePackageFlow=true" className="jsAddonForm">
            <span className="tw3-button--loaderContainer jsLoader" style={{display: 'block'}}>
                <button className="tw3-button tw3-button--spotlight tw3-button--full jsSubmitButton tw3-button--rounded" data-has-alias="0">
                <i className="tw3-iconSpotlight tw3-iconWhite"></i> Lên Tiêu điểm
                </button>
                <span></span>
            </span>
        </form>
    </div>

</div>
        )
    }
}
function mapStateToProps(state){
    const { authentication }=state;
    return { authentication };
}
const connected=connect(mapStateToProps)(ProfileBar);
export { connected as ProfileBar } 