import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Button, Table, Divider, Tag, Popconfirm, DatePicker } from 'antd'
import './group.less'
import { FormComponentProps } from 'antd/lib/form';
import PageDataVo from '../../../model/common/PageDataVo';
import PageRequest from '../../../model/common/PageRequest'
import AddModal from './components/AddForm'
import EditModal from './components/EditForm'
import GroupService from '../../../service/project/GroupService';
import GroupVo from '../../../model/project/GroupVo';
import ProjectSelect from '../../components/project/project-select';
import GroupSelect from '../../components/group/group-select';
import PartitionSelect from '../../components/partition/partition-select';
import { convert } from '../../../lib/utils';
import moment from 'moment';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
interface iState{
    addUserModal: boolean;
    editUserModal: boolean;
    projectId:string,
    partitionId:string,
    groupId:string,
    createDate:string,
    pageData:PageDataVo<GroupVo>
}
class GroupForm extends Component<FormComponentProps> {
    state:iState = {
        addUserModal:false,
        editUserModal:false,
        projectId: null,
        partitionId: null,
        groupId: null,
        createDate: null,
        pageData:new PageDataVo<GroupVo>({})
    }
    private groupColumns:any = [
          {
            dataIndex: "groupName",
            title: "分组名称",
            width: 150,
            align:"center"
          },
          {
            dataIndex: "partitionName",
            title: "分区名称",
            width: 150,
            align:"center"
          },
          {
            dataIndex: "projectName",
            title: "项目名称",
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
    private groupService:GroupService = new GroupService();
    private pageRequest:PageRequest = new PageRequest({});
    private editVo:GroupVo = new GroupVo({});

    async componentWillMount(){
        await this.search();
    }

    onProjectNameChange = (projectId) =>{
        this.setState({
            projectId:projectId
        },()=>{
            this.search()
        })
    }
    onGroupNameChange = (groupId) =>{
        this.setState({
            groupId:groupId
        })
    }
    onPartitionNameChange = (partitionId) =>{
        this.setState({
            partitionId:partitionId
        })
    }

    onDateChange = (date,dateStr) =>{
        this.setState({
            createDate:dateStr
        })
    }

    search = async () => {
        let pageData = await this.groupService.page(this.state.projectId,this.state.createDate,this.state.partitionId ,this.state.groupId, this.pageRequest);
        this.setState({
            pageData
        })
    }
    reset = () => {
        this.setState({
            partitionId:null,
            createDate:null
        })
    }

    toEdit = (index) =>{
        this.editVo = index;
        this.setState({
            editUserModal:true
        })
    }

    newGroup = () =>{
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
        await this.groupService.del(index.groupId);
        this.search();
    }

    handleTableChange = (pagination, filters, sorter) =>{
        this.pageRequest.page = pagination.current;
        this.pageRequest.pageSize = pagination.pageSize;
        this.search();
    }

    render() {
        let { pageData,projectId,partitionId,groupId,createDate } = this.state;
        let { pageRequest } = this;
        let momentDate = createDate?moment(createDate, 'YYYY-MM-DD HH:mm:ss'):null
        return (
            <div>
                <Card bordered={false} className="card">
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={4}>
                            <Col span={6}>
                                <Form.Item label={"项目名称:"}>
                                    <ProjectSelect onChange={this.onProjectNameChange} projectId={projectId}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"分区名称:"}>
                                    <PartitionSelect projectId={projectId} partitionId={partitionId} onChange={this.onPartitionNameChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"分组名称:"}>
                                    <GroupSelect projectId={projectId} partitionId={partitionId} groupId={groupId} onChange={this.onGroupNameChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"创建时间:"}>
                                    <DatePicker style={{width:"100%"}} onChange={this.onDateChange} value={momentDate} format={"YYYY-MM-DD HH:mm:ss"} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={6} offset={9}>
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
                        rowKey="groupId"
                        title={() => {
                            return (<Button icon="plus" onClick={this.newGroup}>新建分组</Button>);
                        }}
                        bordered
                        columns={this.groupColumns}
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
                <AddModal visible={this.state.addUserModal} closeModal={this.onAddCancel} projectId={projectId}/>
                <EditModal visible={this.state.editUserModal} groupVo={this.editVo} closeModal={this.onEditCancel} />
            </div>
        )
    }
}

const Group = Form.create({ name: 'group' })(GroupForm);
export default Group
