import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Card, InputNumber, Switch, Radio } from 'antd'

interface iProps extends FormComponentProps{

}

class Jiangyuliang extends Component<iProps,any> {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title={"降雨量预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />} className={"warning-setting-card"}>
                    <Form.Item >
                            {getFieldDecorator('status', {
                            })}
                    </Form.Item>
                    <Form.Item label="小时雨量：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入小时雨量',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)
                    </Form.Item>
                    <Form.Item label="日降雨量:">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入日降雨量',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)
                    </Form.Item>
                    <Form.Item label="三日降雨量:">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入三日降雨量',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)
                    </Form.Item>
                    <Form.Item label="五日降雨量:">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入五日降雨量',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (mm)
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
export default Form.create({ mapPropsToFields })(Jiangyuliang);