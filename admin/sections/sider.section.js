import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const Sider = withRouter(props => {
    const { location } = props;
    return(
        <Layout.Sider width={200} style={{ background: '#fff' }}>
            <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['AccountManager']}
            style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="/accounts"><Link to="/accounts"><span><Icon type="user" />Người dùng</span></Link></Menu.Item>
            </Menu>
        </Layout.Sider>
    )
});

function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(Sider);
export {connected as Sider}