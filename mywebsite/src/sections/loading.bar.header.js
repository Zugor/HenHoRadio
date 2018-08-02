import React from 'react';
import { connect } from "react-redux";
import LoadingBar from 'react-redux-loading-bar';

class Loading extends React.Component{
  render() {
    return (
      <header>
        <LoadingBar />
      </header>
      
    )
  }
}

function mapStateToProps(state){
  return state;
}
const connected=connect(mapStateToProps)(Loading);
export { connected as Loading } 