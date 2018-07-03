import React from "react";
import { connect } from "react-redux";

class ViewImage extends React.Component{
    
    render(){
        const {image} = this.props;
        
        return(
            <div className="tw3-profile__body__box tw3-profile__body__boxMedia jsIndexMedia">
                <h5 className="text--bold tw3-h5 hide tw3-bp3-col-show-block">HÌNH &amp; VIDEO</h5>
                <div className="tw3-showMoreContainer" style={{height: '100%'}}>
                <div className="tw3-profile__mediabox__row">
                    <div className="tw3-profile__mediabox__item tw3-profile__mediabox__action tw3-profile__mediabox__private jsTriggerPhotoBox">
                            <a href="javascript://"></a>
                            <div className="mb--compact"><i className="tw3-iconLock tw3-iconWhite"></i></div>
                            <div className="text--bold text--small text--white">
                            Cá nhân (1)
                            </div>
                    </div>
                    <div className="tw3-profile__mediabox__item tw3-profile__mediabox__item--hover  jsTriggerPhotoBox">
                        <img src="https://twoo04-a.akamaihd.net/t/8ecdd65e5f227b7815505eaf2895141c_1_6_0_1225_1633_180_180_0016567349.jpg" style={{width: '100%', height: '100%'}}className="el-vam" />
                    </div>
                    <div className="tw3-profile__mediabox__item tw3-profile__mediabox__item--hover  jsTriggerPhotoBox">
                        <img src="https://twoo02-a.akamaihd.net/c/e7294035d3424bad8f637f35714aed8d_1_20000000000011810629_0_1633_1225_180_180_0011160852.jpg" style={{width: '100%', height: '100%'}} className="el-vam" />
                    </div>
                    <div className="tw3-profile__mediabox__item tw3-profile__mediabox__item--hover  jsTriggerPhotoBox">
                        <img src="https://twoo04-a.akamaihd.net/t/84df71bd1f0e343274807ff25f0a6a45_1_6_2_960_720_180_180_0001467136.jpg" style={{width: '100%', height: '100%'}} className="el-vam" />
                    </div>
                </div>
                <div className="tw3-profile__mediabox__row">
                    <div className="tw3-profile__mediabox__item tw3-profile__mediabox__item--hover  jsTriggerPhotoBox">
                        <img src="https://twoo02-a.akamaihd.net/t/80e944bfb380fdfc4c80bbc4ad9091fd_1_6_2_512_512_180_180_0002910230.jpg" style={{width: '100%', height: '100%'}} className="el-vam" />
                    </div>
                    <div className="tw3-profile__mediabox__item tw3-profile__mediabox__action">
                        <img src="https://twoo-a.akamaihd.net/static/864505989717655270395861131/shared/i/blank.gif" style={{width: '100%', height: '100%', backgroundColor: '#f9f9f9'}} />
                    </div>
                    <div className="tw3-profile__mediabox__item tw3-profile__mediabox__action">
                        <img src="https://twoo-a.akamaihd.net/static/864505989717655270395861131/shared/i/blank.gif" style={{width: '100%', height: '100%', backgroundColor: '#f9f9f9'}} />
                    </div>
                    <div className="tw3-profile__mediabox__item tw3-profile__mediabox__action">
                        <img src="https://twoo-a.akamaihd.net/static/864505989717655270395861131/shared/i/blank.gif" style={{width: '100%', height: '100%', backgroundColor: '#f9f9f9'}} />
                    </div>

                </div>
                </div>
            </div>

        )
    }
}
function mapStateToProps(state){
    const {image,authentication} = state; 
    return { image,  authentication} ;
}
const connectedViewImage = connect(mapStateToProps)(ViewImage);
export {connectedViewImage as ViewImage }