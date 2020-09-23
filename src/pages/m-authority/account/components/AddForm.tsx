import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Select, Input, Switch, notification } from 'antd';
import ProjectVo from '../../../../model/project/ProjectVo';
import RoleVo from '../../../../model/authority/RoleVo';
import AccountService from '../../../../service/account/AccountService';
import AccountVo from '../../../../model/authority/AccountVo';
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface iProps extends FormComponentProps{
    visible:boolean,
    closeModal:Function,
    projectList:Array<ProjectVo>,
    roletList:Array<RoleVo>
}

interface iState{
}

class AddForm extends Component<iProps,iState> {

    state={
    }
    private projectChildren:Array<JSX.Element> = [];
    private roleChildren:Array<JSX.Element> = [];
    private accountService:AccountService = new AccountService();
    private addVo:AccountVo = new AccountVo({});

    componentWillUpdate(nextProps:iProps){
        if(nextProps.visible && !this.props.visible){
            this.projectChildren = [];
            this.roleChildren = [];
            nextProps.projectList.forEach(p=>{
                this.projectChildren.push(<Option key={p.projectId} value={p.projectId}>{p.projectName}</Option>)
            })
            nextProps.roletList.forEach(r=>{
                this.roleChildren.push(<Option key={r.roleId} value={r.roleId}>{r.roleName}</Option>)
            })
        }
    }
    componentWillMount(){
    }
    onAddOk = () =>{
      this.props.form.validateFields(async (err, values) => {
        if (err) {
            return null;
        } else {
            this.buildAddVo(values);
            await this.accountService.addAccount(this.addVo);
            this.props.closeModal(true);
        }
      });
    }
    buildAddVo = (values) =>{
      this.addVo = {...values};
      this.addVo.projectList = this.props.projectList.filter(pro=>{
          (values.projectIds as Array<string>).some((id:string)=>id===pro.projectId);
      });
      let projectIds = "";
      values.projectIds.forEach(id=>projectIds += `${id},`);
      this.addVo.projectIds = projectIds;
      this.addVo.roleList = this.props.roletList.filter(rol=>{
          (values.roleIds as Array<string>).some((id:string)=>id===rol.roleId);
      });
      let roleIds = "";
      values.roleIds.forEach(id=>roleIds += `${id},`);
      this.addVo.roleIds = roleIds;
      this.addVo.enabled = values.enabled?1:0
  }

    render() {
      const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="新增账号"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onAddOk}
                    onCancel={() => { this.props.closeModal() }}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout}>
                        <Form.Item label={"账号："}>
                            {getFieldDecorator("userName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入账号！"
                                    }
                                ]
                            })(<Input style={{width:300}} placeholder="请输入账号" />)}
                        </Form.Item>
                        <Form.Item label={"真实姓名："}>
                            {getFieldDecorator("realName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入真实姓名！"
                                    }
                                ]
                            })(<Input style={{width:300}} placeholder="请输入真实姓名" />)}
                        </Form.Item>
                        <Form.Item label={"密码："}>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入密码！"
                                    }
                                ]
                            })(<Input style={{width:300}} placeholder="请输入密码" />)}
                        </Form.Item>
                        <Form.Item label={"联系电话："}>
                            {getFieldDecorator("phone", {
                                rules: [
                                    {
                                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                        message: '请输入正确的手机号!',
                                    },
                                    {
                                        required: true,
                                        message: "请输入联系电话！"
                                    }
                                ]
                            })(<Input style={{width:300}} placeholder="请输入联系电话" />)}
                        </Form.Item>
                        <Form.Item label={"是否有效："}>
                            {getFieldDecorator("enabled",{
                                valuePropName: 'checked'
                            })(<Switch checkedChildren="有效" unCheckedChildren="无效" />)}
                        </Form.Item>
                        <Form.Item label={"性别："}>
                            {getFieldDecorator("sex",{
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择性别！"
                                    }
                                ]
                            })( <Select style={{ width: 120 }}>
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>)}
                        </Form.Item>
                        <Form.Item label={"所属项目："}>
                            {getFieldDecorator("projectIds",{
                            })( <Select style={{width:300}} mode="multiple">
                                    {this.projectChildren}
                                </Select>)}
                        </Form.Item>
                        <Form.Item label={"角色："}>
                            {getFieldDecorator("roleIds",{
                            })( <Select style={{width:300}} mode="multiple">
                                    {this.roleChildren}
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
const EditModal = Form.create({ mapPropsToFields })(AddForm);
export default EditModal;
