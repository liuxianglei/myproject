import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Card, InputNumber, Switch, Radio } from 'antd'

interface iProps extends FormComponentProps{

}

class Gnss extends Component<iProps,any> {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title={"位移速度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />} className={"warning-setting-card"}>
                    <Form.Item >
                    {getFieldDecorator('status', {
                            rules: [
                            {
                                required: true,
                                message: '请输入位移矢量方向角标准差',
                            },
                            ],
                        })}
                    </Form.Item>
                    <Form.Item label="位移矢量方向角标准差：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入位移矢量方向角标准差',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)}
                    </Form.Item>
                    <Form.Item label="偶发位移速率突变报警：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入偶发位移速率突变报警',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm/d)
                    </Form.Item>
                    <Form.Item label="位移矢量方向角标准差：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入位移矢量方向角标准差',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm/d)
                    </Form.Item>
                    <Form.Item label="位移矢量方向角标准差：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入位移矢量方向角标准差',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm/d)
                    </Form.Item>
                    <Form.Item label="位移矢量方向角标准差：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入位移矢量方向角标准差',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm/d)
                    </Form.Item>
                </Card>
                <br/>
                <Card title={"位移矢量值超限预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />} className={"warning-setting-card"}>
                    <Form.Item >
                            {getFieldDecorator('status', {
                            })}
                    </Form.Item>
                    <Form.Item label="累计位移矢量值阈值类型:">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请选择累计位移矢量值阈值类型',
                            },
                            ],
                        })(<Radio.Group>
                            <Radio value={1}>水平位移</Radio>
                            <Radio value={2}>三维位移</Radio>
                          </Radio.Group>)}
                    </Form.Item>
                    <Form.Item label="黄色阈值：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入黄色阈值',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)(mm/d)
                    </Form.Item>
                    <Form.Item label="橙色阈值：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入橙色阈值',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)(mm/d)
                    </Form.Item>
                    <Form.Item label="红色阈值：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入红色阈值',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)(mm/d)
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
export default Form.create({ mapPropsToFields })(Gnss);