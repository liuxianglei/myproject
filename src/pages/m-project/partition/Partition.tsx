import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Button, Table, Divider, Tag, Popconfirm, DatePicker } from 'antd'
import './partition.less'
import { FormComponentProps } from 'antd/lib/form';
import PageDataVo from '../../../model/common/PageDataVo';
import PageRequest from '../../../model/common/PageRequest'
import AddModal from './components/AddForm'
import EditModal from './components/EditForm'
import PartitionService from '../../../service/project/PartitionService';
import PartitionVo from '../../../model/project/PartitionVo';
import ProjectSelect from '../../components/project/project-select';
import PartitionSelect from '../../components/partition/partition-select';
import { convert } from '../../../lib/utils';
import moment from 'moment';
// import moment from 'antd/node_modules/moment';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
interface iState{
    addUserModal: boolean;
    editUserModal: boolean;
    projectId:string,
    partitionId:string,
    createDate:string,
    pageData:PageDataVo<PartitionVo>
}
class PartitionForm extends Component<FormComponentProps> {
    state:iState = {
        addUserModal:false,
        editUserModal:false,
        projectId: null,
        partitionId: null,
        createDate: null,
        pageData:new PageDataVo<PartitionVo>({})
    }
    private partitionColumns:any = [
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
    private partitionService:PartitionService = new PartitionService();
    private pageRequest:PageRequest = new PageRequest({});
    private editVo:PartitionVo = new PartitionVo({});

    componentDidMount(){
        this.search();
    }

    onProjectNameChange = (projectId) =>{
        console.log(projectId)
        this.setState({
            projectId:projectId
        },()=>{
            this.search()
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
        let pageData = await this.partitionService.page(this.state.projectId,this.state.createDate,this.pageRequest,this.state.partitionId);
        this.setState({
            pageData
        })
    }
    reset = () => {
        this.setState({
            createDate:null,
            partitionId:null
        })
    }

    toEdit = (index) =>{
        this.editVo = index;
        this.setState({
            editUserModal:true
        })
    }

    newPartition = () =>{
        this.setState({
            addUserModal:true
        })
    }

    onAddCancel = (refresh) => {
        this.setState({
            addUserModal:false
        })
        if(refresh){
            this.search();
        }
    };
    onEditCancel = (refresh) => {
        this.setState({
            editUserModal:false
        })
        if(refresh){
            this.search();
        }
    };
    onDelete = async (index) =>{
        await this.partitionService.del(index.partitionId);
        this.search();
    }

    handleTableChange = (pagination, filters, sorter) =>{
        this.pageRequest.page = pagination.current;
        this.pageRequest.pageSize = pagination.pageSize;
        this.search();
    }

    render() {
        let { pageData,projectId,partitionId,createDate } = this.state;
        let { pageRequest } = this;
        let momentDate = createDate?moment(createDate, 'YYYY-MM-DD HH:mm:ss'):null
        return (
            <div>
                <Card bordered={false} className="card">
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={6}>
                                <Form.Item label={"项目名称:"}>
                                    <ProjectSelect onChange={this.onProjectNameChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"分区名称:"}>
                                    <PartitionSelect onChange={this.onPartitionNameChange} projectId={projectId} partitionId={partitionId}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"创建时间:"}>
                                    <DatePicker style={{width:"100%"}} onChange={this.onDateChange} value={momentDate} format={"YYYY-MM-DD HH:mm:ss"} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
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
                        rowKey="partitionId"
                        title={() => {
                            return (<Button icon="plus" onClick={this.newPartition}>新建分区</Button>);
                        }}
                        bordered
                        columns={this.partitionColumns}
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
                <EditModal visible={this.state.editUserModal} partitionVo={this.editVo} closeModal={this.onEditCancel} />
            </div>
        )
    }
}

const Partition = Form.create({ name: 'partition' })(PartitionForm);
export default Partition
