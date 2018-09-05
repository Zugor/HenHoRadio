import React, {Fragment} from "react";
import {connect} from "react-redux";
import Select, { components } from 'react-select';
import {userActions} from "../actions";
class Combobox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            options: (this.props.field) ? this.props.field.data : [],
            disabled: false,
			searchable: this.props.searchable,
			onselect: false,
			clearable: true,
			rtl: false,
            placeholder: (this.props.field) ? this.props.field.label : '',
            field : (this.props.field) ? this.props.field : null,
        }
        this.clearValue=this.clearValue.bind(this);
        this.updateValue=this.updateValue.bind(this);
    }
    clearValue (e) {
		this.select.setInputValue('');
	};
	updateValue (newValue) {
		this.setState({
			selectValue: newValue,
            onselect: true,
		});
        const { dispatch ,authentication, field } = this.props;
        const user={
            field   : field.key,
            user_id : (authentication.loggedIn) ? authentication.user.user_id : '',
            value   : newValue,
        }
        dispatch(userActions.updateDetails(user));
	};
    render(){
        const { options } = this.state;
        //console.log(options);
        //console.log(this.state);
        const selectValue= (this.props.field) ? this.props.field.value : '';
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
        return(
            <Select
					ref={(ref) => { this.select = ref; }}
					onBlurResetsInput={false}
					onSelectResetsInput={false}
					options={options}
					name={this.state.field.key}
					disabled={this.state.disabled}
                    value={(this.state.onselect) ? this.state.selectValue : selectValue}
                    components={{Menu}}
					searchable={this.state.searchable}
                    placeholder={this.state.placeholder}
				/>
        )
    }
}
function mapStateToProps(state){
    const {authentication} =state;
    return {authentication};
}
const connected=connect(mapStateToProps)(Combobox);
export { connected as Combobox}