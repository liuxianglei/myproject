import React, { Component } from 'react'
import StationVo from '../../../../model/station/StationVo'
import ChildNodeVo from '../../../../model/project/ChildNodeVo'
import { Modal, Table, Popconfirm, Button } from 'antd';
import EditSubForm from './EditSubForm'
import StationService from '../../../../service/station/StationService';

interface iProps {
    visible: boolean,
    station: StationVo,
    closeModal: Function
}
interface iState {
    childNodes: Array<ChildNodeVo>,
    selectedRowKeys:Array<any>,
    editVisible:boolean,
    editVo:ChildNodeVo
}

export default class SubModal extends Component<iProps, iState> {

    state = {
        childNodes: new Array<ChildNodeVo>(),
        selectedRowKeys:[],
        editVisible:false,
        editVo:new ChildNodeVo({})
    }
    private childNodeColumns = [
        {
            dataIndex: "number",
            title: "序号",
            width: 80,
        },
        {
            dataIndex: "pointName",
            title: "节点名称",
            width: 150
        },
        {
            dataIndex: "distanceReferencePoint",
            title: "距离基准点",
            width: 150
        },
        {
            dataIndex: "warningJudge",
            title: "预警判断",
            width: 150,
            render: text => {
                if (text !== null && text !== undefined && text !== "") {
                    return <span>{text ? "是" : "否"}</span>;
                } else {
                    return <span>--</span>;
                }
            }
        },
        {
            dataIndex: "pointValid",
            title: "节点有效",
            width: 150,
            render: text => {
                if (text) {
                    return <span>{text ? "是" : "否"}</span>;
                } else {
                    return <span>--</span>;
                }
            }
        },
        {
            dataIndex: "description",
            title: "备注",
            width: 200
        },
        {
            title: "操作",
            width: 200,
            render: index => {
                return <span>
                    <Button onClick={() => { this.toEdit(index) }} size="small">
                        编辑
                    </Button>
                </span>
            }
        }
    ]

    private station = new StationVo({});
    private stationService = new StationService();
    private rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.setState({selectedRowKeys})
        }
    };
    componentWillUpdate(nextProps: iProps) {
        if (nextProps.visible && !this.props.visible) {
            this.station = nextProps.station;
            this.search();
        }
    }
    search = async () => {
        let data = await this.stationService.getChildNodeList(this.station.stationId)
        this.setState({childNodes:data})
    }
    batchDel = () => {

    }
    toEdit = (index) =>{
        this.setState({
            editVisible:true,
            editVo:index
        })
    }
    render() {
        let { rowSelection,childNodeColumns } = this;
        let { selectedRowKeys,childNodes,editVisible,editVo } = this.state;
        return (
            <div>
                <EditSubForm visible={editVisible} childNodeVo={editVo} closeModal={(refresh)=>{this.setState({editVisible:false});if(refresh) this.search()}} />
                <Modal
                    title="子节点管理"
                    width={1000}
                    bodyStyle={{overflow:"auto",maxHeight:600}}
                    visible={this.props.visible}
                    onCancel={() => { this.props.closeModal() }}
                    footer={null}
                >
                    <Table
                        rowKey="number"
                        // rowSelection={rowSelection}
                        title={() => {
                            let buttons = [];
                            buttons.push(
                                <Popconfirm disabled={true} key={1} title="确认删除吗？" okText="确认" cancelText="取消" onConfirm={this.batchDel}>
                                    <Button disabled={true} key={2} style={{ marginLeft: 20 }} type="danger" icon="delete">批量删除</Button>
                                </Popconfirm>
                            );
                            return buttons;
                        }}
                        bordered
                        columns={childNodeColumns}
                        dataSource={childNodes}
                        pagination = {false}
                    />
                </Modal>
            </div>
        )
    }
}
