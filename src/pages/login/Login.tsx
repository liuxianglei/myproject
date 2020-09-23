/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react'
import './login.less'
import { Form, Icon, Input, Button } from 'antd';
import logo from '../../assets/images/logo.png';
import { FormProps } from 'antd/lib/form';
import LoginParamVo from '../../model/LoginParamVo';
import LoginService from '../../service/LoginService'
import { RouteComponentProps } from 'react-router-dom';
interface iProps extends FormProps, RouteComponentProps { }
class login extends Component<iProps> {

    private loginService: LoginService;

    constructor(props) {
        super(props);
        this.loginService = new LoginService();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let loginParam = new LoginParamVo({ ...values })
                let res = await this.loginService.getToken(loginParam);
                window.sessionStorage.setItem('token', res.token)
                let user = await this.loginService.getUserInfo();
                window.sessionStorage.setItem('userName', user.userName);
                window.sessionStorage.setItem('userId', user.userId);
                window.sessionStorage.setItem('functions', user.functions);
                window.sessionStorage.setItem('projectList', JSON.stringify(user.projectList));
                let state: any = this.props.location.state;
                if(state){
                    this.props.history.push(state.pathname);
                }else{
                    this.props.history.push("/");
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-area">
                    <img src={logo} className="logo" alt="logo" />
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请您输入账号！' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入账号"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请您输入密码！' }],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                            <a href="/changePassword" style={{float:"left"}}>修改密码</a>
                            <a href="/forgetPassword" style={{float:"right"}}>忘记密码？</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="footer">
                        
                    </div>
                    
                </div>

            </div>
        )
    }
}
const Login = Form.create({ name: 'normal_login' })(login);
export default Login;
