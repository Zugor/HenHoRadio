import React from "react";
import { connect } from "react-redux";
import {modalActions} from "../actions";
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd';
import { FormAddUser } from './index';

const { Search } = Input
const { RangePicker } = DatePicker
const ColProps = {
    xs: 24,
    sm: 12,
    style: {
      marginBottom: 16,
    },
  }
  
  const TwoColProps = {
    ...ColProps,
    xl: 96,
  }

class WrappeFilter extends React.Component{
    constructor(props){
      super(props);
      this.handleOpenModal=this.handleOpenModal.bind(this);
    }
    handleOpenModal(){
        const { dispatch } = this.props;
        dispatch(modalActions.openModal({content:<FormAddUser/>}));
    }
    handleFields = (fields) => {
        const { createTime } = fields
        if (createTime.length) {
          fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
        }
        return fields
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('search', { initialValue: '' })(<Search placeholder="Tìm kiếm" />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }} id="addressCascader">
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} id="createTimeRangePicker">
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <div className="flex-vertical-center">
            <Button type="ghost" onClick={this.handleOpenModal}>Tạo</Button>
          </div>
        </div>
      </Col>
    </Row>
        )
    }
}

const Filter = Form.create()(WrappeFilter);

function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(Form.create()(Filter));
export {connected as Filter}