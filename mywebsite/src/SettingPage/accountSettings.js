import React from "react";
import { connect } from "react-redux";

class AccountSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEdit            : false,
            showChangePassword  : false,
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleShowEdit=this.handleShowEdit.bind(this);
        this.handleShowChangePassword=this.handleShowChangePassword.bind(this);
    }
    handleSubmit(){
        this.setState({
            showEdit            : false,
            showChangePassword  : false,
        });
    }
    handleShowEdit(){
        this.setState({showEdit  : true});
    }
    handleShowChangePassword(){
        this.setState({showChangePassword  : true});
    }
    componentDidMount(){
    }
    render(){
        const { users, userDetails } = this.props;
        var _users=(users.item && users.item.status && users.item.user.length > 0) ? users.item.user[0] : {};
        var _userDetails=(userDetails.user && userDetails.user.status && userDetails.user.result.length > 0) ? userDetails.user.result[0] : {};
        var _data={
            is_active                : _users.is_active,
            mobile_active            : _users.mobile_active,
            phone                    : _users.phone,
            facebook                 : _userDetails.facebook,
            email                    : _userDetails.emails && _userDetails.emails.email,
        }
        var showEdit           = this.state.showEdit;
        var showChangePassword = this.state.showChangePassword;
        return (
<div className="tw3-box mb--compact" id="account-settings">
    <div className={`tw3-editable__block jsEditableBlock jsAccountSettingsContainer ${showEdit && 'tw3-editable__block--editing'}`}>

        <div className="tw3-field__editIcon">
            <a href="javascript://" onClick={this.handleShowEdit} className="jsEditButton" style={showEdit ? {display: 'none'} : {}}>
                <i className="tw3-iconGrey tw3-iconPencil"></i>
            </a>
            <a href="javascript://" onClick={this.handleSubmit} className="jsDoneButton text--bold text--blue text--smaller cursor--pt" style={!showEdit ? {display: 'none'} : {}}>
            XONG <i className="tw3-iconCheckSolid"></i>
            </a>
        </div>
        <h5 className="jsEditableBlockTitle text--bold mb--default">
            <i className="tw3-iconGrey mr--compact tw3-iconAccount tw3-iconOrange"></i>TÀI KHOẢN
        </h5>

        <div className="tw3-field">
            <div className="tw3-field__view">
                <div className="tw3-form">
                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 mb--tight text--subtle">
                            Địa chỉ email của bạn
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            {_data.email}
                            <br/>
                        </div>
                    </div>
                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 mb--tight text--subtle">
                            Tình trạng tài khoản
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            {!_data.is_active ? 'Hoạt động' : 'Ẩn'}
                        </div>
                    </div>
                    <div className="tw3-form__row tw3-row">
                        <div className="tw3-col-12 tw3-bp3-col-5 mb--tight text--subtle">
                            <label htmlFor="changePassword">Mật khẩu</label>
                        </div>
                        <div className="tw3-col-12 tw3-bp3-col-7">
                            •••••••
                        </div>
                    </div>
                </div>
            </div>
            <div className="tw3-field__edit tw3-field__edit--area">
            <form method="post" action="/settings">
                <div className="tw3-form__row tw3-row">
                    <div className="tw3-col-12 tw3-bp3-col-5 mb--tight">
                        <label htmlFor="email" className="text--subtle">Địa chỉ email của bạn</label>
                    </div>
                    <div className="tw3-col-12 tw3-bp3-col-7">
                        <input type="email" name="email" className="tw3-text" defaultValue={_data.email}/>
                    </div>
                </div>

                <div className="tw3-form__row tw3-row">

                    <div className="tw3-col-12 tw3-bp3-col-5 mb--tight ">
                        <label htmlFor="accountStatus" className="text--subtle">Tình trạng tài khoản</label>
                    </div>

                    <div className="tw3-col-12 tw3-bp3-col-7">

                        <div className="tw3-row">
                            <div className="tw3-col-5 tw3-bp3-col-5">
                                <div className="tw3-dropdownHolder jsCustomDropdownSingle tw3-dropdownHolder--nativeOnly" name="accountStatus">
                                    <div className="tw3-dropdownHolder--mobile jsDropdownMobileHolder">
                                        <div className="tw3-dropdown--native jsDropdownNative">
                                            <div className="tw3-dropdownHolder__native__content jsDropdownContent">
                                                <select className="" name="accountStatus">
                                                    <option value="ACTIVE" selected={!_data.is_active ? 1 : 0}>Hoạt động</option>
                                                    <option value="FROZEN" selected={_data.is_active ? 1 : 0}>Ẩn</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tw3-col-2 tw3-bp3-col-2">
                                <a href="javascript://" className="tw3-tooltip jsTooltip">
                                    <i className="tw3-iconQuestionMark tw3-iconMedium tw3-iconGrey tw3-iconGrey "></i>
                                </a>
                            </div>

                            <div className="tw3-col-5 tw3-bp3-col-5 text--right">
                                <a className="jsDeleteAccount" style={{lineHeight: '40px'}}>Xóa tài khoản</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw3-form__row tw3-row">
                    <div className="tw3-col-12 tw3-bp3-col-5 mb--tight ">
                        <label htmlFor="password" className="text--subtle">Mật khẩu</label>
                    </div>
                    <div className="tw3-col-12 tw3-bp3-col-7">

                        <div className="tw3-form__row tw3-row jsChangePasswordDisplay">
                            <div className="tw3-col-2 tw3-bp3-col-3">
                                •••••••
                            </div>
                            <div className="tw3-col-10 tw3-bp3-col-9">
                                <a href="javascript://" onClick={this.handleShowChangePassword} id="change-password" style={showChangePassword ? {display: 'none'} : {}}>Đổi mật khẩu</a>
                            </div>
                        </div>

                        <div className="tw3-row" id="editPassword" style={!showChangePassword ? {display: 'none'} : {}}>
                            <div className="tw3-col-12 tw3-bp3-col-12">

                                <div className="tw3-box tw3-box--subtle">
                                    <div className="tw3-form">
                                        <div className="tw3-form__row">
                                            <div className="tw3-form__label">
                                                <label htmlFor="currentPassword" className="text--subtle">Mật khẩu hiện tại</label>
                                            </div>
                                            <div className="tw3-form__input mb--tight">
                                                <input type="password" name="currentPassword" autoComplete="off" className="tw3-text"/>
                                            </div>
                                            <div className="tw3-row">
                                                <div className="tw3-col-1">
                                                    <i className="tw3-iconCircleFacebook tw3-iconMedium tw3-iconFacebookColor" style={{verticalAlign: 'middle'}}></i>
                                                </div>
                                                <div className="tw3-col-11" style={_data.facebook ? {} : {display : 'none'}}>
                                                    <span className="text--grey text--small">Bạn đã kết nối qua Facebook, nên có thể bạn không có mật khẩu. <a href="/settings?action=forgotPassword">Nhấn đây</a> để đặt lại mật khẩu.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tw3-form__row">
                                            <div className="tw3-form__label">
                                                <label htmlFor="newPassword" className="text--subtle">Mật khẩu mới</label>
                                            </div>
                                            <div className="tw3-form__input">
                                                <input type="password" name="newPassword" id="jsNewPassword" autoComplete="off" className="tw3-text"/>
                                                <div className="passwordStrength hide">
                                                    <div className="passwordStrength__barsHolder">
                                                        <div className="passwordStrength__bar"></div>
                                                        <div className="passwordStrength__bar"></div>
                                                        <div className="passwordStrength__bar"></div>
                                                        <div className="passwordStrength__bar"></div>
                                                        <div className="passwordStrength__bar"></div>
                                                    </div>
                                                    <div className="passwordStrength__info"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tw3-form__row">
                                            <div className="tw3-form__label">
                                                <label htmlFor="confirmPassword" className="text--subtle">Xác nhận mật khẩu mới</label>
                                            </div>
                                            <div className="tw3-form__input">
                                                <input type="password" name="confirmPassword" autoComplete="off" className="tw3-text"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
        )
    }
}
function mapStateToProps(state){
    const { authentication, users, userDetails }=state;
    return { authentication, users, userDetails };
}
const connected=connect(mapStateToProps)(AccountSettings);
export { connected as AccountSettings } 