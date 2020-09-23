import React, { Component } from 'react'
import { Card, Row, Col, Select, Table, Radio, Button } from 'antd'
import Form, { FormComponentProps } from 'antd/lib/form';
import DataService from "../../service/data/DataService";
import SurefaceSearchModel from '../../model/data/SurefaceSearchModel';
import { convert } from '../../config/utils';
import {getIcpJiasuduOption, getIcpQingxieOption, getIcpBianxingOption} from "./echarts-utils";
import dark from "./dark";
import DataForm from "./data-form";
const echarts = require('echarts');
import "./data.less";
import IntellectualCorePileModel from '../../model/data/IntellectualCorePileModel';
import IntellectualCorePileRetModel from '../../model/data/IntellectualCorePileRetModel';
import { DataTypeEnum } from '../../model/enum/enum';
import { download } from '../../lib/utils';
import { DownloadFilfUrl } from '../../config/config';
import { RouteComponentProps } from 'react-router-dom';
const {Option} = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
const icp_jiasudu_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "collectTime",
        title: "采集数据时间",
        width: 150,
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
        dataIndex: "acceleratedX",
        title: "Ax",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "acceleratedY",
        title: "Ay",
        width: 150,
        align:"center",
    }
];
const icp_qingxiejiao_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "collectTime",
        title: "采集数据时间",
        width: 150,
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
        dataIndex: "tiltAngleX",
        title: "θx",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "tiltAngleY",
        title: "θy",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "tiltAngleXY",
        title: "θxy",
        width: 150,
        align:"center",
    }
];
const icp_xiangduibianxing_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "collectTime",
        title: "采集数据时间",
        width: 150,
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
        dataIndex: "deformation",
        title: "U",
        width: 150,
        align:"center",
    }
];
interface iProps extends FormComponentProps,RouteComponentProps{
    userId:string
}

interface iState{
    surefaceSearchModel:SurefaceSearchModel,
    dataList:Array<IntellectualCorePileRetModel>,
    tableDataList:Array<IntellectualCorePileModel>,
    tableVisible:boolean,
    echartsVisible:boolean,
    curveTypeId:string,
    columns:Array<any>,
}

class IcpData extends Component<iProps,iState> {
     
    constructor(props){
        super(props);
    }
    private dataService = new DataService();
    private myChart = null;
    private deviceId = "402881e57303eb7f017303f75f130016";

    state={
        surefaceSearchModel:new SurefaceSearchModel({}),
        dataList:[] as Array<IntellectualCorePileRetModel>,
        tableDataList:[] as Array<IntellectualCorePileModel>,
        tableVisible:true,
        echartsVisible:false,
        curveTypeId:"",
        columns:icp_jiasudu_column
    }

    componentDidMount(){
        // this.getIntellectualCorePileData(this.state.surefaceSearchModel);
        if(this.props.location.pathname && this.props.location.state){
            console.log("gnss data componentDidMount:",this.props.location.pathname,this.props.location.state)
            this.setSurefaceSearchModelFromRedirect(this.props.location.state);
        }
    }

    setSurefaceSearchModelFromRedirect=(searchParams)=>{
        let {stationId} = searchParams;
        let surefaceSearchModel = new SurefaceSearchModel({
            stationId:stationId,
            startTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()-3*24*3600*1000),"yyyy-MM-dd hh:mm:ss"),
            endTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),"yyyy-MM-dd hh:mm:ss"),
        });
        this.getIntellectualCorePileData(surefaceSearchModel);
    }

    getIntellectualCorePileData=async(surefaceSearchModel:SurefaceSearchModel)=>{
        let dataList = await this.dataService.getIntellectualCorePileData(surefaceSearchModel);
        let tableDataList = this.getTableDataList(dataList);
        await this.setState({
            dataList,
            tableDataList,
            surefaceSearchModel
        })
        if(this.state.echartsVisible){
            this.reloadEcharts();
        }
    }

    getTableDataList=(dataList:Array<IntellectualCorePileRetModel>)=>{
        if(!dataList || !dataList.length){
            return [];
        }
        let tableDataList = [];
        dataList.forEach(e=>{
            tableDataList = tableDataList.concat(e.corePileModels)
        })
        return tableDataList;
    }

    radioChange=async(e)=>{
        e.preventDefault();
        if(e.target.value === "1"){
            this.setState({
                tableVisible:true,
                echartsVisible:false
            })
        }else{
            await this.setState({
                tableVisible:false,
                echartsVisible:true
            })
            this.initEchart();
        }
    }
    
    onCurvetTypeChange=(curveTypeId:string)=>{
       this.changeColumns(curveTypeId);
        if(this.state.echartsVisible){
            this.reloadEcharts();
        }
    }

    reloadEcharts=()=>{
        document.getElementById('main').removeAttribute('_echarts_instance_');
        this.initEchart();
        this.setEchartOption();
    }

    changeColumns=async(curveTypeId:string)=>{
        let columns;
        switch(curveTypeId){
            case DataTypeEnum.JIASUDULISHI:
                columns = icp_jiasudu_column;
                break;
            case DataTypeEnum.QINGXIEJIAOLISHI:
                columns = icp_qingxiejiao_column;
                break;
            case DataTypeEnum.XIANGDUIBIANXINGLISHI:
                columns = icp_xiangduibianxing_column;
                break;
            default:
                break;
        }
        if(columns){
            await  this.setState({
                columns,
                curveTypeId
            })
        }
    }

    onSearch=(surefaceSearchModel:SurefaceSearchModel)=>{
        
        this.getIntellectualCorePileData(surefaceSearchModel);
    }

    initEchart=()=>{
        // 基于准备好的dom，初始化echarts实例
        let {curveTypeId,echartsVisible} = this.state;
        if(echartsVisible){
            this.myChart = echarts.init(document.getElementById('main'),'dark');
            this.setEchartOption();
        }
    }
    setEchartOption=()=>{
        // 绘制图表
        let {curveTypeId,echartsVisible} = this.state;
        if(echartsVisible){
            let option = null;
            switch(curveTypeId){
                case DataTypeEnum.JIASUDULISHI:
                    option = getIcpJiasuduOption(this.state.dataList);
                    break;
                case DataTypeEnum.QINGXIEJIAOLISHI:
                    option = getIcpQingxieOption(this.state.dataList);
                    break;
                case DataTypeEnum.XIANGDUIBIANXINGLISHI:
                    option = getIcpBianxingOption(this.state.dataList);
                    break;
                default:
                    break;
            }
            if(option){
                this.myChart.setOption(option);
            }
        }
    }

    onExportData=()=>{
        download({
            url:DownloadFilfUrl.IcpData,
            method:"get",
            fileName:"智芯桩源数据导出.xlsx",
            params:this.state.surefaceSearchModel
        })
    }


    render() {
        let {tableDataList,tableVisible,echartsVisible,columns,surefaceSearchModel} = this.state;
        let { getFieldDecorator } = this.props.form;
        
        return (
            <div>
                <Card className={"data-setting-card"}>
                <DataForm userId={this.props.userId} deviceId={this.deviceId} onSearch={this.onSearch} onCurvetTypeChange={this.onCurvetTypeChange} surefaceSearchModel={surefaceSearchModel}></DataForm>
                <Row>
                    <Col span={6}><span style={{textAlign:"left"}}><h3>{tableVisible?"智芯桩数据表":"智芯桩趋势图"}</h3></span></Col>
                    <Col style={{textAlign:"right",marginBottom:10}}>
                        <Radio.Group defaultValue="1" buttonStyle="solid" onChange={this.radioChange} style={{marginRight: 10}}>
                            <Radio.Button value="1">数据表</Radio.Button>
                            <Radio.Button value="2">趋势图</Radio.Button>
                        </Radio.Group>
                        <Button icon="export" onClick={this.onExportData} type={"primary"}>
                            导出
                        </Button>
                    </Col>
                </Row>
                    {tableVisible &&
                        <Table
                            rowKey="key"
                            bordered
                            columns={columns}
                            dataSource={tableDataList}
                        />
                    }
                {echartsVisible && <div className={"data-echarts echart-backgroud-color"}><div id={"main"} style={{width:"100%",height:600}}/></div>}
                </Card>
            </div>
        )
    }
}

const mapPropsToFields = props => {
    return {
     
    };
  };
export default Form.create({ mapPropsToFields })(IcpData);