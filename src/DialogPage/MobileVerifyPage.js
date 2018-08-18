import React from "react";
import { connect } from "react-redux";
import { PaymentMobile } from "./index";
class MobileVerifyPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            openCallapse: false,
        }
        this.handleCollapse=this.handleCollapse.bind(this);
    }
    handleCollapse(){
        const { openCallapse } = this.state;
        this.setState({
            openCallapse: !openCallapse
        })
    }
    render(){
        return(<div>
               
<div className="jsPaywallContent tw3-modal--payments--loading" >
    <div className="tw3-modal--payments__header tw3-promoHor tw3-media--figure--fluid">
        <div className="tw3-media tw3-media--middle">
            <div className="tw3-media__figure"><img src="https://twoo-a.akamaihd.net/static/257997514276286711669756/shared/i/blank.gif" className="tw3-promoHor__icon" style={{ background: "url('https://twoo-a.akamaihd.net/static/257997514276286711669756/images/onboarding/img-yellow-credits.png')", backgroundSize: '100'}} width="64" height="64" /></div>
            <div className="tw3-media__content">
                <h4 className="">
                    Xác nhận sơ yếu của bạn!
                </h4>
                <div className="jsFullHeader">
                    <p>
                        Thực hiện thanh toán 1 lần bằng điện thoại.
                    </p>
                </div>
            </div>
            <div className="tw3-media__actions"></div>
        </div>
    </div>
    <div className="tw3-modal--payments__content jsPaywallContainer pos--rel">
        <div className="tw3-container--fluid">
            <div className="jsMobileErrors tw3-modal--payments__errorsHolder--nextStep">
                <div className="tw3-row">

                </div>
            </div>
            <div className=" paymentsTabs jsProviders tw3-row ">
                <div className="tw3-row">
                    <div className="tw3-col-12">
                    </div>
                </div>
                <div className="tw3-row">
                    <div className="tw3-col-12">
                        <ul className="clearfix jsMainProviders">
                            <li className="paymentsTabs__tab selected" data-globalprovider="FORTUMO_WEB" data-provider="FORTUMO_WEB">
                                <a href="#" className="noline">
                                    <div className="paymentsTabs__tab__img"><img src="https://twoo-a.akamaihd.net/static/257997514276286711669756/images/v3/payments/icon-fortumo-web.png" width="32" alt=""/></div>
                                    <div className="paymentsTabs__tab__label">
                                        Di động </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="tw3-row">
                <div className="tw3-col-12"></div>
            </div>
            <div className="jsPaymentArea tw3-modal--payments__paymentArea tw3-row pos--rel">
                <div className="paymentsPackage jsPricepoints clearfix">
                    <div className="tw3-row">
                        <div className="tw3-col-12"></div>
                    </div>
                    <div className="tw3-row">
                    </div>
                </div>
                <div className="paymentsForm clearfix">
                    <div className="tw3-row">
                        <div className="tw3-col-12">
                            <PaymentMobile/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="paymentsTc tw3-row jsTermsContainer">
                <div className={(this.state.openCallapse) ? "collapseMenu collapseMenu--active" : "collapseMenu"}>
                    <div className="collapseMenu__icons jsConditions"><i className="tw3-iconCheckUpFilled tw3-iconGrey tw3-iconNormal"></i><i className="tw3-iconCheckDownCircle tw3-iconGrey tw3-iconNormal"></i></div>
                    <div className="jsTermsSummary hide  " style={{display: 'block'}} >
                    <a href="javascript://" onClick={()=>{this.handleCollapse()}} className="jsConditions text--black jsAnimate">Điều kiện</a></div>
                    <div className="jsTermsFull hide" style={(this.state.openCallapse) ? {display: 'block'} : {display: 'none'} } >
                        <div className="text--bold text--small mt--default">
                            Điều khoản Dịch vụ của Tín dụng Twoo </div>
                        <ol className="m0">
                            <li>Khi bạn mua hoặc nhận được Tín dụng, bạn được cấp quyền hạn chế để sử dụng chúng cho những dịch vụ tuyệt vời trên Twoo như Tiêu điểm, hiện Đầu mục Tìm kiếm, Quà tặng, Tin nhắn Nổi bật và Biểu tượng. Bạn không được quyền sở hữu Tín dụng hoàn toàn.</li>
                            <li>Tín dụng sau khi mua không hoàn lại được.</li>
                            <li>Twoo có thể điều chỉnh giá Tín dụng bất kỳ lúc nào. Và khi có điều chỉnh, tiền nạp Tín dụng tự động vẫn bằng với mức cũ mà bạn mua bạn đầu. Chúng tôi cũng có thể thay đổi hình thức thanh toán và dịch vụ có thể sử dụng bằng Tín dụng. Chúng tôi giữ lại quyền dừng phát hành Tín dụng bất kỳ khi nào (nhưng chuyện này hầu như sẽ không xảy ra).</li>
                            <li>Để tiện lợi cho bạn, chúng tôi đưa ra dịch vụ tự động nạp Tín dụng trên Twoo. Nếu bạn không tắt chức năng này, chúng tôi sẽ tự động nạp thêm cùng một số lượng Tín dụng với cùng hình thức thanh toán so với lần bạn mua cuối cùng khi bạn còn ít hơn 300 Tín dụng để bạn không bao giờ hết Tín dụng. Bạn có thể bỏ chọn chức năng này khi mua Tín dụng hoặc thay đổi bất kỳ lúc nào trong mục <a href="/settings">Thiết lập</a>. Các thành viên sử dụng PayPal có thể dừng hợp đồng thanh toán PayPal với Twoo bất kỳ lúc nào. Bạn chỉ cần làm theo các bước trong mục <a href="/faq?category=PREMIUM">Các câu hỏi</a>.</li>
                            <li>Để tiện lợi cho bạn tận hưởng, chúng tôi đưa ra dịch vụ sử dụng Tín dụng Mỗi ngày để mọi người chú ý đến bạn ngay cả khi bạn không online. Bạn có thể tắt chức năng này bất kỳ lúc nào trong mục <a href="/settings">Thiết lập</a>.</li>
                            <li>Tín dụng sẽ hết hạn sau khi mua 91 ngày (nhưng chúng tôi tin bạn sẽ sử dụng hết trước ngày đó!). Nếu bạn nhận được Tín dụng miễn phí hoặc khuyến mãi, chúng tôi có thể chuyển chúng thành hết hạn bất kỳ lúc nào. Nếu bạn xóa tài khoản (hy vọng là bạn không làm vậy, vì chúng tôi sẽ rất buồn?!) hoặc nếu Twoo xóa tài khoản của bạn (vì vi phạm quy định!), bạn sẽ mất tất cả Tín dụng.</li>
                            <li>Bằng cách mua Tín dụng bạn đã đồng ý với <a href="/about/terms" target="_blank">Điều khoản &amp; Điều kiện</a> của chúng tôi như bên trên.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div><span className="jsLoaderText-poller hide">Vui lòng đợi trong khi giao dịch của bạn được xử lý...</span><span className="jsLoaderText-android hide">Vui lòng làm theo các bước trong cửa sổ Google Play để hoàn thành thanh toán của bạn.</span><span className="jsLoaderText-windows hide">Vui lòng làm theo các bước trong cửa sổ Windows Store để hoàn tất việc mua.</span>
</div>
<div className="tw3-modal--payments__features text--left jsPaywallFeatures">
    <div className="tw3-modal--payments__features__header text--bold mobile">
        <div className="collapseMenu">
            <div className="collapseMenu__icons"><i className="tw3-iconCheckUpFilled tw3-iconGrey tw3-iconNormal"></i><i className="tw3-iconCheckDownCircle tw3-iconGrey tw3-iconNormal"></i></div>
            Sử dụng Tín dụng của bạn để:
        </div>
    </div>
    <div className="tw3-modal--payments__features__content mobile mt--default">
        <div className="hide jsFteaureListToggle">
            <div className="text--bold mb--default desktop">Sử dụng Tín dụng của bạn để:</div><i className="tw3-iconBoost tw3-iconBoostColor mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Gây Chú ý sơ yếu của bạn
            </p><i className="tw3-iconHighlightFilled tw3-iconOrange mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Làm nổi bật tin nhắn của bạn
            </p><i className="tw3-iconMessageBomb tw3-iconMessageBombColor mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Tiếp cận được với hơn 100 phụ nữ trong một lần!
            </p><i className="tw3-iconGiftFilled tw3-iconOrange mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Gửi một món quà
            </p><i className="tw3-iconPickme tw3-iconPickmeColor mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Hiện 100 lần ở mục Khám phá
            </p><i className="tw3-iconSpotlight tw3-iconSpotlightColor mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Xuất hiện trên Tiêu điểm
            </p><i className="tw3-iconFis tw3-iconFisColor mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Đưa bạn lên Đầu mục Tìm kiếm
            </p><i className="tw3-iconStickers tw3-iconYellow mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Mua thêm các gói Biểu tượng
            </p><i className="tw3-iconHeart tw3-iconBrightGreen mr--tight left"></i>
            <p className="ml--default mb--default clearfix">
                Thích đặc biệt và tăng gấp đôi cơ hội tìm người phù hợp
            </p>
        </div>
    </div>
    <div className="tw3-modal--payments__features__content desktop">
        <div className="text--bold mb--default desktop">Sử dụng Tín dụng của bạn để:</div><i className="tw3-iconBoost tw3-iconBoostColor mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Gây Chú ý sơ yếu của bạn
        </p><i className="tw3-iconHighlightFilled tw3-iconOrange mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Làm nổi bật tin nhắn của bạn
        </p><i className="tw3-iconMessageBomb tw3-iconMessageBombColor mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Tiếp cận được với hơn 100 phụ nữ trong một lần!
        </p><i className="tw3-iconGiftFilled tw3-iconOrange mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Gửi một món quà
        </p><i className="tw3-iconPickme tw3-iconPickmeColor mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Hiện 100 lần ở mục Khám phá
        </p><i className="tw3-iconSpotlight tw3-iconSpotlightColor mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Xuất hiện trên Tiêu điểm
        </p><i className="tw3-iconFis tw3-iconFisColor mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Đưa bạn lên Đầu mục Tìm kiếm
        </p><i className="tw3-iconStickers tw3-iconYellow mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Mua thêm các gói Biểu tượng
        </p><i className="tw3-iconHeart tw3-iconBrightGreen mr--tight left"></i>
        <p className="ml--default mb--default clearfix">
            Thích đặc biệt và tăng gấp đôi cơ hội tìm người phù hợp
        </p>
    </div>
</div>

               </div>)
    }
}
function mapStateToProps(state){
    const { users } = state;
    return { users };
}
const connected = connect(mapStateToProps)(MobileVerifyPage);
export { connected as MobileVerifyPage }