import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Select, Input, Switch, notification } from 'antd';
import GroupService from '../../../../service/project/GroupService';
import GroupVo from '../../../../model/project/GroupVo';
import ProjectService from '../../../../service/project/ProjectService';
import ProjectVo from '../../../../model/project/ProjectVo';
import PartitionVo from '../../../../model/project/PartitionVo';
import PartitionService from '../../../../service/project/PartitionService';
const {Option} = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface iProps extends FormComponentProps{
    projectId:string,
    visible:boolean,
    closeModal:Function
}

interface iState{
}

class AddForm extends Component<iProps,iState> {

    state={
        projectId:null,
        partitionId:null,
        projectList: new Array<ProjectVo>(),
        partitionList: new Array<PartitionVo>()
    }
    private groupService:GroupService = new GroupService();
    private addVo:GroupVo = new GroupVo({});

    async componentDidUpdate(prevProps){
        if(!prevProps.visible && this.props.visible){
            let projectList = await new ProjectService().getProjectList();
            this.setState({projectList,projectId:this.props.projectId},()=>{this.initPartitionOpt();})
            this.props.form.setFields({
                projectId:{
                    value: this.props.projectId
                }
            })
        }
    }
    // async componentDidMount(){
    //     window["group"] = this;
    //     let projectList = await new ProjectService().getProjectList();
    //     this.setState({projectList});
    // }

    async initPartitionOpt(){
        let partitionList = await new PartitionService().list(this.state.projectId) as Array<PartitionVo>;
        this.setState({partitionList});
    }
    onProjectChange = (projectId) =>{
        console.log("onProjectChange")
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
    onAddOk = () =>{
      this.props.form.validateFields(async (err, values) => {
        if (err) {
            return null;
        } else {
            this.buildAddVo(values);
            await this.groupService.add(this.addVo);
            this.props.closeModal(true);
        }
      });
    }
    buildAddVo = (values) =>{
        this.addVo = {...values};
    }
    render() {
      const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="新增分组"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onAddOk}
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
                            })(<Input style={{width:310}} placeholder="请输入分组名称" />)}
                        </Form.Item>
                        <Form.Item label={"所属分区："}>
                            {getFieldDecorator("partitionId", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择分区！"
                                    }
                                ]
                            })(<Select style={{width:310}} onChange={this.onPartitionChange} allowClear>
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
                            })(<Select style={{width:310}} onChange={this.onProjectChange}>
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
      closeModal: Form.createFormField({
        ...props.closeModal,
        value: props.closeModal
      })
    };
  };
const AddModal = Form.create({ mapPropsToFields })(AddForm);
export default AddModal;
