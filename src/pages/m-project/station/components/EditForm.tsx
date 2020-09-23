import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Input, Row, Col, Switch, InputNumber } from 'antd';
import StationVo from '../../../../model/station/StationVo';
import ProjectSelect from '../../../components/project/project-select';
import PartitionSelect from '../../../components/partition/partition-select';
import GroupSelect from '../../../components/group/group-select';
import StationService from '../../../../service/station/StationService';
import StationTypeSelect from '../../../components/station/station-type-select';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

interface iProps extends FormComponentProps {
    visible: boolean,
    closeModal: Function,
    station: StationVo,
}
interface iState {
    editVo: StationVo
}

class EditForm extends Component<iProps, iState> {
    state: iState = {
        editVo: new StationVo({})
    }

    private stationService = new StationService();

    componentDidUpdate(prevProps) {
        if (!prevProps.visible && this.props.visible) {
            this.setFields();
        }
    }

    async setFields() {
        let { setFields } = this.props.form;
        await this.setState({editVo:this.props.station})
        let { projectId, stationName, partitionId, groupId, enable, timeOut, description } = this.state.editVo;
        setFields({
            projectId: {
                value: projectId,
            },
            stationName: {
                value: stationName,
            },
            partitionId: {
                value: partitionId
            },
            groupId: {
                value: groupId
            },
            enable: {
                value: enable
            },
            timeOut: {
                value: timeOut
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
                let editVo = {...this.state.editVo,...values}
                await this.stationService.editStation(editVo);
                this.props.closeModal(true);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { editVo } = this.state;
        return (
            <div>
                <Modal
                    title="编辑监测点"
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
                                <Form.Item label={"项目名称："}>
                                    <Input disabled={true} value={editVo.projectName} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"监测点类型："}>
                                    <Input disabled={true} value={editVo.deviceName} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"监测点名称："}>
                                    {getFieldDecorator("stationName", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入监测点名称！"
                                            }
                                        ]
                                    })(<Input disabled={true} placeholder="请输入监测点名称" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"所属分区："}>
                                    {getFieldDecorator("partitionId", {
                                        getValueFromEvent: (value) => value,
                                        valuePropName: 'partitionId',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请选择分区！"
                                            }
                                        ]
                                    })(<PartitionSelect projectId={editVo.projectId} partitionId={editVo.partitionId} onChange={(partitionId) => { this.setState({ editVo: { ...editVo, partitionId } }) }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"所属分组："}>
                                    {getFieldDecorator("groupId", {
                                        getValueFromEvent: (value) => value,
                                        valuePropName: 'groupId',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请选择分组！"
                                            }
                                        ]
                                    })(<GroupSelect projectId={editVo.projectId} partitionId={editVo.partitionId} groupId={editVo.groupId} onChange={(groupId) => { this.setState({ editVo: { ...editVo, groupId } }) }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"是否有效："}>
                                    {getFieldDecorator("enable", {
                                        valuePropName: 'checked'
                                    })(<Switch checkedChildren="有效" unCheckedChildren="无效" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"过期时间："}>
                                    {getFieldDecorator("timeOut", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入过期时间！"
                                            }
                                        ]
                                    })(<InputNumber></InputNumber>)}
                                     &nbsp;&nbsp; <span>单位：小时</span>
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
                                                message: "请输入说明！"
                                            }
                                        ]
                                    })(<TextArea placeholder="请输入说明" />)}
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
const EditModal = Form.create({ mapPropsToFields })(EditForm);
export default EditModal;
