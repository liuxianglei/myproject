import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Input, Switch, Select,notification } from 'antd';
import GroupVo from '../../../../model/project/GroupVo';
import GroupService from '../../../../service/project/GroupService';
import ProjectService from '../../../../service/project/ProjectService';
import PartitionService from '../../../../service/project/PartitionService';
import PartitionVo from '../../../../model/project/PartitionVo';
import ProjectVo from '../../../../model/project/ProjectVo';
const {Option} = Select;

interface iProps extends FormComponentProps {
    visible: boolean,
    groupVo: GroupVo,
    closeModal: Function,
}

interface iState {
}
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

class EditForm extends Component<iProps, iState> {

    state = {
        projectId:null,
        partitionId:null,
        projectList: new Array<ProjectVo>(),
        partitionList: new Array<PartitionVo>()
    }

    private groupService:GroupService = new GroupService();
    private editVo:GroupVo = new GroupVo({});


    async initPartitionOpt(){
        let partitionList = await new PartitionService().list(this.state.projectId) as Array<PartitionVo>;
        this.setState({partitionList});
    }
    async componentDidUpdate(prevProps){
        if(!prevProps.visible && this.props.visible){
            let projectList = await new ProjectService().getProjectList();
            this.setState({projectList})
            this.setFields();
        }
    }
    
    async setFields(){
        console.log("setFields")
        let {setFields} = this.props.form;
        this.editVo = {...this.props.groupVo}
        this.setState({
            partitionId:this.editVo.partitionId,
            projectId:this.editVo.projectId
        },()=>{this.initPartitionOpt()})
        let { groupName,partitionId, projectId } = this.editVo;
        setFields({
            groupName: {
                value: groupName,
            },
            partitionId: {
                value:partitionId
            },
            projectId: {
                value:projectId
            }
        });
    }
    onProjectChange = (projectId) =>{
        this.setState({
            projectId,
            partitionId:null
        },()=>{
            this.initPartitionOpt();
        })
        this.props.form.setFields({
            partitionId:{
                value:null
            }
        })
    }
    onPartitionChange = (partitionId) =>{
        this.setState({partitionId});
    }
    onEditOk = async () => {
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return null;
            } else {
                this.buildEditVo(values);
                await this.groupService.edit(this.editVo);
                this.props.closeModal(true);
            }
        });
    }

    buildEditVo = (values) =>{
        this.editVo = {...this.editVo,...values};
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="编辑分组"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onEditOk}
                    onCancel={() => { this.props.closeModal() }}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout}>
                        <Form.Item label={"分组名称："}>
                            {getFieldDecorator("groupName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入分组名称！"
                                    }
                                ]
                            })(<Input style={{width:175}} placeholder="请输入分组名称" />)}
                        </Form.Item>
                        <Form.Item label={"所属分区："}>
                            {getFieldDecorator("partitionId", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择分区！"
                                    }
                                ]
                            })(<Select onChange={this.onPartitionChange} allowClear>
                                {this.state.partitionList.map((e,key)=>
                                        <Option key={key} value={e.partitionId}>{e.partitionName}</Option>
                                    )
                                }
                            </Select>)}
                        </Form.Item>
                        <Form.Item label={"所属项目："}>
                            {getFieldDecorator("projectId", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择项目！"
                                    }
                                ]
                            })(<Select onChange={this.onProjectChange}>
                                { this.state.projectList.map((e,key)=>
                                    <Option key={key} value={e.projectId}>{e.projectName}</Option>
                                    )
                                }
                            </Select>)}
                        </Form.Item>
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
        groupVo: Form.createFormField({
            ...props.groupVo,
            value: props.groupVo
        }),
        closeModal: Form.createFormField({
            ...props.closeModal,
            value: props.closeModal
        })
    };
};
const EditModal = Form.create({ mapPropsToFields })(EditForm);
export default EditModal;
