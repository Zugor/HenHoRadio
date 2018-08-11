import React from "react";
import {connect} from "react-redux";
import Select from 'react-select';

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
	};
    render(){
        const { options } = this.state;
        //console.log(options);
        //console.log(this.state);
        const selectValue= (this.props.field) ? this.props.field.value : '';
        return(
            <Select
					className="state-select"
					ref={(ref) => { this.select = ref; }}
					onBlurResetsInput={false}
					onSelectResetsInput={false}
					options={options}
					name={this.state.field.key}
					disabled={this.state.disabled}
					value={(this.state.onselect) ? this.state.selectValue : selectValue}
					onChange={this.updateValue}
					searchable={this.state.searchable}
                    placeholder={this.state.placeholder}
                    style={{container: () => ({
                        zIndex : 3
                      })}}
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