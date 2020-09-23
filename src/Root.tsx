import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

export default class Root extends React.Component<RouteComponentProps> { 

  componentDidMount(){
    this.isLogin();
  }
  isLogin = () =>{
    let token = window.sessionStorage.getItem("token");
    if(token){
       this.props.history.push("/index/home");
    }else{
      this.props.history.push("/login",this.props.location);
    }
  }
  render() {
    return (
      <div />
    )
  }
}
