import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Input, Switch, Select,notification } from 'antd';
import PartitionVo from '../../../../model/project/PartitionVo';
import PartitionService from '../../../../service/project/PartitionService';
import ProjectSelect from '../../../components/project/project-select';

interface iProps extends FormComponentProps {
    visible: boolean,
    partitionVo: PartitionVo,
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

    }

    private partitionService:PartitionService = new PartitionService();
    private editVo:PartitionVo = new PartitionVo({});

    componentDidUpdate(prevProps){
        if(!prevProps.visible && this.props.visible){
          this.setFields();
        }
    }
    
    async setFields(){
        let {setFields} = this.props.form;
        this.editVo = {...this.props.partitionVo}
        let { partitionName: partitionName,projectId } = this.editVo;
        setFields({
            partitionName: {
                value: partitionName,
            },
            projectId: {
                value:projectId
            }
        });
    }
    onEditOk = async () => {
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return null;
            } else {
                this.buildEditVo(values);
                await this.partitionService.edit(this.editVo);
                this.props.closeModal(true);
            }
        });
    }

    buildEditVo = (values) =>{
        this.editVo = {...this.props.partitionVo,...values};
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="编辑分区"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onEditOk}
                    onCancel={() => { this.props.closeModal() }}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form {...formItemLayout}>
                        <Form.Item label={"分区名称："}>
                            {getFieldDecorator("partitionName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入分区名称！"
                                    }
                                ]
                            })(<Input style={{width:175}} placeholder="请输入分区名称" />)}
                        </Form.Item>
                        <Form.Item label={"所属项目："}>
                            {getFieldDecorator("projectId", {
                                getValueFromEvent:(value)=>value,
                                valuePropName:'projectId',
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择项目！"
                                    }
                                ]
                            })(<ProjectSelect/>)}
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
        partitionVo: Form.createFormField({
            ...props.partitionVo,
            value: props.partitionVo
        }),
        closeModal: Form.createFormField({
            ...props.closeModal,
            value: props.closeModal
        })
    };
};
const EditModal = Form.create({ mapPropsToFields })(EditForm);
export default EditModal;
