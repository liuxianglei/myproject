import React, { Component } from 'react'
import { Route,BrowserRouter,Switch } from "react-router-dom";
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import Root from "./Root";
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/login/ForgetPassword";
import ChangePassword from "./pages/login/ChangePassword";
import Error from "./pages/error/Error";
import Index from "./pages/index/Index";
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Root} />
                    <Route path="/index" component={Index} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/forgetPassword" exact component={ForgetPassword} />
                    <Route path="/changePassword" exact component={ChangePassword} />
                    <Route path="*" component={Error}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
