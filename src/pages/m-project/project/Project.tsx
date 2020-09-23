import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Button, Table, Divider, Tag, Popconfirm, DatePicker } from 'antd'
import './project.less'
import { FormComponentProps } from 'antd/lib/form';
import PageDataVo from '../../../model/common/PageDataVo';
import PageRequest from '../../../model/common/PageRequest'
import AddModal from './components/AddForm'
import EditModal from './components/EditForm'
import ProjectService from '../../../service/project/ProjectService';
import ProjectVo from '../../../model/project/ProjectVo';
import ProjectSelect from '../../components/project/project-select';
import { convert } from '../../../lib/utils';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
// import moment from 'antd/node_modules/moment';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
interface iProps extends FormComponentProps,RouteComponentProps{
}
interface iState{
    addUserModal: boolean;
    editUserModal: boolean;
    projectId:string,
    createDate:string,
    pageData:PageDataVo<ProjectVo>
}
class ProjectForm extends Component<iProps> {
    state:iState = {
        addUserModal:false,
        editUserModal:false,
        projectId: null,
        createDate: null,
        pageData:new PageDataVo<ProjectVo>({})
    }
    private projectColumns:any = [
        {
            dataIndex: "projectName",
            title: "项目名称",
            width: 150,
            align:"center"
          },
          {
            dataIndex: "probeCnt",
            title: "监测点数量",
            width: 150,
            align:"center"
          },
          {
            dataIndex: "warningProbeCnt",
            title: "报警监测点数量",
            width: 150,
            align:"center"
          },
          {
            dataIndex: "createDate",
            title: "创建时间",
            width: 150,
            align:"center",
            render: (text, record, index) =>{
                if(text){
                    return <span>{convert(new Date(text),"yyyy-MM-dd hh:mm:ss")}</span>
                } else {
                    return <span>--</span>;
                }
            }
          },
          {
            title: "操作",
            width: 200,
            align:"center",
            render: index => (
              <span>
                <Button onClick={()=>{this.toProbe(index)}} type="primary" size="small">
                  监测点
                </Button>
                <Button onClick={()=>{this.toEdit(index)}} size="small">
                  编辑
                </Button>
                <Popconfirm title="确认删除吗？" okText="确认" cancelText="取消" onConfirm={()=>{this.onDelete(index)}}>
                    <Button size="small">
                    删除
                    </Button>
                </Popconfirm>
              </span>
            )
          }
    ]
    private projectService:ProjectService = new ProjectService();
    private pageRequest:PageRequest = new PageRequest({});
    private editVo:ProjectVo = new ProjectVo({});

    async componentWillMount(){
        await this.search();
    }

    onProjectNameChange = (projectId) =>{
        this.setState({
            projectId:projectId
        })
    }

    onDateChange = (date,dataStr:string) =>{
        this.setState({
            createDate:dataStr
        })
    }

    search = async () => {
        let pageData = await this.projectService.pageProject(this.state.projectId,this.state.createDate,this.pageRequest);
        console.log(pageData);
        this.setState({
            pageData
        })
    }
    reset = () => {
        this.setState({createDate:null})
    }
    toProbe = (index) =>{
        this.props.history.push("/index/project/station")
    }

    toEdit = (index) =>{
        this.editVo = index;
        this.setState({
            editUserModal:true
        })
    }
    newProject = () =>{
        this.setState({
            addUserModal:true
        })
    }

    onAddCancel = (refresh) => {
        this.setState({
            addUserModal:false
        })
        if(refresh){
            this.search()
        }
    };
    onEditCancel = (refresh) => {
        this.setState({
            editUserModal:false
        })
        if(refresh){
            this.search()
        }
    };
    onDelete = async (index) =>{
        await this.projectService.del(index.projectId);
        this.search();
    }

    handleTableChange = (pagination, filters, sorter) =>{
        this.pageRequest.page = pagination.current;
        this.pageRequest.pageSize = pagination.pageSize;
        this.search();
    }

    render() {
        let { pageData,projectId,createDate } = this.state;
        let { pageRequest } = this;
        let momentDate = createDate?moment(createDate, 'YYYY-MM-DD HH:mm:ss'):null
        return (
            <div>
                <Card bordered={false} className="card">
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={6}>
                                <Form.Item label={"项目名称:"}>
                                    <ProjectSelect onChange={this.onProjectNameChange} projectId={projectId}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"创建时间:"}>
                                    <DatePicker style={{width:"100%"}} onChange={this.onDateChange} value={momentDate} format={"YYYY-MM-DD HH:mm:ss"}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={" "}>
                                    <Button type="primary" icon="search" onClick={this.search}>
                                        查询
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button icon="reload" onClick={this.reset}>
                                        重置
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Divider />
                    <Table
                        rowKey="projectId"
                        title={() => {
                            return (<Button icon="plus" onClick={this.newProject}>新建项目</Button>);
                        }}
                        bordered
                        columns={this.projectColumns}
                        dataSource={pageData.content}
                        pagination={{
                            size: "large",
                            total: pageData.totalElements,
                            pageSize: pageRequest.pageSize,
                            current: pageRequest.page,
                            // pageSizeOptions:['10', '20', '30', '40'],
                            showTotal: total => `共 ${pageData.totalElements} 条`,
                            showQuickJumper: true,
                            // showSizeChanger: true,
                        }}
                        onChange={this.handleTableChange}
                    />
                </Card>
                <AddModal visible={this.state.addUserModal} closeModal={this.onAddCancel} />
                <EditModal visible={this.state.editUserModal} projectVo={this.editVo} closeModal={this.onEditCancel} />
            </div>
        )
    }
}

const Project = Form.create({ name: 'account' })(ProjectForm);
export default Project
