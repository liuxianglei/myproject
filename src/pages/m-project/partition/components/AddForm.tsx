import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Select, Input, Switch, notification } from 'antd';
import PartitionService from '../../../../service/project/PartitionService';
import PartitionVo from '../../../../model/project/PartitionVo';
import ProjectSelect from '../../../components/project/project-select';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface iProps extends FormComponentProps{
    visible:boolean,
    closeModal:Function
}

interface iState{
}

class AddForm extends Component<iProps,iState> {

    state={
    }
    private partitionService:PartitionService = new PartitionService();
    private addVo:PartitionVo = new PartitionVo({});

    onAddOk = () =>{
      this.props.form.validateFields(async (err, values) => {
        if (err) {
            return null;
        } else {
            this.buildAddVo(values);
            await this.partitionService.add(this.addVo);
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
                    title="新增分区"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onAddOk}
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
                            })(<Input style={{width:310}} placeholder="请输入分区名称" />)}
                        </Form.Item>
                        <Form.Item label={"所属项目："}>
                            {getFieldDecorator("projectId", {
                                getValueFromEvent:(value)=>value,
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择项目！"
                                    }
                                ]
                            })(<ProjectSelect width={310}/>)}
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
