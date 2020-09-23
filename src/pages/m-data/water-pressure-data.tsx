import React, { Component } from 'react'
import { Card, Row, Col, Select, Table, Radio, Button } from 'antd'
import Form, { FormComponentProps } from 'antd/lib/form';
import DataService from "../../service/data/DataService";
import SurfaceDisplacementAnalysisModel from '../../model/data/SurfaceDisplacementAnalysisModel';
import SurefaceSearchModel from '../../model/data/SurefaceSearchModel';
import { convert } from '../../config/utils';
import {getGnssWeiyilishiOption,getGnssWeiyisudulishiOption, getWaterPresureOption} from "./echarts-utils";
import dark from "./dark";
import DataForm from "./data-form";
const echarts = require('echarts');
import "./data.less";
import WaterPressureDataModel from '../../model/data/WaterPressureDataModel';
import WaterPressureDataRetModel from '../../model/data/WaterPressureDataRetModel';
import { DataTypeEnum } from '../../model/enum/enum';
import { download } from '../../lib/utils';
import { DownloadFilfUrl } from '../../config/config';
import { RouteComponentProps } from 'react-router-dom';
const {Option} = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
const water_pressure_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "collectDate",
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
        dataIndex: "waterPressure",
        title: "P(mm)",
        width: 150,
        align:"center",
    }
];
interface iProps extends FormComponentProps,RouteComponentProps{
    userId:string
}

interface iState{
    surefaceSearchModel:SurefaceSearchModel,
    dataList:Array<WaterPressureDataRetModel>,
    tableDataList:Array<WaterPressureDataModel>,
    tableVisible:boolean,
    echartsVisible:boolean,
    curveTypeId:string,
}

class WaterPressureData extends Component<iProps,iState> {
     
    constructor(props){
        super(props);
    }
    private dataService = new DataService();
    private myChart = null;
    private deviceId = "402881e57303eb7f017303f75f130005";

    state={
        surefaceSearchModel:new SurefaceSearchModel({}),
        dataList:[] as Array<WaterPressureDataRetModel>,
        tableDataList:[] as Array<WaterPressureDataModel>,
        tableVisible:true,
        echartsVisible:false,
        curveTypeId:"",
    }

    componentDidMount(){
        // this.getWaterPressureData(this.state.surefaceSearchModel);
        if(this.props.location.pathname && this.props.location.state){
            console.log("rain data componentDidMount:",this.props.location.pathname,this.props.location.state)
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
        this.getWaterPressureData(surefaceSearchModel);
    }

    getWaterPressureData=async(surefaceSearchModel:SurefaceSearchModel)=>{
        let dataList = await this.dataService.getWaterPressureData(surefaceSearchModel);
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

    getTableDataList=(dataList:Array<WaterPressureDataRetModel>)=>{
        if(!dataList || !dataList.length){
            return [];
        }
        let tableDataList = [];
        dataList.forEach(e=>{
            tableDataList = tableDataList.concat(e.waterPressure)
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
        this.setState({
            curveTypeId
        })
        if(this.state.echartsVisible){
            this.setEchartOption();
        }
    }

    onSearch=(surefaceSearchModel:SurefaceSearchModel)=>{
        this.getWaterPressureData(surefaceSearchModel);
    }
    reloadEcharts=()=>{
        document.getElementById('main').removeAttribute('_echarts_instance_');
        this.initEchart();
        this.setEchartOption();
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
        if( echartsVisible){
            let option = null;
            switch(curveTypeId){
                case DataTypeEnum.SHUIYALISHI:
                    option = getWaterPresureOption(this.state.dataList);
                    break;
                default:
                    option = getWaterPresureOption(this.state.dataList);
                    break;
            }
            if(option){
                this.myChart.setOption(option);
            }
        }
    }

    onExportData=()=>{
        download({
            url:DownloadFilfUrl.WaterPressureData,
            method:"get",
            fileName:"水压导出数据.xlsx",
            params:this.state.surefaceSearchModel
        })
    }

    render() {
        let {tableDataList,tableVisible,echartsVisible,surefaceSearchModel} = this.state;
        let { getFieldDecorator } = this.props.form;
        
        return (
            <div>
                <Card className={"data-setting-card"}>
                <DataForm userId={this.props.userId} deviceId={this.deviceId} onSearch={this.onSearch} onCurvetTypeChange={this.onCurvetTypeChange} surefaceSearchModel={surefaceSearchModel}></DataForm>
                <Row>
                    <Col span={6}><span style={{textAlign:"left"}}><h3>{tableVisible?"水压历时数据表":"水压历时曲线"}</h3></span></Col>
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
                            columns={water_pressure_column}
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
export default Form.create({ mapPropsToFields })(WaterPressureData);