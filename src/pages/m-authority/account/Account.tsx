import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Button, Table, Divider, Tag, Popconfirm } from 'antd'
import './account.less'
import { FormComponentProps } from 'antd/lib/form';
import PageDataVo from '../../../model/common/PageDataVo';
import AccountVo from  '../../../model/authority/AccountVo';
import PageRequest from '../../../model/common/PageRequest'
import AccountService from '../../../service/account/AccountService'
import AddModal from './components/AddForm'
import EditModal from './components/EditForm'
import ProjectService from '../../../service/project/ProjectService';
import RoleService from '../../../service/role/RoleService';
import ProjectVo from '../../../model/project/ProjectVo';
import RoleVo from '../../../model/authority/RoleVo';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
interface iState{
    addUserModal: boolean;
    editUserModal: boolean;
    realName:string,
    pageData:PageDataVo<AccountVo>
}
class AccountForm extends Component<FormComponentProps> {
    state:iState = {
        addUserModal:false,
        editUserModal:false,
        realName: null,
        pageData:new PageDataVo<AccountVo>({})
    }
    private accountColumns = [
        {
            dataIndex: "userName",
            title: "账号名称",
            width: 150,
          },
          {
            dataIndex: "realName",
            title: "真实姓名",
            width: 150,
          },
          {
            key: "projectList",
            title: "所属项目",
            width: 300,
            // ellipsis:true,
            render: (text, record, index) =>{
                let result = [];
                record.projectList.forEach(project=>{
                    if(project){
                        result.push(<Tag key={project.projectId} color="cyan">{project.projectName}</Tag>);
                    }
                })
                return result;
            }
          },
          {
            key: "roleList",
            title: "角色",
            width: 300,
            // ellipsis:true,
            render: (text, record, index) =>{
                let result = [];
                record.roleList.forEach(role=>{
                    if(role){
                        result.push(<Tag key={role.roleId} color="cyan">{role.roleName}</Tag>);
                    }
                })
                return result;
            }
          },
          {
            title: "操作",
            width: 200,
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
    private accountService:AccountService = new AccountService();
    private projectService:ProjectService = new ProjectService();
    private roleService:RoleService = new RoleService();
    private pageRequest:PageRequest = new PageRequest({});
    private editVo:AccountVo = new AccountVo({});
    private projectList:Array<ProjectVo> = new Array<ProjectVo>()
    private roletList:Array<RoleVo> = new Array<RoleVo>()

    async componentWillMount(){
        await this.search();
        this.projectList = await this.projectService.getProjectList();
        this.roletList = await this.roleService.getRoleList();
    }

    search = async () => {
        let values = this.props.form.getFieldsValue();
        let pageData = await this.accountService.pageAccount(values.realName,this.pageRequest);
        this.setState({
            pageData
        })
    }
    reset = () => {
        this.props.form.resetFields()
    }
    toEdit = (index) =>{
        this.editVo = index;
        this.setState({
            editUserModal:true
        })
    }
    newUser = () =>{
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
        await this.accountService.delAccount(index.userId);
        this.search();
    }

    handleTableChange = (pagination, filters, sorter) =>{
        this.pageRequest.page = pagination.current;
        this.pageRequest.pageSize = pagination.pageSize;
        this.search();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { pageData } = this.state;
        let { pageRequest } = this;
        return (
            <div>
                <Card bordered={false} className="card">
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={8}>
                                <Form.Item label={"真实姓名："}>
                                    {getFieldDecorator("realName")(
                                            <Input
                                                placeholder="请输入姓名"
                                            />
                                        )}
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
                        rowKey="userId"
                        title={() => {
                            return (<Button icon="plus" onClick={this.newUser}>新建账号</Button>);
                        }}
                        bordered
                        columns={this.accountColumns}
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
                <AddModal visible={this.state.addUserModal} projectList={this.projectList} roletList={this.roletList} closeModal={this.onAddCancel} />
                <EditModal visible={this.state.editUserModal} accountVo={this.editVo} projectList={this.projectList} roletList={this.roletList} closeModal={this.onEditCancel} />
            </div>
        )
    }
}

const Account = Form.create({ name: 'account' })(AccountForm);
export default Account
