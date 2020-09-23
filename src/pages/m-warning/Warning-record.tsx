import React, { Component } from 'react'
import { Card, Row, Col, Select,Form, DatePicker, Button, Divider, Table, Popconfirm } from 'antd'
import { FormComponentProps } from "antd/lib/form";
import { convert } from '../../config/utils';
import ProjectSelect from '../components/project/project-select';
import StationTypeSelect from '../components/station/station-type-select';
import WarninSearchModel from '../../model/warning/WarningSearchModel';
import WarningService from '../../service/warning/WarningService';
import WarningDataModel from '../../model/warning/WarningDataModel';
import PageDataVo from '../../model/common/PageDataVo';
import PageRequest from '../../model/common/PageRequest';
import alertImg1 from '../../assets/images/alert_img1.png';
import alertImg2 from '../../assets/images/alert_img2.png';
import alertImg3 from '../../assets/images/alert_img3.png';
import alertImg4 from '../../assets/images/alert_img4.png';


const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

interface iProps extends FormComponentProps{
}

interface iState{
  warninSearchModel:WarninSearchModel,
  pageRequest:PageRequest,
  datas:PageDataVo<WarningDataModel>
}

class WarningRecord extends Component<iProps,iState> {
    state={
      warninSearchModel:new WarninSearchModel({processingStatus:1}),
      pageRequest:new PageRequest({}),
      datas:new PageDataVo<WarningDataModel>({})
    }

    private columns:any = [
      {
          key: 'warningText',
          title: "报警内容",
          dataIndex: "warningText",
          ellipsis: true,
          width: 330,
          align:"center"
        },
        {
          key: 'stationName',
          title: "监测点名称",
          dataIndex: "stationName",
          width: 150,
          align:"center"
        },
        {
          key: 'deviceType',
          title: "报警类型",
          width: 120,
          dataIndex: "deviceType",
          align:"center"
        },
        {
          key:"projectName",
          title: "项目名称",
          width: 170,
          ellipsis: true,
          dataIndex: "projectName",
          align:"center"
        },
        {
          key:"warningLevel",
          title: "等级",
          width: 120,
          dataIndex: "warningLevel",
          align:"center",
          render:(text, record, index)=>{
            switch(record.warningLevel){
              case 0:
                return <><img width={30} height={30} src={alertImg4}/>&nbsp; 其他</>;
              case 1:
                return <><img width={30} height={30} src={alertImg1}/>&nbsp; 一级</>;
              case 2:
                return <><img width={30} height={30} src={alertImg2}/>&nbsp; 二级</>;
              case 3:
                return <><img width={30} height={30} src={alertImg3}/>&nbsp; 三级</>;
              default:
                return "";
            }
          }
        },
        {
          key:"warningDate",
          title: "报警时间",
          width: 170,
          dataIndex: "warningDate",
          align:"center",
          render: text => {
              if (text) {
                return <span>{convert(new Date(text),"yyyy-MM-dd hh:mm:ss")}</span>;
              } else {
                return <span>--</span>;
              }
            }
        },
        {
          key: 'operation',
          title: "操作",
          dataIndex: "",
          width: 150,
          align:"center",
          render: (text, record, index) => {
            if(record.processingStatus === 1){
                return <span>
                        <Popconfirm title="确认处理吗？" okText="确认" cancelText="取消" onConfirm={()=>this.warningStatusSet(record.warningId,0)}>
                          <Button type="primary" size="small">
                            处理
                          </Button>
                        </Popconfirm>
                        <Popconfirm title="确认处理为误报吗？" okText="确认" cancelText="取消" onConfirm={()=>this.warningStatusSet(record.warningId,2)}>
                          <Button  size="small">
                            误报
                          </Button>
                        </Popconfirm>
                      </span>
            }else if(record.processingStatus === 0){
              return <span>已处理</span>
            }else if(record.processingStatus === 2){
              return <span>误报</span>
            }
        }
      }
  ];


    onProjectChange=async(projectId:string)=>{
      await this.setState({
        warninSearchModel:{...this.state.warninSearchModel,projectId:projectId}
      })
      this.onSearch(null);
    }

    onStationTypeChange=async(deviceId:string)=>{
      await this.setState({
        warninSearchModel:{...this.state.warninSearchModel,deviceId:deviceId}
      })
    }

    dateChange=async(date, dateString: string)=>{
      console.log("dateChange:",date,dateString)
      await this.setState({
        warninSearchModel:{...this.state.warninSearchModel,waringDate:dateString}
      })
    }

    onStatusChange=async(value)=>{
      await this.setState({
        warninSearchModel:{...this.state.warninSearchModel,processingStatus:value?value:null}
      })
    }

    handleTableChange=async(pagination, filters, sorter)=>{
      await this.setState({
        pageRequest:{...this.state.pageRequest,page:pagination.current,pageSize:pagination.pageSize}
      })
      this.onSearch(this.state.pageRequest)
    }

    onSearch=async(pageRequest:PageRequest)=>{
      let {warninSearchModel} = this.state;
      let datas =await new WarningService().getWarningRecordList(warninSearchModel,pageRequest?pageRequest:new PageRequest({}));

      if(datas){
        await this.setState({
          datas,
          pageRequest:pageRequest?pageRequest:new PageRequest({})
        })
      }
    }

    onReset=async()=>{
      await this.setState({
        warninSearchModel:new WarninSearchModel({})
      })
    }

    warningStatusSet=async(warningId,processingStatus:number)=>{
      let res = await new WarningService().warningStatusSet(new WarningDataModel({warningId:warningId.toLocaleString(),processingStatus}));
      console.log("warningStatusSet res:",res);
    }

    getTableFooter=()=>{
      return <>
        <img width={30} height={30} src={alertImg3} />&nbsp;三级&nbsp;<Divider type="vertical" />
        <img width={30} height={30} src={alertImg2} />&nbsp;二级&nbsp;<Divider type="vertical" />
        <img width={30} height={30} src={alertImg1} />&nbsp;一级&nbsp;<Divider type="vertical" />
        <img width={30} height={30} src={alertImg4} />&nbsp;其他
      </>
    }

    render() {
        let {warninSearchModel,pageRequest,datas} = this.state;
        let { getFieldDecorator } = this.props.form;
        console.log("warning-record datas:",datas)
        return (
            <div>
                <Card>
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={6}>
                                <Form.Item label={"项目:"}>
                                    <ProjectSelect onChange={this.onProjectChange}></ProjectSelect>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"监测点类型:"}>
                                    <StationTypeSelect deviceId={warninSearchModel.deviceId} onChange={this.onStationTypeChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"报警状态:"}>
                                    <Select defaultValue={warninSearchModel.processingStatus} onChange={this.onStatusChange} allowClear>
                                        <Option value={null}>全部</Option>
                                        <Option value={0}>已处理</Option>
                                        <Option value={1}>未处理</Option>
                                        <Option value={2}>误报</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"报警时间:"}>
                                  <DatePicker style={{width:"100%"}} onChange={this.dateChange} format={"YYYY-MM-DD"} />
                                </Form.Item>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={5} offset={10}>
                                <Button type="primary" icon="search" onClick={this.onSearch.bind(null)}>
                                    查询
                                </Button>
                                &nbsp;&nbsp;
                                <Button icon="redo" onClick={this.onReset}>
                                    重置
                                </Button>

                            </Col>
                        </Row>
                        <Divider />
                    </Form>
                    
                    <Table
                        rowKey={"warningId"}
                        bordered
                        columns={this.columns}
                        dataSource={datas.content}
                        pagination={{
                            size: "large",
                            total: datas.totalElements,
                            pageSize: pageRequest.pageSize,
                            current: pageRequest.page,
                            // pageSizeOptions:['10', '20', '30', '40'],
                            showTotal: total => `共 ${datas.totalElements} 条`,
                            showQuickJumper: true,
                            // showSizeChanger: true,
                        }}
                        footer={this.getTableFooter}
                        onChange={this.handleTableChange}
                        />
                </Card>
            </div>
        )
    }
}

const mapPropsToFields = props => {
    return {
     
    };
  };
export default Form.create({ mapPropsToFields })(WarningRecord);