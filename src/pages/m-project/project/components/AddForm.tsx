import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Modal, Select, Input, Switch, notification, Upload, Button, Icon } from 'antd';
import ProjectVo from '../../../../model/project/ProjectVo';
import ProjectMap from '../../../components/amap/ProjectMap';
import ProjectService from '../../../../service/project/ProjectService';
import TextArea from 'antd/lib/input/TextArea';
import StationTypeCheckbox from '../../../components/station/station-type-checkbox';
import { baseUrl } from '../../../../config/config';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface iProps extends FormComponentProps{
    visible:boolean,
    closeModal:Function,
}

interface iState{
}

class AddForm extends Component<iProps,iState> {

    state={
        fileList:[]
    }
    private projectService:ProjectService = new ProjectService();
    private projectVo:ProjectVo = new ProjectVo({});
    
    componentDidUpdate(prevProps){
        if(!prevProps.visible && this.props.visible){
            this.props.form.resetFields();
            this.setState({fileList:[]});
        }
    }
    componentDidMount(){
        window["project"] = this
    }
    mapChange = info =>{
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        this.setState({ fileList });
    }
    
    onAddOk = () =>{
      this.props.form.validateFields(async (err, values) => {
        if (err) {
            return null;
        } else {
            this.buildAddVo(values);
            await this.projectService.add(this.projectVo);
            this.props.closeModal(true);
        }
      });
    }
    buildAddVo = (values) =>{
        this.projectVo.projectName = values.projectName;
        this.projectVo.deviceIds = values.deviceIds.join(",");
        this.projectVo.mapFileNamePattern = values.fileList.file.name;
        this.projectVo.mapURL = values.fileList.file.response.path;
        this.projectVo.description = values.description;
        this.projectVo.coordinatex = values.position.lng;
        this.projectVo.coordinatey = values.position.lat;
    }

    render() {
      const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    width={1000}
                    title="新增项目"
                    maskClosable={false}
                    visible={this.props.visible}
                    onOk={this.onAddOk}
                    onCancel={() => { this.props.closeModal() }}
                    okText="确认"
                    cancelText="取消"
                    destroyOnClose
                >
                    <Form {...formItemLayout}>
                        <Form.Item label={"项目名称："}>
                            {getFieldDecorator("projectName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入项目名称！"
                                    }
                                ]
                            })(<Input style={{ width:175 }} placeholder="请输入项目名称" />)}
                        </Form.Item>
                        <Form.Item label={"监测点类型："}>
                            {getFieldDecorator("deviceIds", {
                                getValueFromEvent:(value)=>value,
                                valuePropName:'deviceIds',
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入监测点类型！"
                                    }
                                ]
                            })(<StationTypeCheckbox />)}
                        </Form.Item>
                        <Form.Item label={"项目平面图:"}>
                            {getFieldDecorator("fileList",{
                                rules: [
                                    {
                                        required: true,
                                        message: "请输上传项目平面图！"
                                    }
                                ]
                            })(  <Upload 
                                    accept={".zip"}
                                    action={`${baseUrl}uploadChunks`}
                                    data={(file)=>{return {name:file.name,size:file.size,md5value: file.size + "" + file.lastModifiedDate.getTime()}}}
                                    onChange={this.mapChange}
                                    fileList={this.state.fileList}
                                 >
                                    <Button>
                                        <Icon type="upload" /> 上传文件
                                    </Button>
                                    <span style={{marginLeft:10}}>支持扩展名：.zip</span>
                              </Upload>)}
                        </Form.Item>
                        <Form.Item label={"项目说明:"}>
                            {getFieldDecorator("description",{
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入项目说明！"
                                    }
                                ]
                            })(<TextArea style={{width:175}} placeholder="请输入项目说明" />)}
                        </Form.Item>
                        <Form.Item wrapperCol={{span:19,offset:1}} label={"中心坐标:"}>
                            {getFieldDecorator("position",{
                                getValueFromEvent:(value)=>value,
                                valuePropName:'position',
                                rules: [
                                    {
                                        required: true,
                                        message: "请在地图上选择项目中心点！"
                                    }
                                ]
                            })( <ProjectMap mapId={"add-project-map"} />)}
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
