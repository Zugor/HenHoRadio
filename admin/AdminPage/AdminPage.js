import React from "react";
import { connect } from "react-redux";
import { Header, Footer, Sider } from "../sections";
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Content } = Layout;

class AdminPage extends React.Component{
    
    render(){
        return(
            <Layout>
                <Header/>
                <Layout>
                    <Sider/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: '16px 0', minHeight: 280 }}>
                          Admin Page  
                        </Content>
                        <Footer/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(AdminPage);
export {connected as AdminPage}