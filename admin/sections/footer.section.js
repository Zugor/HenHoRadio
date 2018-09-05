import React from "react";
import { connect } from "react-redux";
import { Layout } from 'antd';

class Footer extends React.Component{
    render(){
        return(
            <Layout.Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Layout.Footer>
        )
    }
}
function mapStateToProps(state){
    return state;
}
const connected=connect(mapStateToProps)(Footer);
export {connected as Footer}