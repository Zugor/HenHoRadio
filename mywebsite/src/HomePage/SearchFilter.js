import React from "react";
import {connect} from "react-redux";
import {modalActions} from "../actions";
import { SearchFilterModal } from "./index";

class SearchFilter extends React.Component{
    constructor(props){
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }
    handleOpenModal(){
        const { dispatch } = this.props;
        dispatch(modalActions.openModal({ className: 'tw3-modal--qAndA  tw3-modal--medium  tw3-modal--padding--slack ',content:<SearchFilterModal/>}));
    }
    componentDidMount(){
        
    }
    render(){
        return (
            <form action="/search" method="post" className="clearfix jsFormFilter" id="formFilter" rel="ajax">
                <div className="tw3-container pos--rel">
                    <div className="tw3-tabsHolder tw3-profileTabsHolder jsSearchTabs">
                        <div className="tw3-tabsPane">
                            <a href="javascript:;" data-order="all" className="tw3-tab--v2 jsSearchTab selected">Tất cả</a>
                            <a href="javascript:;" data-order="online" className="tw3-tab--v2 jsSearchTab ">Online</a>
                            <a href="javascript:;" data-order="new" className="tw3-tab--v2 jsSearchTab ">Mới
                                <i className="tw3-iconOnlineStatus tw3-iconOrange jsOrangeBolleke"></i>
                            </a>
                            <a href="javascript:;" data-order="hottest" className="tw3-tab--v2 jsSearchTab ">Được chú ý</a>
                        </div>
                        <div className="tw3-search__options jsSearchFilterBlock">
                            <a href="javascript://" onClick={this.handleOpenModal} className="text--subtle jsSearchFilterOpenModal text--smaller text--bold">
                                <i className="tw3-iconOptions mr--compact"></i>Lựa chọn tìm kiếm <span className="jsAdvancedFilterCount" style={{display:'none'}}>(0)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
function mapStateToProps(state){
    const { memberActive }= state;
    return { memberActive };
}
const connectedBoxViewMember=connect(mapStateToProps)(SearchFilter);
export { connectedBoxViewMember as  SearchFilter }