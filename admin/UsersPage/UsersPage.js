import React from "react";
import { connect } from "react-redux";
import { Header, Footer, Sider } from "../sections";
import { Layout } from 'antd';
import { Filter, ListUser } from './index';
import { usersAction } from '../actions';
import 'antd/dist/antd.css';

const { Content } = Layout;

class UsersPage extends React.Component{
    componentDidMount(){
        this.props.dispatch(usersAction.getUserList(1));
    }
    render(){
        return(
            <Layout>
                <Header/>
                <Layout>
                    <Sider/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: '16px 0', minHeight: 280 }}>
                            <Filter/>
                            <ListUser/>
                        </Content>
                        <Footer/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
function mapStateToProps(state){
    const { users }=state;
    return { users };
}
const connected=connect(mapStateToProps)(UsersPage);
export {connected as UsersPage}