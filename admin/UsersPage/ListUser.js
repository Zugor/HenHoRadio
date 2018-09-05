import React from "react";
import { connect } from "react-redux";
import {modalActions} from "../actions";
import { FormAddUser } from './index';

import { Table, Divider } from 'antd';

class ListUser extends React.Component{
    constructor(props){
      super(props);
    }
    handleEditUser(data){
        const { dispatch } = this.props;
        dispatch(modalActions.openModal({content:<FormAddUser/>}));
        console.log(data);
    }
    handleDeleteUser(data){
      const { dispatch } = this.props;
      dispatch(modalActions.openModal({content:<FormAddUser/>}));
      console.log(data);
    }
    render(){
      const userList = this.props.users.data ? this.props.users.data.users : [];
      var data = [];
      userList.map(function(user, i){
        data.push({key: i,...user})
        //data.push((({ user_id,fullname,phone,address,gender }) => ({ key: i,user_id,fullname,phone,address,gender }))(user));
      });
      const columns = [{
          title: 'Tên',
          dataIndex: 'fullname',
          key: 'fullname',
          render: text => <a href="javascript:;">{text}</a>,
        }, {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          key: 'phone',
        }, {
          title: 'Địa chỉ',
          dataIndex: 'address',
          key: 'address',
        }, {
          title: 'Giới tính',
          key: 'gender',
          dataIndex: 'gender',
          render: gender => (
            <span>
              {gender ? 'Nam' : 'Nữ'}
            </span>
          ),
        }, {
          title: 'Yêu cầu',
          key: 'action',
          render: (text, record) => (
            <span>
              <a href="javascript:;" onClick={this.handleEditUser.bind(this, record)}>Sửa</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={this.handleDeleteUser.bind(this, record)}>Xóa</a>
            </span>
          ),
        }];
        return(
            <Table columns={columns} dataSource={data} />
        )
    }
}
function mapStateToProps(state){
  const { users }=state;
  return { users };
}
const connected=connect(mapStateToProps)(ListUser);
export {connected as ListUser}