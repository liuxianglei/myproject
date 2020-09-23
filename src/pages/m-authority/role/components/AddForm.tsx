import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import MenuVo from '../../../../model/MenuVo';
import { Modal, Input, notification } from 'antd';
import RoleService from '../../../../service/role/RoleService';
import RoleVo from '../../../../model/authority/RoleVo';
import TreeForm from '../components/TreeForm'

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

interface iProps extends FormComponentProps {
    visible: boolean,
    closeModal: Function,
    menus: Array<MenuVo>,
}
interface iState {

}

class AddForm extends Component<iProps, iState> {

    private roleService: RoleService = new RoleService();
    private addVo: RoleVo = new RoleVo({});

    onAddOk = () => {
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return null;
            } else {
                this.addVo = {...values}
                this.addVo.roleDisabled=false;
                await this.roleService.addRole(this.addVo);
                this.props.closeModal(true);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="新增角色"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onAddOk}
                    onCancel={() => { this.props.closeModal() }}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout}>
                        <Form.Item label={"角色名称："}>
                            {getFieldDecorator("roleName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入角色名称！"
                                    }
                                ]
                            })(<Input style={{width:300}} placeholder="请输入角色名称" />)}
                        </Form.Item>
                        <Form.Item label={"描述："}>
                            {getFieldDecorator("description", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入描述！"
                                    }
                                ]
                            })(<TextArea style={{width:300}} placeholder="请输入描述" />)}
                        </Form.Item>
                        <Form.Item label={"菜单权限："}>
                            {getFieldDecorator("functions", {
                                getValueFromEvent:(value)=>value,
                                valuePropName:'keys',
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择菜单权限！"
                                    }
                                ]
                            })(
                                <TreeForm width={300}></TreeForm>
                            )}
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
