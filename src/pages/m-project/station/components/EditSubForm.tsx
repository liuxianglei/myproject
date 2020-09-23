import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Input, Row, Col, Switch, InputNumber } from 'antd';
import ChildNodeVo from '../../../../model/project/ChildNodeVo';
import StationService from '../../../../service/station/StationService';
const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

interface iProps extends FormComponentProps {
    visible: boolean,
    closeModal: Function,
    childNodeVo: ChildNodeVo,
}
interface iState {
}

class EditSubForm extends Component<iProps, iState> {
    state: iState = {
    }

    private editVo = new ChildNodeVo({});
    private stationService = new StationService();
    
    componentDidUpdate(preProps:iProps) {
        if (!preProps.visible && this.props.visible) {
            this.editVo = this.props.childNodeVo;
            this.setFields();
        }
    }

    setFields() {
        let { setFields } = this.props.form;
        let { description,distanceReferencePoint,number,pointName,pointNo,pointValid,warningJudge } = this.editVo;
        setFields({
            distanceReferencePoint: {
                value: distanceReferencePoint,
            },
            number: {
                value: number,
            },
            pointName: {
                value: pointName
            },
            pointNo: {
                value: pointNo
            },
            pointValid: {
                value: pointValid
            },
            warningJudge: {
                value: warningJudge
            },
            description: {
                value: description
            }
        });
    }

    onEditOk = () => {
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return null;
            } else {
                let editVo = {...this.editVo,...values}
                await this.stationService.editChildNode(editVo);
                this.props.closeModal(true);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="编辑子节点"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onEditOk}
                    onCancel={() => { this.props.closeModal() }}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"节点序号："}>
                                {getFieldDecorator("number", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入节点序号！"
                                            }
                                        ]
                                    })(<Input disabled style={{ width: 175 }} placeholder="请输入节点序号" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"节点名称："}>
                                    {getFieldDecorator("pointName", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入节点名称！"
                                            }
                                        ]
                                    })(<Input disabled style={{ width: 175 }} placeholder="请输入节点名称" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"距离基准点："}>
                                {getFieldDecorator("distanceReferencePoint", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入距离基准点！"
                                            }
                                        ]
                                    })(<Input disabled style={{ width: 175 }} placeholder="请输入距离基准点" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"说明："}>
                                    {getFieldDecorator("description", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入描述！"
                                            }
                                        ]
                                    })(<TextArea placeholder="请输入描述" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"节点有效："}>
                                    {getFieldDecorator("pointValid", {
                                        valuePropName: 'checked'
                                    })(<Switch checkedChildren="有效" unCheckedChildren="无效" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"预警判断："}>
                                    {getFieldDecorator("warningJudge", {
                                        valuePropName: 'checked'
                                    })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapPropsToFields = props => {
    return {
        visible: Form.createFormField({
            ...props.visible,
            value: props.visible
        }),
        closeModal: Form.createFormField({
            ...props.closeModal,
            value: props.closeModal
        })
    };
};
const EditSubModal = Form.create({ mapPropsToFields })(EditSubForm);
export default EditSubModal;
