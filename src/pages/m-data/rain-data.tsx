import React, { Component } from 'react'
import { Card, Row, Col, Select, Table, Radio, Button } from 'antd'
import Form, { FormComponentProps } from 'antd/lib/form';
import DataService from "../../service/data/DataService";
import SurefaceSearchModel from '../../model/data/SurefaceSearchModel';
import { convert } from '../../config/utils';
import { getRainOption} from "./echarts-utils";
import dark from "./dark";
import DataForm from "./data-form";
const echarts = require('echarts');
import "./data.less";
import RainGaugeAnalysisModel from '../../model/data/RainGaugeAnalysisModel';
import RainGaugeAnalysisRetModel from '../../model/data/RainGaugeAnalysisRetModel';
import { DataTypeEnum } from '../../model/enum/enum';
import { download } from '../../lib/utils';
import { DownloadFilfUrl } from '../../config/config';
import { RouteComponentProps } from 'react-router-dom';
const {Option} = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
const rain_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "time",
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
        dataIndex: "rains",
        title: "降雨量",
        width: 150,
        align:"center",
    }
];
interface iProps extends FormComponentProps,RouteComponentProps{
    userId:string
}

interface iState{
    surefaceSearchModel:SurefaceSearchModel,
    dataList:Array<RainGaugeAnalysisRetModel>,
    tableDataList:Array<RainGaugeAnalysisModel>,
    tableVisible:boolean,
    echartsVisible:boolean,
    curveTypeId:string,
}

class RainData extends Component<iProps,iState> {
     
    constructor(props){
        super(props);
    }
    private dataService = new DataService();
    private myChart = null;
    private deviceId = "402881e57303eb7f017303f75f130003";

    state={
        surefaceSearchModel:new SurefaceSearchModel({}),
        dataList:[] as Array<RainGaugeAnalysisRetModel>,
        tableDataList:[] as Array<RainGaugeAnalysisModel>,
        tableVisible:true,
        echartsVisible:false,
        curveTypeId:"",
    }

    componentDidMount(){
        // this.getRainsData(this.state.surefaceSearchModel);
        if(this.props.location.pathname && this.props.location.state){
            console.log("rain data componentDidMount:",this.props.location.pathname,this.props.location.state)
            this.setSurefaceSearchModelFromRedirect(this.props.location.state);
        }
    }

    setSurefaceSearchModelFromRedirect=(searchParams)=>{
        let {stationId} = searchParams;
        let surefaceSearchModel = new SurefaceSearchModel({
            stationIdList:stationId,
            countPeriod:"1",
            startTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()-3*24*3600*1000),"yyyy-MM-dd hh:mm:ss"),
        endTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),"yyyy-MM-dd hh:mm:ss"),
        });
        this.getRainsData(surefaceSearchModel);
    }

    getRainsData=async(surefaceSearchModel:SurefaceSearchModel)=>{
        console.log("getRainsData surefaceSearchModel,",surefaceSearchModel)
        let dataList = await this.dataService.getRainsData(surefaceSearchModel);
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

    getTableDataList=(dataList:Array<RainGaugeAnalysisRetModel>)=>{
        if(!dataList || !dataList.length){
            return [];
        }
        let tableDataList = [];
        dataList.forEach(e=>{
            tableDataList = tableDataList.concat(e.models)
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
        this.getRainsData(surefaceSearchModel);
    }

    initEchart=()=>{
        // 基于准备好的dom，初始化echarts实例
        let {curveTypeId,echartsVisible} = this.state;
        if(echartsVisible){
            this.myChart = echarts.init(document.getElementById('main'),'dark');
            this.setEchartOption();
        }
    }
    reloadEcharts=()=>{
        document.getElementById('main').removeAttribute('_echarts_instance_');
        this.initEchart();
        this.setEchartOption();
    }
    setEchartOption=()=>{
        // 绘制图表
        let {curveTypeId,echartsVisible} = this.state;
        if(echartsVisible){
            let option = null;
            switch(curveTypeId){
                case DataTypeEnum.RAINS:
                    option = getRainOption(this.state.dataList);
                    break;
                default:
                    option = getRainOption(this.state.dataList);
                    break;
            }
            if(option){
                this.myChart.setOption(option);
            }
        }
    }

    onExportData=()=>{
        download({
            url:DownloadFilfUrl.RainData,
            method:"get",
            fileName:"降雨量导出数据.xlsx",
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
                    <Col span={6}><span style={{textAlign:"left"}}><h3>{tableVisible?"降雨量历时数据表":"降雨量历时统计图"}</h3></span></Col>
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
                            columns={rain_column}
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
export default Form.create({ mapPropsToFields })(RainData);