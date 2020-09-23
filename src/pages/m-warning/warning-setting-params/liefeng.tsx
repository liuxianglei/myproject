import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Card, InputNumber, Switch, Radio } from 'antd'

interface iProps extends FormComponentProps{

}

class Liefeng extends Component<iProps,any> {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title={"裂缝长度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />} className={"warning-setting-card"}>
                    <Form.Item >
                            {getFieldDecorator('status', {
                            })}
                    </Form.Item>
                    <Form.Item label="黄色预警:">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入黄色预警',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)}(°)
                    </Form.Item>
                    <Form.Item label="橙色预警：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入橙色预警',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (°)
                    </Form.Item>
                    <Form.Item label="红色预警：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入红色预警',
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
export default Form.create({ mapPropsToFields })(Liefeng);