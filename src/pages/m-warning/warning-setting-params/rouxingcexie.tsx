import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Card, InputNumber, Switch, Radio } from 'antd'

interface iProps extends FormComponentProps{

}

class Rouxingcexie extends Component<iProps,any> {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title={"水平变形预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />} className={"warning-setting-card"}>
                    <Form.Item >
                            {getFieldDecorator('status', {
                            })}
                    </Form.Item>
                    <Form.Item label="黄色预警值:">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入黄色预警值',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)
                    </Form.Item>
                    <Form.Item label="橙色预警值:">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入橙色预警值',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)
                    </Form.Item>
                    <Form.Item label="红色预警值:">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入红色预警值',
                                },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)
                    </Form.Item>
                </Card>
                <br/>
                <Card title={"倾斜预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />} className={"warning-setting-card"}>
                    <Form.Item >
                            {getFieldDecorator('status', {
                            })}
                    </Form.Item>
                    <Form.Item label="X向倾斜预警:">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入黄色预警',
                                },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (°)
                    </Form.Item>
                    <Form.Item label="Y向倾斜预警:">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入Y向倾斜预警',
                                },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (°)
                    </Form.Item>
                </Card>
            </div>
        )
    }
}
const mapPropsToFields = props => {
    return {
     
    };
  };
export default Form.create({ mapPropsToFields })(Rouxingcexie);