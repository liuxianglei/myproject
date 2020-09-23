import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Card, InputNumber, Switch, Radio } from 'antd'

interface iProps extends FormComponentProps{

}

class Shuiwei extends Component<iProps,any> {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title={"水位高度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />} className={"warning-setting-card"}>
                    <Form.Item >
                            {getFieldDecorator('status', {
                            })}
                    </Form.Item>
                    <Form.Item label="水位高度：">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                required: true,
                                message: '请输入水位高度',
                            },
                            ],
                        })(<InputNumber precision={2} min={0}/>)} (m)
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
export default Form.create({ mapPropsToFields })(Shuiwei);