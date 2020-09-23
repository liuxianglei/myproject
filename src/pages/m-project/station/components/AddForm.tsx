import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Input, Row, Col, Switch, InputNumber, Select } from 'antd';
import StationVo from '../../../../model/station/StationVo';
import PartitionVo from '../../../../model/project/PartitionVo';
import PartitionService from '../../../../service/project/PartitionService';
import GroupService from '../../../../service/project/GroupService';
import GroupVo from '../../../../model/project/GroupVo';
import StationTypeSelect from '../../../components/station/station-type-select';
import StationService from '../../../../service/station/StationService';
const {Option} = Select;
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
    addVo: StationVo,
    partitionList:Array<PartitionVo>,
    groupList:Array<GroupVo>
}

class AddForm extends Component<iProps, iState> {
    state: iState = {
        addVo: new StationVo({}),
        partitionList:new Array<PartitionVo>(),
        groupList:new Array<GroupVo>()
    }

    private stationService = new StationService();

    componentDidUpdate(prevProps) {
        if (!prevProps.visible && this.props.visible) {
            this.setFields();
        }
    }

    async setFields() {
        let { setFields } = this.props.form;
        let partitionList = await new PartitionService().list(this.props.station.projectId) as Array<PartitionVo>;
        this.setState({ addVo: this.props.station,partitionList })
        let { projectId, partitionId, groupId, enable } = this.state.addVo;
        setFields({
            projectId: {
                value: projectId,
            },
            partitionId: {
                value: partitionId
            },
            groupId: {
                value: groupId
            },
            enable: {
                value: enable
            }
        });
    }

    onPartitionChange = async (partitionId) =>{
        let groupList = await new GroupService().list(this.state.addVo.projectId,partitionId)
        this.setState({addVo:{...this.state.addVo,partitionId,groupId:null},groupList})
        this.props.form.setFields({groupId:{value:null}})
    }
    onGroupChange = (groupId) =>{
        this.setState({addVo:{...this.state.addVo,groupId}})
    }
    onDeviceIdChange=(deviceId)=>{
        this.setState({addVo:{...this.state.addVo,deviceId}})
    }

    onAddOk = () => {
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return null;
            } else {
                let addVo = {...this.state.addVo,...values}
                await this.stationService.addStation(addVo);
                this.props.closeModal(true);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { addVo,partitionList,groupList } = this.state;
        return (
            <div>
                <Modal
                    title="新增监测点"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onAddOk}
                    onCancel={() => { this.props.closeModal() }}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"项目名称："}>
                                    <Input disabled={true} value={addVo.projectName} />
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
                                    })(<Input placeholder="请输入监测点名称" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"监测点类型："}>
                                    {getFieldDecorator("deviceId", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请选择监测点类型！"
                                            }
                                        ]
                                    })(<StationTypeSelect onChange={this.onDeviceIdChange}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"所属分区："}>
                                    {getFieldDecorator("partitionId", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请选择分区！"
                                            }
                                        ]
                                    })(<Select onChange={this.onPartitionChange} allowClear>
                                        {partitionList.map((e, key) =>
                                            <Option key={key} value={e.partitionId}>{e.partitionName}</Option>
                                        )
                                        }
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={20}>
                                <Form.Item label={"所属分组："}>
                                    {getFieldDecorator("groupId", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请选择分组！"
                                            }
                                        ]
                                    })(<Select onChange={this.onGroupChange} allowClear>
                                        {groupList && groupList.map((e,key)=>
                                            <Option key={key} value={e.groupId}>{e.groupName}</Option>
                                            )
                                        }
                                    </Select>)}
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
const AddModal = Form.create({ mapPropsToFields })(AddForm);
export default AddModal;
