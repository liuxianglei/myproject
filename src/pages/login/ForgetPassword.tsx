import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Card, Button, Input, Row, Col } from 'antd';
import $ from "../../lib/jquery-vendor";
import UserService from '../../service/user/UserService'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

class ForgetPassword extends Component<FormComponentProps> {

    state = {
        disabled:false,
        confirmDirty: false,
    }
    private userService = new UserService();
    confirm = async () => {
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return null;
            } else {
                await this.userService.changePassword(values.username,values.oldPassword,values.newPassword);
                window.location.href="/login"
            }
          });
        
    }
    countdownHandler = async () =>{
		var $button = $(".sendVerifyCode");
        var number = 60;
        let self = this;
		var countdown = function(){
			if (number == 0) {
				self.setState({disabled:false})
				$button.html("获取短信验证码");
	            number = 60;
	            return;
	        } else {
	        	self.setState({disabled:true})
	        	$button.html(number + "秒 重新发送");
	        	number--;
	        }
			setTimeout(countdown,1000);
        }
        let username = this.props.form.getFieldValue("username");
        let phone = this.props.form.getFieldValue("phone");
        await this.userService.getSmsCode(username,phone);
        countdown();
	}
    reset = () => {
        this.props.form.resetFields();
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    render() {
        let username = this.props.form.getFieldValue("username");
        let phone = this.props.form.getFieldValue("phone");
        let pattern= /^1[3|4|5|7|8][0-9]\d{8}$/
        let flag = !(username && pattern.test(phone));
        console.log(flag)
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card bordered={false} bodyStyle={{height:"100%"}} style={{textAlign:"center",height:"100vh"}}>
                    <Form {...formItemLayout} style={{transform:"translate(0, 70%)"}} colon={false} >
                        <Row>
                            <Col span={6} offset={9}>
                                <Form.Item label="用户名：" hasFeedback>
                                    {getFieldDecorator('username', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入用户名!',
                                            }
                                        ],
                                    })(<Input allowClear autoComplete="off" placeholder={"请输入用户名"} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={9}>
                                <Form.Item label="手机号：" hasFeedback>
                                    {getFieldDecorator('phone', {
                                        rules: [
                                            {
                                                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                                message: '请输入正确的手机号!',
                                            },
                                            {
                                                required: true,
                                                message: '请输入手机号!',
                                            }
                                        ],
                                    })(<Input type={"text"} allowClear autoComplete="off" placeholder={"请输入手机号"} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={9}>
                                <Form.Item label="短信验证码：" hasFeedback>
                                    {getFieldDecorator('smsCode', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入短信验证码!',
                                            }
                                        ],
                                    })(<Input style={{width:"50%",float:"left"}} autoComplete="off" placeholder={"请输入短信验证码"} />)}
                                       <Button style={{float:"right"}} disabled={this.state.disabled || flag} type="primary" onClick={this.countdownHandler} className="sendVerifyCode">获取短信验证码</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={9}>
                                <Form.Item label="新密码：" hasFeedback>
                                    {getFieldDecorator('newPassword', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入新密码!',
                                            },
                                            {
                                                validator: this.validateToNextPassword,
                                            },
                                        ],
                                    })(<Input.Password autoComplete="new-password" placeholder={"请输入新密码"} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={9}>
                                <Form.Item label="确认密码：" hasFeedback>
                                    {getFieldDecorator('confirmPassword', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请再次输入新密码!',
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            },
                                        ],
                                    })(<Input.Password autoComplete="off" placeholder={"请再次输入新密码"} onBlur={this.handleConfirmBlur} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={9}>
                                <Form.Item label={" "}>
                                    <Button type="primary" icon="search" onClick={this.confirm}>
                                        提交
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button icon="reload" onClick={this.reset}>
                                        重置
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({ name: 'ForgetPassword' })(ForgetPassword);


