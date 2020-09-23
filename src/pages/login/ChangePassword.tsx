import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Card, Button, Input, Row, Col } from 'antd';
import UserService from '../../service/user/UserService'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

class ChangePassword extends Component<FormComponentProps> {

    state = {
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card bordered={false} bodyStyle={{height:"100%"}} style={{textAlign:"center",height:"100vh"}}>
                    <Form {...formItemLayout} style={{transform:"translate(0, 100%)"}} colon={false} >
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
                                    })(<Input placeholder={"请输入用户名"} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={9}>
                                <Form.Item label="旧密码：" hasFeedback>
                                    {getFieldDecorator('oldPassword', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入旧密码!',
                                            }
                                        ],
                                    })(<Input.Password autoComplete="new-password" placeholder={"请输入旧密码"} />)}
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
                                    })(<Input.Password placeholder={"请输入新密码"} />)}
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
                                    })(<Input.Password placeholder={"请再次输入新密码"} onBlur={this.handleConfirmBlur} />)}
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

export default Form.create({ name: 'ChangePassword' })(ChangePassword);

