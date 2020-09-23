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
const {Option} = Select;

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
    typeList:Array<any>,
    listData:Array<InitValueVo>,
    addPageData:PageDataVo<InitValueVo>,
    selectedRowKeys:Array<any>,
    addSelectedRowKeys:Array<any>,
    addVisible:boolean,
    settingVisible:boolean,
    startDate:string,
    endDate:string,
    initialType:number,
    description:string
}

export default class DInitModal extends Component<iProps,iState> {

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
            width: 230,
            render: text => {
                if (text) {
                  return <span>{convert(new Date(text),"yyyy-MM-dd hh:mm:ss")}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          },
          {
            key:"x",
            dataIndex: "xyzList",
            title: "X",
            width: 160,
            render: text => {
                if (text&&text.length>0) {
                  return <span>{text[0].x}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          },
          {
            key:"y",
            dataIndex: "xyzList",
            title: "Y",
            width: 160,
            render: text => {
                if (text&&text.length>0) {
                  return <span>{text[0].y}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          },
          {
            key:"h",
            dataIndex: "xyzList",
            title: "H",
            width: 160,
            render: text => {
                if (text&&text.length>0) {
                  return <span>{text[0].h}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          },
          {
            dataIndex: "initialTypeName",
            title: "类型",
            width: 105
          },
          {
            dataIndex: "description",
            title: "备注",
            width: 135
          }
    ]
    private addColumns = [
        {
            dataIndex: "stationName",
            title: "监测点名称",
            width: 150,
          },
          {
            dataIndex: "createdTime",
            title: "时间",
            width: 230,
            render: text => {
                if (text) {
                  return <span>{convert(new Date(text),"yyyy-MM-dd hh:mm:ss")}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          },
          {
            key:"x",
            dataIndex: "xyzList",
            title: "X",
            width: 160,
            render: text => {
                if (text&&text.length>0) {
                  return <span>{text[0].x}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          },
          {
            key:"y",
            dataIndex: "xyzList",
            title: "Y",
            width: 160,
            render: text => {
                if (text&&text.length>0) {
                  return <span>{text[0].y}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          },
          {
            key:"h",
            dataIndex: "xyzList",
            title: "H",
            width: 160,
            render: text => {
                if (text&&text.length>0) {
                  return <span>{text[0].h}</span>;
                } else {
                  return <span>--</span>;
                }
            }
          }
    ]

    state:iState={
        typeList:[],
        listData:new Array<InitValueVo>(),
        addPageData:new PageDataVo<InitValueVo>({}),
        selectedRowKeys:[],
        addSelectedRowKeys:[],
        addVisible:false,
        settingVisible:false,
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
        this.search();
    }
    addInitValue = async (seted) =>{
        if(!seted){
            let typeList = await this.stationService.findInitTypeList();
            this.setState({settingVisible:true,typeList,initialType:typeList[0].initialType})
            return;
        }
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
        this.setState({settingVisible:false,addVisible:false});
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

    descriptionChange = (e) =>{
      this.setState({description:e.target.value})
    }

    initialTypeChange = (value) =>{
      this.setState({initialType:value})
    }
    
    render() {
        let { initialType,listData,typeList,selectedRowKeys,addSelectedRowKeys,addVisible,settingVisible,addPageData } = this.state;
        let {addPageRequest } = this
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
                    title="设置"
                    width={400}
                    visible={settingVisible}
                    onOk={()=>{this.addInitValue(true)}}
                    onCancel={()=>{this.setState({settingVisible:false})}}
                >
                  <Form {...formItemLayout} colon={false}>
                      <Row gutter={0}>
                        <Col span={24}>
                          <Form.Item label={"备注："}>
                              <Input onChange={this.descriptionChange} placeholder={"请输入备注！"}></Input>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={0}>
                        <Col span={24}>
                          <Form.Item label={"初始值类型："}>
                              <Select onChange={this.initialTypeChange} value={initialType}>
                                {typeList.map((e,key)=>{
                                  return <Option key={key} value={e.initialType}>{e.initialTypeName}</Option>
                                })}
                              </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                </Modal>
                <Modal
                    title="初始值管理"
                    width={1000}
                    visible={this.props.visible}
                    bodyStyle={{overflow:"auto",maxHeight:600}}
                    onCancel={()=>{this.props.closeModal()}}
                    footer={null}
                >
                    <Table
                        rowKey="initialValueId"
                        rowSelection={rowSelection}
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
                        columns={this.listColumns}
                        dataSource={listData}
                        pagination={false}
                    />
                </Modal>
                <Modal
                    title="新增初始值"
                    width={1000}
                    bodyStyle={{overflow:"auto",maxHeight:600}}
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
                        title={() => {
                            let buttons = [];
                            buttons.push(<Button key={1} disabled={addSelectedRowKeys.length>0?false:true} type="primary" icon="plus" onClick={()=>{this.addInitValue(false)}}>设置初始值</Button>);
                            return buttons;
                        }}
                        bordered
                        columns={this.addColumns}
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
