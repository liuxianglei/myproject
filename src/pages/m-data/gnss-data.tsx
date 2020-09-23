import React, { Component } from 'react'
import { Card, Row, Col, Select, Table, Radio, Button } from 'antd'
import Form, { FormComponentProps } from 'antd/lib/form';
import DataService from "../../service/data/DataService";
import SurfaceDisplacementAnalysisModel from '../../model/data/SurfaceDisplacementAnalysisModel';
import SurefaceSearchModel from '../../model/data/SurefaceSearchModel';
import { convert } from '../../config/utils';
import {getGnssWeiyilishiOption,getGnssWeiyisudulishiOption, getGnssWeiyijiasudulishiOption, getGnssWeiyishiliangOption, getGnssWeiyiAndRainsOption, getGnssWeiyisuduAndRainsOption, getGnssWeiyiAndWaterLevelOption} from "./echarts-utils";
import dark from "./dark";
import GnssDataForm from "./gnss-data-form";
const echarts = require('echarts');
import "./data.less";
import DeviceModel from '../../model/device/DeviceModel';
import { DeviceIdEnum, DataTypeEnum } from '../../model/enum/enum';
import SuperviseDataModel from '../../model/data/SuperviseDataModel';
import { download } from '../../lib/utils';
import { DownloadFilfUrl } from '../../config/config';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
const {Option} = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
const gnss_total_column:any = [
    {
        dataIndex: "stationName",
        key:"stationName",
        title: "监测点名称",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "collectDataTime",
        key:"collectDataTime",
        title: "采集数据时间",
        width: 150,
        align:"center",
        render: text => {
            if (text) {
                console.log("table time:",convert(new Date(text),"yyyy-MM-dd")); 
              return <span>{convert(new Date(text),"yyyy-MM-dd hh:mm:ss")}</span>;
            } else {
              return <span>--</span>;
            }
          }
    },
    {
        dataIndex: "x",
        key:"x",
        title: "△X",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "y",
        key:"y",
        title: "△Y",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "h",
        key:"h",
        title: "△H",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "lxy",
        key:"lxy",
        title: "△|XY|",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "l3d",
        key:"l3d",
        title: "△|XYH|",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "sx",
        key:"sx",
        title: "∑△X",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "sy",
        key:"sy",
        title: "∑△Y",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "sh",
        key:"sh",
        title: "∑△H",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "sxy",
        key:"sxy",
        title: "|∑△XY|",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vectoranglexy",
        key:"vectoranglexy",
        title: "矢量角",
        width: 150,
        align:"center"
    }
];
const gnss_weiyi_column:any = [
    {
        key:"stationName",
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "collectDataTime",
        key:"collectDataTime",
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
        dataIndex: "x",
        key:"x",
        title: "△X",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "y",
        key:"y",
        title: "△Y",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "h",
        key:"h",
        title: "△H",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "lxy",
        key:"lxy",
        title: "△|XY|",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vx",
        key:"vx",
        title: "Vx",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vy",
        key:"vy",
        title: "Vy",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vh",
        key:"vh",
        title: "Vh",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vxy",
        key:"vxy",
        title: "Vxy",
        width: 150,
        align:"center"
    }
];
const gnss_weiyisudu_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "collectDataTime",
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
        dataIndex: "vx",
        title: "Vx",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vy",
        title: "Vy",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vh",
        title: "Vh",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vxy",
        title: "Vxy",
        width: 150,
        align:"center"
    }
];
const gnss_weiyijiasudu_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "collectDataTime",
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
        dataIndex: "accX",
        title: "Ax",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "accY",
        title: "Ay",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "accH",
        title: "Ah",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "accXY",
        title: "Axy",
        width: 150,
        align:"center"
    },
];
const gnss_weiyishiliang_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "collectDataTime",
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
        dataIndex: "lxy",
        title: "△|XY|",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "l3d",
        title: "△|XYH|",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "vectoranglexy",
        title: "α",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "beta",
        title: "β",
        width: 150,
        align:"center"
    }
];
interface iProps extends FormComponentProps,RouteComponentProps{
    userId:string
}

interface iState{
    surefaceSearchModel:SurefaceSearchModel,
    data:SuperviseDataModel,
    tableVisible:boolean,
    echartsVisible:boolean,
    curveTypeId:string,
    gnssColumns:Array<any>,
    sourceDataList:Array<SurfaceDisplacementAnalysisModel>,
    chartRadioValue:string,
    radioDisabled:boolean,
}

class GnssData extends Component<iProps,iState> {
     
    constructor(props){
        super(props);
    }
    private dataService = new DataService();
    private myChart = null;
    private deviceId = DeviceIdEnum.BIAOMIAN;

    state={
        surefaceSearchModel:new SurefaceSearchModel({}),
        data:new SuperviseDataModel({}),
        tableVisible:true,
        echartsVisible:false,
        curveTypeId:"",
        gnssColumns:gnss_total_column,
        sourceDataList:[] as Array<SurfaceDisplacementAnalysisModel>,
        chartRadioValue:"1",
        radioDisabled:false
    }

    componentDidMount(){
        // this.getSureFaceData(this.state.surefaceSearchModel);
        if(this.props.location.pathname && this.props.location.state){
            console.log("gnss data componentDidMount:",this.props.location.pathname,this.props.location.state)
            this.setSurefaceSearchModelFromRedirect(this.props.location.state);
        }
      
    }
    
    setSurefaceSearchModelFromRedirect=(searchParams)=>{
        let {stationId} = searchParams;
        let surefaceSearchModel = new SurefaceSearchModel({
            stationIdList:stationId,
            countPeriod:"6",
            startTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()-3*24*3600*1000),"yyyy-MM-dd hh:mm:ss"),
            endTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),"yyyy-MM-dd hh:mm:ss"),
        })
        this.getSureFaceData(surefaceSearchModel);
    }

    getSureFaceData=async(surefaceSearchModel:SurefaceSearchModel)=>{
        console.log("getSureFaceData:",surefaceSearchModel)
        let data = await this.dataService.getSureFaceData(surefaceSearchModel) as SuperviseDataModel;
        let sourceDataList = this.getSourceData(data);
        await this.setState({
            sourceDataList,
            data,
            surefaceSearchModel
        })
        if(this.state.echartsVisible){
            this.reloadEcharts();
        }
        if(this.state.tableVisible){
            this.changeColumns(this.state.curveTypeId);
        }
        
    }

    getSourceData=(data:SuperviseDataModel)=>{
        if(!data){
            return;
        }
        let sourceDataList:Array<SurfaceDisplacementAnalysisModel> = [];
        let {pointModels} = data;
        if(!pointModels || !pointModels.length){
            return;
        }
        pointModels.forEach(e=>{
            let {displacementList} = e;
            if(displacementList && displacementList.length){
                displacementList.forEach(f=>{
                    if(f && f.length){
                        sourceDataList = sourceDataList.concat(f);
                    }
                })
            }
        })
        
        return sourceDataList;
    }

    radioChange=async(e)=>{
        e.preventDefault();
        if(e.target.value === "1"){
            await this.setState({
                tableVisible:true,
                echartsVisible:false,
                chartRadioValue:"1"
            })
        }else{
            await this.setState({
                tableVisible:false,
                echartsVisible:true,
                chartRadioValue:"2"
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
        let columns ;
        console.log(curveTypeId)
        let echartsVisible=this.state.echartsVisible;
        let chartRadioValue = this.state.chartRadioValue;
        let tableVisible = this.state.tableVisible;
        let radioDisabled = this.state.radioDisabled;
        switch(curveTypeId){
            case DataTypeEnum.WEIYI_TOTAL:
                columns = gnss_total_column;
                echartsVisible=false;
                tableVisible = true;
                chartRadioValue = "1";
                radioDisabled = true;
                break;
            case DataTypeEnum.WEIYILISHI:
                columns = gnss_weiyi_column;
                radioDisabled = false;
                break;
            case DataTypeEnum.WEIYIJIASUDU:
                columns = gnss_weiyijiasudu_column;
                radioDisabled = false;
                break;
            case DataTypeEnum.WEIYISUDU:
                columns = gnss_weiyisudu_column;
                radioDisabled = false;
                break;
            case DataTypeEnum.WEIYISHILIANG:
                columns = gnss_weiyishiliang_column;
                radioDisabled = false;
                break;
            default:
                columns = gnss_weiyi_column;
                chartRadioValue = "1";
                break;
        }
        if(columns){
            await this.setState({
                curveTypeId,
                gnssColumns:columns,
                echartsVisible,
                tableVisible,
                chartRadioValue,
                radioDisabled,
                surefaceSearchModel:{...this.state.surefaceSearchModel,lineType:curveTypeId}
            })
            
        }

    }

    onSearch=(surefaceSearchModel:SurefaceSearchModel)=>{
        this.getSureFaceData(surefaceSearchModel);
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
        let {curveTypeId,echartsVisible,data} = this.state;
        if( echartsVisible){
            let option = null;
            switch(curveTypeId){
            case DataTypeEnum.WEIYILISHI:
                option = getGnssWeiyilishiOption(data);
                break;
            case DataTypeEnum.WEIYIJIASUDU:
                option = getGnssWeiyijiasudulishiOption(data);
                break;
            case DataTypeEnum.WEIYISUDU:
                option = getGnssWeiyisudulishiOption(data);
                break;
            case DataTypeEnum.WEIYISHILIANG:
                option = getGnssWeiyishiliangOption(data);
                break;
            case DataTypeEnum.WEIYIANDRAINS:
                option = getGnssWeiyiAndRainsOption(data);
                break;
            case DataTypeEnum.WEIYISUDUANDRAINS:
                option = getGnssWeiyisuduAndRainsOption(data);
                break;
            case DataTypeEnum.WEIYIANDWATERLEVEL:
                option = getGnssWeiyiAndWaterLevelOption(data);
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
            url:DownloadFilfUrl.GnssData,
            method:"get",
            fileName:"地表源数据导出.xlsx",
            params:this.state.surefaceSearchModel
        })
    }

    render() {
        let {sourceDataList,tableVisible,echartsVisible,gnssColumns,chartRadioValue,radioDisabled,surefaceSearchModel} = this.state;
        let { getFieldDecorator } = this.props.form;
        
        return (
            <div>
                <Card className={"data-setting-card"}>
                <GnssDataForm deviceId={this.deviceId} onSearch={this.onSearch} onCurvetTypeChange={this.onCurvetTypeChange} surefaceSearchModel={surefaceSearchModel}></GnssDataForm>
                <Row>
                    <Col span={6}><span style={{textAlign:"left"}}><h3>{tableVisible?"地表位移数据表":"地表位移趋势图"}</h3></span></Col>
                    <Col style={{textAlign:"right",marginBottom:10}}>
                        <Radio.Group defaultValue="1" value={chartRadioValue} buttonStyle="solid" onChange={this.radioChange}  style={{marginRight: 10}}>
                            <Radio.Button value="1">数据表</Radio.Button>
                            <Radio.Button value="2" disabled={radioDisabled}>趋势图</Radio.Button>
                        </Radio.Group>
                        <Button icon="export" type={"primary"} onClick={this.onExportData}>
                            导出
                        </Button>
                    </Col>
                </Row>
                    {tableVisible &&
                        <Table
                            rowKey="key"
                            bordered
                            columns={gnssColumns}
                            dataSource={sourceDataList}
                        />
                    }
                {echartsVisible && <div className={"data-echarts echart-backgroud-color"}><div id={"main"} style={{width:"100%",height:600}}/> </div>}
                </Card>
            </div>
        )
    }
}

const mapPropsToFields = props => {
    return {
     
    };
  };
export default Form.create({ mapPropsToFields })(GnssData);