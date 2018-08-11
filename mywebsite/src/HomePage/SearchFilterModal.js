import React, {Fragment} from "react";
import { connect } from "react-redux";
import noUiSlider from "nouislider";
import { Combobox } from "./index";
import Select, { components } from 'react-select';

const STATE       = require('../data/state');
const CONTRIBUTORS       = require('../data/contributors');
const SINGLE       = require('../data/single');

class SearchFilterModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            advancedMenu    : [],
            gender          : 'FEMALE',
        }
        this.select = {};
        this.updateValue=this.updateValue.bind(this);
        this.handleChangeGender=this.handleChangeGender.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    clearValue (index) {
        var advancedMenu = this.state.advancedMenu;
        delete this.select[advancedMenu[index].value];
        advancedMenu.splice(index, 1);
        this.setState({advancedMenu: advancedMenu});
    };
	updateValue (topic) {
        var advancedMenu = this.state.advancedMenu;
        advancedMenu.findIndex(obj => obj.value === topic.value) === -1 &&
            advancedMenu.push(topic);  
            
        this.setState({advancedMenu: advancedMenu});
    };
    handleChangeGender(e){
        this.setState({gender: e.target.value});
    }
    componentDidMount(){
        var ageSlide = document.getElementById('jsAgeSlider');
        var nodes = [
            document.getElementById('jsAgeSlideMinValue'),
            document.getElementById('jsAgeSlideMaxValue')
        ];
        var input = [
            document.getElementById('minAge'),
            document.getElementById('maxAge')
        ]; 
        noUiSlider.create(ageSlide, {
            start: [18, 30],
            connect: true,
            step: 1,
            range: {
                'min': 18,
                'max': 90
            }
        });
        ageSlide.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
            nodes[handle].innerHTML = Number(values[handle]);
            input[handle].value     = Number(values[handle]);
        });
    }
    
    handleSubmit(e){
        e.preventDefault();
        var advancedFilter = {};
        for(let obj in this.select)
            if(this.select[obj]) advancedFilter[obj] = this.select[obj].state.value;
        var data = {
            gender          : this.state.gender,
            location        : e.target.location.value,
            minAge          : e.target.minAge.value,
            maxAge          : e.target.maxAge.value,
            advancedFilter  : advancedFilter
        } 
        console.log(data);
        
    }

    render(){
        const  { users } =this.props;
        var _users=(users.item && users.item.status && users.item.user.length > 0) ? users.item.user[0] : {};
        var _field=[
            { key: 'location', label: 'Nhập thành phố của bạn',data: STATE ,value: _users.address },
            { key: 'AdvancedFilter', label: 'Thêm tiêu chí',data: CONTRIBUTORS.title },
        ]

        const IconOption = (props) => (
            <components.Option {...props} className="tw3-dropdown--custom__content__option jsDropdownOption">
              <i className="tw3-icon tw3-iconPlus"></i> {props.data.label}
            </components.Option>
        );
        const Menu = (props) => {
            return (
              <Fragment>
                <div className="tw3-dropdown--custom jsDropdownCustom open">
                    <components.Menu {...props} className="tw3-dropdown--custom__content jsDropdownContent">
                    {props.children}
                    </components.Menu>
                </div>
              </Fragment>
            );
          };
        
        var {advancedMenu} = this.state;
        return(
<div className="text--left jsSearchFilterSettingsContainer searchFilter--detailedFilter">
    <h3 className="text--bold mr--default text--center">Lựa chọn tìm kiếm</h3>
    <form className="clearfix jsFormFilterSimplified jsInitiated" onSubmit={this.handleSubmit}>
        <p className="text--smaller text--bold">Tôi muốn gặp</p>
        <div className="tw3-row clearfix mb--compact">
            <div className="tw3-col-12 mb--compact">
                <div className="jsCustomJavascriptDropdown">
                    <div className="tw3-dropdownHolder jsCustomDropdownSingle tw3-dropdownHolder--nativeOnly" name="gender" single="single"placeholder="">
                        <div className="tw3-dropdownHolder--mobile jsDropdownMobileHolder">
                            <div className="tw3-dropdown--native jsDropdownNative">
                                <div className="tw3-dropdownHolder__native__content jsDropdownContent">
                                <select value={this.state.gender} onChange={this.handleChangeGender} name="gender">
                                        <option value="FEMALE">Phụ nữ</option>
                                        <option value="MALE">Đàn ông</option>
                                        <option value="BOTH">Mọi người</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p className="text--smaller text--bold">Độ tuổi</p>
        <div className="tw3-row clearfix mb--default">
            <div className="tw3-col-1 text--left">
                <span id="jsAgeSlideMinValue" className="jsAgeSlideValue text--bold text--subtle"></span>
            </div>
            <div className="tw3-col-10 pt--compact">
                <div id="jsAgeSlider" className="jsAgeSlider plr--compact">
                </div>
            </div>
            <div className="tw3-col-1 text--right">
                <span id="jsAgeSlideMaxValue" className="jsAgeSlideValue text--bold text--subtle"></span>
            </div>
            <input type="hidden" id="minAge" name="minAge" defaultValue="18"/>
            <input type="hidden" id="maxAge" name="maxAge" defaultValue="30"/>
        </div>

        <p className="text--smaller text--bold">Vị trí</p>
        <div className="tw3-row clearfix mb--compact">
            <div className="tw3-col-12 mb--compact">
                <div className="jsAutoCompleterLocation">
                    <Combobox field={_field[0]}  />
                </div>
            </div>
        </div>

        <p className="text--smaller text--bold">
            Điều kiện tìm kiếm nâng cao <span className="jsAdvancedFilterCount" style={{display: 'none'}}> - </span> <a href="javascript:;" className="jsFilterSimplifiedReset" style={{display: 'none'}}>Bắt đầu lại</a> </p>
        <div className="tw3-row clearfix jsFilterAdvance mb--default">
            
            {advancedMenu.length > 0 && advancedMenu.map((topic,i)=>{
                return (
            <div key={i} className="jsSearchFilterInputContent ">
                <div className="tw3-dropdownHolder jsCustomDropdownMultiple jsAdvancedFilter tw3-col-12 mb--compact tw3-dropdownHolder--outline">
                    <div className="tw3-dropdownHolder--desktop jsDropdownDesktopHolder">
                        <a href="javascript://" onClick={this.clearValue.bind(this, i)} className="jsDropdownDelete tw3-dropdown--custom__actions__delete left mr--compact pt--compact"><i className="tw3-iconDelete tw3-iconGrey"></i></a>
                        <div className="tw3-dropdown--custom jsDropdownCustom open">
                            <Select
                                isMulti
                                ref={(ref) => { this.select[topic.value] = ref }}
                                name={'advancedFilter['+topic.value+']'}
                                options={SINGLE[topic.value]}
                                placeholder={topic.label}
                            />
                        </div>
                    </div>
                </div>
            </div>
                )
            })}
            <div className="tw3-col-12 mb--compact jsSearchFilterInputContent jsOnboardingSelectAdvancedFilter">
                <div className="tw3-dropdownHolder jsCustomDropdownMultiple tw3-dropdownHolder--small">
                    <div className="tw3-dropdownHolder--desktop jsDropdownDesktopHolder">
                        <Select
                            className="advanced-select"
                            onBlurResetsInput={false}
                            onChange={this.updateValue}
                            onSelectResetsInput={false}
                            options={_field[1].data}
                            value=""
                            components={{ Option: IconOption, Menu}}
                            searchable={true}
                            placeholder={_field[1].label}
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="tw3-buttonGroup text--center">
            <input type="submit" className="tw3-button tw3-button--rounded tw3-button--blue mb--tight" defaultValue="Thay đổi"/>
        </div>
    </form>
</div>
        )
    }
    
}
function mapStateToProps(state){
    const { authentication,users } = state;
    return { authentication,users };
}
const connected=connect(mapStateToProps)(SearchFilterModal);
export {connected as SearchFilterModal}