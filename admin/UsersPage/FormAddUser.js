import React from "react";
import { connect } from "react-redux";
import {modalActions, usersAction} from "../actions";
import moment from "moment";
import { Form, Input, InputNumber, Radio, Cascader, DatePicker, Icon, Select, Button, Divider } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

import {title as TITLE}     from 'DATA/contributors';
const CONTRIBUTORS        = require('DATA/single');

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}
const tailFormItemLayout = {
  wrapperCol: {
      span: 14,
      offset: 8,
  },
};
class wrap extends React.Component{
  state = {
    expand        : false,
  }
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }
  handleSubmit = () => {
    const { getFieldsValue } = this.props.form;
    var data = getFieldsValue();
    for(let key in data) {
      if(['fullname','phone','password','gender','dob'].indexOf(key) === -1 ){
        let value = data[key];
        value ? data[key] = {label: CONTRIBUTORS[key][value-1].label, value: Number(value)}
        : data[key] = null;
      }
    }
    if(data.dob) data['dob'] = moment(data.dob).format();
    console.log(data);
    this.props.dispatch(usersAction.addUser(data));
  }
  render(){
      const { getFieldDecorator } = this.props.form;
      return(
    <Form layout="horizontal">
      <FormItem label="Tên" hasFeedback {...formItemLayout}>
        {getFieldDecorator('fullname', {
          rules: [
            {
              required: true,
            },
          ],
        })(<Input/>)}
      </FormItem>
      <FormItem label="Số điện thoại" hasFeedback {...formItemLayout}>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              pattern: /^0[189](\d{8}|\d{9})$/,
              message: 'Số điện thoại không đúng!',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="Mật khẩu" hasFeedback {...formItemLayout}>
        {getFieldDecorator('password', {
          rules: [{
            required: true, 
            message: 'Vui lòng nhập mật khẩu!',
          }],
        })(
          <Input type="password" />
        )}
      </FormItem>
      <FormItem label="Giới tính" {...formItemLayout}>
        {getFieldDecorator('gender', {
          rules: [
            {
              required: true,
              type: 'boolean',
            },
          ],
        })(<Radio.Group>
          <Radio value>Nam</Radio>
          <Radio value={false}>Nữ</Radio>
        </Radio.Group>)}
      </FormItem>
      <FormItem {...formItemLayout} label="Ngày sinh">
        {getFieldDecorator('dob', {
          rules: [
            { 
              type: 'object', 
              required: true, 
              message: 'Hãy chọn ngày sinh!' 
            },
          ],
        })(<DatePicker placeholder="Chọn ngày sinh" format={'DD/MM/YYYY'}/>)}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
          <a style={{ fontSize: 12 }} onClick={this.toggle}>
          Thông tin chi tiết <Icon type={this.state.expand ? 'up' : 'down'} />
          </a>
      </FormItem>
      <div style={{ display: this.state.expand ? 'block' : 'none' }}>
        {
          TITLE.map(function(section, i){
            if(['zodiac','hight','photos','video'].indexOf(section.value) === -1 )
            return(
              <FormItem {...formItemLayout} label={section.label} key={i}>
              {getFieldDecorator(section.value, {
              })(
                <Select>
                  <Option value="">&nbsp;</Option>
                  {
                    CONTRIBUTORS[section.value] && CONTRIBUTORS[section.value].map(function(contributor, j){
                    return(
                          <Option key={j} value={contributor.value}>{contributor.label}</Option>
                    )
                  })
                }
                </Select>
              )}
            </FormItem>
            )
          })
        }
      </div>
      <Divider style={{marginBottom: 10}}/>
      <div style={{textAlign: 'right'}}>
        <Button key="submit" type="primary" onClick={this.handleSubmit}>Tạo</Button>
      </div>
    </Form>
      )
  }
}

const FormAddUser = Form.create()(wrap);

function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(FormAddUser);
export {connected as FormAddUser}