import React, { Component } from 'react'
import { Card, Form, Row, Col, Input, Button, Divider, Table, Popconfirm } from 'antd';
import PageDataVo from '../../../model/common/PageDataVo';
import RoleVo from '../../../model/authority/RoleVo';
import RoleService from '../../../service/role/RoleService';
import PageRequest from '../../../model/common/PageRequest';
import './role.less'
import AddModal from './components/AddForm'
import EditModal from './components/EditForm'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
interface iState{
    addUserModal: boolean;
    editUserModal: boolean;
    roleName:string,
    pageData:PageDataVo<RoleVo>
}
export default class Role extends Component<iState> {

    state:iState={
        addUserModal: false,
        editUserModal: false,
        roleName:null,
        pageData:new PageDataVo<RoleVo>({})
    }
    private roleColumns = [
        {
            dataIndex: "roleName",
            title: "角色名称",
            width: 200,
        },
        {
            dataIndex: "description",
            title: "描述",
            width: 200,
        },
        {
            title: "操作",
            width: 100,
            render: index => (
              <span>
                <Button onClick={()=>{this.toEdit(index)}} type="primary" size="small">
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
    private roleService:RoleService = new RoleService();
    private pageRequest:PageRequest = new PageRequest({});
    private editVo:RoleVo = new RoleVo({});

    componentWillMount(){
        this.search();
    }

    handleChange = e =>{
        this.setState({
            roleName:e.target.value
        })
    }

    search = async () =>{
        let pageData = await this.roleService.pageRole(this.state.roleName,this.pageRequest);
        this.setState({
            pageData
        })
    }
    reset = () =>{
        this.setState({
            roleName:null
        })
    }
    handleTableChange = (pagination, filters, sorter) =>{
        this.pageRequest.page = pagination.current;
        this.pageRequest.pageSize = pagination.pageSize;
        this.search();
    }
    newRole = () =>{
        this.setState({
            addUserModal:true
        })
    }
    toEdit = (index) =>{
        this.editVo = index;
        this.setState({
            editUserModal:true
        })
    }
    onDelete = async (index) =>{
        await this.roleService.delRole(index.roleId);
        this.search();
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
    render() {
        let { pageData } = this.state;
        let { pageRequest } = this;
        return (
            <div>
                <Card bordered={false} className="card">
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={8}>
                                <Form.Item label={"角色名称："}>
                                    <Input value={this.state.roleName} onChange={this.handleChange} placeholder="请输入角色名称"/>
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
                        rowKey="roleId"
                        title={() => {
                            return (<Button icon="plus" onClick={this.newRole}>新建角色</Button>);
                        }}
                        bordered
                        columns={this.roleColumns}
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
                <EditModal visible={this.state.editUserModal} roleVo={this.editVo} closeModal={this.onEditCancel} />
            </div>
        )
    }
}