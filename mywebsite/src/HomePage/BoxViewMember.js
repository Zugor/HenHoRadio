import React from "react";
import {connect} from "react-redux";
import { BoxViewPagination,SearchFilter,ViewMemberItem } from "./index";

import { userActions } from "../actions";
class BoxViewMember extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    render(){
        const {memberActive,like, page} = this.props;
        const data=(memberActive.items && memberActive.items.users ) ? memberActive.items.users : [];
        var loadingObj = [];
        for (let i = 0; i < 8; i++) {
            loadingObj.push(<div key={i} className="col-md-12">
                                <div className="jsMobilePager tw3-card--gridFlex tw3-card--dummy" data-page={page}>
                                    <a href={'/search?page='+page+1} data-page={page+1} className="jsPagerItem">
                                        <div className="tw3-card noline">
                                            <div className="tw3-card__avatar">
                                                <img src="/img/img-dummy-card-avatar.png" style={{width: '100%',verticalAlign: 'top'}}/>
                                            </div>
                                            <div className="tw3-card__userInfo">
                                                <div className="tw3-card__actions">
                                                    <div className="badge--lightgrey badge--matchScore vam" style={{height: '20px',width: '50%'}}></div>
                                                </div>
                                                <div className="loadingBlock" style={{display: 'inline-block', height: '20px', width: '60%',backgroundColor: '#eeeeee'}}></div>
                                                <div className="loadingBlock" style={{display: 'inline-block', height: '20px', width: '100%',backgroundColor: '#eeeeee'}}></div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>);
        }
        return(
        <div className="tw3-wrapper">
            <div className="tw3-search tw3-search--results">
                <SearchFilter/>
                <div className="tw3-content">
                    <div className="tw3-search__results">
                        <div className="tw3-container">
                        <div className="tw3-row tw3-results jsSearchResults">
                            <div className="tw3-col-12">
                                <div className="jsDesktopNextResultsContainer">
                                    <div className="clearfix">
                                        <div className="clearfix photoBlockContainer tw3-search__cardHolder">
                                            <div className="tw3-cards jsResults">
        { memberActive.loading && loadingObj
        }
        { data.length > 0 &&
            data.map((e,i)=>{
                return (<ViewMemberItem key={i} data={e}/>)
            })
        }
                                          
                                            </div>
                                        </div>
                                    </div>
                                    <BoxViewPagination page={this.props.page} />
                                </div>
                                
                            </div>
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
    const { memberActive }= state;
    return { memberActive };
}
const connectedBoxViewMember=connect(mapStateToProps)(BoxViewMember);
export { connectedBoxViewMember as  BoxViewMember }