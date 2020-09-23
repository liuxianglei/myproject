import React, { Component } from 'react'
import StationVo from '../../../../model/station/StationVo'
import { Modal, Table, Button, Popconfirm, Form, DatePicker, Row, Col, Input, Select } from 'antd';
import PageDataVo from '../../../../model/common/PageDataVo';
import InitValueVo from '../../../../model/project/InitValueVo'
import PageRequest from '../../../../model/common/PageRequest';
import { convert } from '../../../../lib/utils'
import StationService from '../../../../service/station/StationService';
import moment from 'moment';
const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface iProps {
    visible: boolean,
    station: StationVo,
    closeModal: Function
}
interface iState{
    listData:Array<InitValueVo>,
    addPageData:PageDataVo<InitValueVo>,
    selectedRowKeys:Array<any>,
    addSelectedRowKeys:Array<any>,
    addVisible:boolean,
    startDate:string,
    endDate:string,
    initialType:number,
    description:string
}

export default class CInitModal extends Component<iProps,iState> {

    private stationService = new StationService();
    private addPageRequest:PageRequest = new PageRequest({});
    private station:StationVo = new StationVo({});

    private listColumns = [
        {
            dataIndex: "stationName",
            title: "监测点名称",
            width: 150,
          },
          {
            dataIndex: "createdTime",
            title: "时间",
            width: 150,
            render: text => {
                if (text) {
                  return <span>{convert(new Date(text),"yyyy-MM-dd hh:mm:ss")}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          }
    ]

    state:iState={
        listData:new Array<InitValueVo>(),
        addPageData:new PageDataVo<InitValueVo>({}),
        selectedRowKeys:[],
        addSelectedRowKeys:[],
        addVisible:false,
        startDate:null,
        endDate:null,
        initialType:null,
        description:null
    }

    componentWillUpdate(nextProps: iProps) {
        if(nextProps.visible && !this.props.visible){
          this.station = nextProps.station
          this.search();
        }
    }

    search = async () => {
        let {stationId,deviceId} = this.station;
        let listData:Array<InitValueVo> = await this.stationService.findInitVal(stationId,deviceId);
        listData.forEach((d,index)=>{d.initialValueId = (d.initialValueId && d.initialValueId.length>0)?d.initialValueId : [index.toString()]})
        this.setState({listData,selectedRowKeys:[]});
    }
    handleAddTableChange = (pagination, filters, sorter) =>{
        this.addPageRequest.page = pagination.current;
        this.addPageRequest.pageSize = pagination.pageSize;
        this.addSearch();
    }
    expandedRowRender = (e) => {
        console.log("expandedRowRender",e)
        const columns = [
          { title: '节点序号', dataIndex: 'pointNo', key: 'pointNo' },
          { title: 'x(mm)', dataIndex: 'x', key: 'x' },
          { title: 'y(mm)', dataIndex: 'y', key: 'y' },
          { title: 'z(mm)', dataIndex: 'z', key: 'z' }
        ];
        return <Table rowKey="pointNo" columns={columns} dataSource={e.xyzList} pagination={false} />;
    };

    addSearch = async () =>{
        let {stationId,deviceId} = this.station;
        let {startDate,endDate} = this.state;
        let addPageData = await this.stationService.findAddInitVal(stationId,deviceId,startDate,endDate,this.addPageRequest);
        if(addPageData && addPageData.content && addPageData.content.length>0){
          this.setState({addPageData});
        }else{
          this.setState({addPageData:new PageDataVo<InitValueVo>({})});
        }
        this.setState({addSelectedRowKeys:[]});  
    }
    toAdd = () =>{
      this.setState({
        addVisible:true,
      });
        this.addSearch()
    }
    batchDel = async () =>{
        await this.stationService.delInitVal(this.station.stationId,this.station.deviceId,this.state.selectedRowKeys.join(","));
    }
    addInitValue = async (seted) =>{
      let { addSelectedRowKeys,initialType,description } = this.state;
      let ids = [];
      addSelectedRowKeys.forEach(a=>{
        if(a&&a.length>0){
          a.forEach(b=>{
            ids.push(b);
          })
        }
      })
      let addVo = new InitValueVo({...this.station,initialValueId:ids,initialType,description});
      await this.stationService.addInitVal(addVo);
      this.setState({addVisible:false});
      this.search();
    }

    onDateChange = (dates,dateStrings) =>{
       if(dateStrings && dateStrings.length>0){ 
         this.setState({
          startDate:dateStrings[0],
          endDate:dateStrings[1]
        })
       }else{
         this.setState({
            startDate:null,
            endDate:null
         })
       }
    }

    
    render() {
        let { listData,selectedRowKeys,addSelectedRowKeys,addVisible,addPageData } = this.state;
        let { listColumns,addPageRequest } = this

        const rowSelection = {
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({selectedRowKeys})
          }
        };
        const addRowSelection:any = {
          type:"radio",
          selectedRowKeys:addSelectedRowKeys,
          onChange: (addSelectedRowKeys, addSelectedRows) => {
            console.log(`addSelectedRowKeys: ${addSelectedRowKeys}`, 'addSelectedRows: ', addSelectedRows);
            this.setState({addSelectedRowKeys})
          }
        };
        return (
            <div>
                <Modal
                    title="初始值管理"
                    width={1000}
                    visible={this.props.visible}
                    onCancel={()=>{this.props.closeModal()}}
                    footer={null}
                >
                    <Table
                        rowKey="stationId"
                        rowSelection={rowSelection}
                        expandedRowRender={this.expandedRowRender}
                        title={() => {
                            let buttons = [];
                            buttons.push(<Button key={1} type="primary" icon="plus" onClick={this.toAdd}>新增</Button>);
                            buttons.push(
                                <Popconfirm key={3} title="确认删除吗？" okText="确认" cancelText="取消" onConfirm={this.batchDel}>
                                    <Button disabled={selectedRowKeys.length>0?false:true} key={2} style={{marginLeft:20}} type="danger" icon="delete">批量删除</Button>
                                </Popconfirm>
                            );
                            return buttons;
                        }}
                        bordered
                        columns={listColumns}
                        dataSource={listData}
                        pagination={false}
                    />
                </Modal>
                <Modal
                    title="新增初始值"
                    width={1000}
                    visible={addVisible}
                    onCancel={()=>{this.setState({addVisible:false})}}
                    footer={null}
                >
                    <Form {...formItemLayout} colon={false}>
                      <Row gutter={0}>
                        <Col span={12}>
                          <Form.Item label={"时间范围："}>
                              <RangePicker 
                              showTime={{
                                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                              }}
                              format={"YYYY-MM-DD HH:mm:ss"} onChange={this.onDateChange} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label={" "}>
                              <Button type="primary" icon="search" onClick={()=>{this.addPageRequest.page=1;this.addSearch()}}>
                                  查询
                              </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                    <Table
                        rowKey="initialValueId"
                        rowSelection={addRowSelection}
                        expandedRowRender={this.expandedRowRender}
                        title={() => {
                            let buttons = [];
                            buttons.push(<Button key={1} disabled={addSelectedRowKeys.length>0?false:true} type="primary" icon="plus" onClick={this.addInitValue}>设置初始值</Button>);
                            return buttons;
                        }}
                        bordered
                        columns={listColumns}
                        dataSource={addPageData.content}
                        pagination={{
                            size: "large",
                            total: addPageData.totalElements,
                            pageSize: addPageRequest.pageSize,
                            current: addPageRequest.page,
                            // pageSizeOptions:['10', '20', '30', '40'],
                            showTotal: total => `共 ${addPageData.totalElements} 条`,
                            showQuickJumper: true,
                            // showSizeChanger: true,
                        }}
                        onChange={this.handleAddTableChange}
                    />
                </Modal>  
            </div>
        )
    }
}
