import React from "react";
import { connect } from "react-redux";
import { Layout, Menu } from 'antd';

class Header extends React.Component{
    
    render(){
        return(
            <Layout.Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">Dashboard</Menu.Item>
                    <Menu.Item key="2">Thiết lập</Menu.Item>
                </Menu>
            </Layout.Header>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(Header);
export {connected as Header}