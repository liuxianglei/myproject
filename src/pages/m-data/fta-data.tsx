import React, { Component } from 'react'
import { Card, Row, Col, Select, Table, Radio, Button, Input, InputNumber, Modal } from 'antd'
import Form, { FormComponentProps } from 'antd/lib/form';
import DataService from "../../service/data/DataService";
import SurefaceSearchModel from '../../model/data/SurefaceSearchModel';
import { convert } from '../../config/utils';
import {getFtaOption, getFtaDegreeOption, getFtaWeiyilishiOption, getFta3DOption, getFtaShiliangOption} from "./echarts-utils";
import dark from "./dark";
import FtaDataForm from "./fta-data-form";
const echarts = require('echarts');
const echartsGl = require('echarts-gl');
// import 'echarts-gl';
import "./data.less";
import FlexiTiltAnalysisModel from '../../model/data/FlexiTiltAnalysisModel';
import { getFlexData } from '../../api/data/data-api';
import { DeviceIdEnum, DataTypeEnum } from '../../model/enum/enum';
import FlexiTiltAnalysisTableModel from '../../model/data/FlexiTiltAnalysisTableModel';
import PointDataModel from '../../model/data/PointDataModel';
import PointModel from '../../model/data/PointModel';
import { download } from '../../lib/utils';
import { DownloadFilfUrl } from '../../config/config';
import { RouteComponentProps } from 'react-router-dom';
const {Option} = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
const fta_total_column:any = [
    {
        dataIndex: "dataDate",
        title: "时间",
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
        dataIndex: "pointName",
        title: "深度",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "sx",
        title: "△X",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "sy",
        title: "△Y",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "sxy",
        title: "△XY",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "ax",
        title: "Vx",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "ay",
        title: "Vy",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "axy",
        title: "Vxy",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "rotationAngle",
        title: "方位角",
        width: 150,
        align:"center",
    }
];
const fta_shenduweiyi_column:any = [
    {
        dataIndex: "dataDate",
        title: "时间",
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
        dataIndex: "number",
        title: "节点号",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "sx",
        title: "△X",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "sy",
        title: "△Y",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "sxy",
        title: "△XY",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "ax",
        title: "∑△X",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "ay",
        title: "∑△Y",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "axy",
        title: "∑△XY",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "z",
        title: "Z",
        width: 150,
        align:"center",
    }
];
const fta_jiedianweiyi_column:any = [
    {
        dataIndex: "dataDate",
        title: "时间",
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
        dataIndex: "number",
        title: "节点号",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "ax",
        title: "∑△X",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "ay",
        title: "∑△Y",
        width: 150,
        align:"center",
    },
    {
        dataIndex: "axy",
        title: "∑△XY",
        width: 150,
        align:"center",
    }
];
interface iCurveTypeField{
    curveTypeId:string,
    fieldName:string,
}

interface iProps extends FormComponentProps,RouteComponentProps{
    userId:string
}

interface iState{
    surefaceSearchModel:SurefaceSearchModel,
    data:FlexiTiltAnalysisModel,
    tableDatas:Array<FlexiTiltAnalysisTableModel>,
    tableVisible:boolean,
    echartsVisible:boolean,
    curveTypeId:string,
    pointName:string,
    main5Visible:boolean,
    main6Visible:boolean,
    main7Visible:boolean,
    tableColumn:Array<any>,
    radioDisabled:boolean,
    chartRadioValue:string,
    pointDatas:Array<FlexiTiltAnalysisTableModel>
    tableSourceDatas:Array<FlexiTiltAnalysisTableModel>,
    curveTypeIds:Array<string>
}

class FtaData extends Component<iProps,iState> {
     
    constructor(props){
        super(props);
    }
    private dataService = new DataService();
    private myChart1 = null;
    private myChart2 = null;
    private myChart3 = null;
    private myChart4 = null;
    private myChart5 = null;
    private myChart6 = null;
    private myChart7 = null;
    private deviceId = DeviceIdEnum.CEXIE;
    private pointName = "";
    state={
        surefaceSearchModel:new SurefaceSearchModel({}),
        data:new FlexiTiltAnalysisModel({}),
        tableDatas:[] as Array<FlexiTiltAnalysisTableModel>,
        tableVisible:true,
        echartsVisible:false,
        curveTypeId:"",
        pointName:"",
        main5Visible:false,
        main6Visible:false,
        main7Visible:false,
        chartRadioValue:"1",
        radioDisabled:false,
        tableColumn:fta_total_column,
        pointDatas:[] as Array<FlexiTiltAnalysisTableModel>,
        tableSourceDatas:[] as Array<FlexiTiltAnalysisTableModel>,
        curveTypeIds:[]
    }

    componentDidMount(){
        if(this.props.location.pathname && this.props.location.state){
            console.log("fta data componentDidMount:",this.props.location.pathname,this.props.location.state)
            this.setSurefaceSearchModelFromRedirect(this.props.location.state);
        }
    }
    setSurefaceSearchModelFromRedirect=(searchParams)=>{
        let {stationId} = searchParams;
        let surefaceSearchModel = new SurefaceSearchModel({
            stationId:stationId,dataQueryFrequency:24,
            startTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()-3*24*3600*1000),"yyyy-MM-dd hh:mm:ss"),
            endTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),"yyyy-MM-dd hh:mm:ss"),
        });
        this.getFlexData(surefaceSearchModel);
    }
    componentWillReceiveProps(newprops){
        console.log("fta data componentWillReceiveProps:",newprops.location.pathname,newprops.location.state)
    }
    getFlexData=async(surefaceSearchModel:SurefaceSearchModel)=>{
        // if(surefaceSearchModel){
        //     surefaceSearchModel.stationId = "402881e673328c450173328e4f5c0000";
        // }
        let data = await this.dataService.getFlexData(surefaceSearchModel) as FlexiTiltAnalysisModel;
        let tableDatas = this.getTableData(data);
        surefaceSearchModel.degree = data?data.degree:0;
        await this.setState({
            surefaceSearchModel,
            data,
            tableDatas
        })
        if(this.state.echartsVisible){
            this.setEchartOption(this.state.curveTypeIds);
        }
        if(this.state.tableVisible){
            this.changeTableColumns(this.state.curveTypeId);
        }
    }

    getTableData=(data:FlexiTiltAnalysisModel)=>{
        if(!data){
            return;
        }
        let tableDatas:Array<FlexiTiltAnalysisTableModel> = [];
        let {pointList,degree} = data;
        if(pointList && pointList.length){
            let {ax} = pointList[0];
            ax.forEach(x=>{
                pointList.forEach(point=>{
                    let tableData = tableDatas.find(e=>e.dataDate === x.dataDate && e.pointName === point.pointName);
                    if(!tableData){
                        let ay = this.getPointFieldValue(point,"ay",x.dataDate);
                        let axy = this.getPointFieldValue(point,"axy",x.dataDate);
                        let sx = this.getPointFieldValue(point,"sx",x.dataDate);
                        let sy = this.getPointFieldValue(point,"sy",x.dataDate);
                        let sxy = this.getPointFieldValue(point,"sxy",x.dataDate);
                        let vx = this.getPointFieldValue(point,"vx",x.dataDate);
                        let vy = this.getPointFieldValue(point,"vy",x.dataDate);
                        let vxy = this.getPointFieldValue(point,"vxy",x.dataDate);
                        let rotationAngle = this.getPointFieldValue(point,"rotationAngle",x.dataDate);
                        let z = this.getPointFieldValue(point,"z",x.dataDate);
                        let tableNewData = new FlexiTiltAnalysisTableModel({
                            dataDate:x.dataDate,
                            number:point.number,
                            pointName:point.pointName,
                            degree:degree,
                            ax:x.dataValue,
                            ay:ay?ay.dataValue:null,
                            axy:axy?axy.dataValue:null,
                            sx:sx?sx.dataValue:null,
                            sy:sy?sy.dataValue:null,
                            sxy:sxy?sxy.dataValue:null,
                            vx:vx?vx.dataValue:null,
                            vy:vy?vy.dataValue:null,
                            vxy:vxy?vxy.dataValue:null,
                            rotationAngle:rotationAngle?rotationAngle.dataValue:null,
                            z:z?z.dataValue:null,
                        });
                        tableDatas.push(tableNewData);
                    }
                })
            })
        }
        return tableDatas;
    }

    getPointFieldValue=(pointDataModel:PointDataModel,field:string,dateDate:Date):PointModel=>{
        if(!pointDataModel || !field){
            return;
        }
        return pointDataModel[field].find(e=>e.dataDate === dateDate);
    }

    radioChange=async(e)=>{
        e.preventDefault();
        if(e.target.value === "1"){
            this.setState({
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
        this.changeTableColumns(curveTypeId);
    }

    onDataTypeChange=async(curveTypeIds:Array<string>)=>{
        if(this.state.echartsVisible){
            this.setEchartOption(curveTypeIds);
        }
        await this.setState({
            curveTypeIds
        })
    }

    changeTableColumns=async(curveTypeId:string)=>{
        let tableColumn = [];
        let tableVisible = this.state.tableVisible;
        let radioDisabled = this.state.radioDisabled;
        let chartRadioValue = this.state.chartRadioValue;
        let echartsVisible = this.state.echartsVisible;
        let tableSourceDatas = this.state.tableSourceDatas;
        switch(curveTypeId){
            case DataTypeEnum.ROUXING_TOTAL:
                tableColumn = fta_total_column;
                tableVisible = true;
                echartsVisible = false;
                radioDisabled = true;
                chartRadioValue = "1";
                tableSourceDatas = this.state.tableDatas;
                break;
            case DataTypeEnum.SHENDUWEIYI:
                tableColumn = fta_shenduweiyi_column;
                radioDisabled = false;
                tableSourceDatas = this.state.tableDatas;
                break;
            case DataTypeEnum.JIEDIANWEIYILISHI:
                this.getSourceDatasByPointNameFromTableDatas();
                tableColumn = fta_jiedianweiyi_column;
                radioDisabled = false;
                tableSourceDatas = this.state.pointDatas
                break;
            default:
                tableColumn = fta_total_column;
                radioDisabled = true;
                tableSourceDatas = this.state.tableDatas;
                break;
        }
        console.log("tableSourceDatas:",tableSourceDatas)
        await this.setState({
            tableColumn,
            curveTypeId,
            tableVisible,
            radioDisabled,
            chartRadioValue,
            echartsVisible,
            tableSourceDatas
        })
    }

    getPointByPointNameFromSourceData=(pointName:string):PointDataModel=>{
        let {data} = this.state;
        let pointDataModel = new PointDataModel({});
        if(data){
            let {pointList} = data;
            if(pointList && pointList.length){
                pointDataModel = pointList.find(e=>e.pointName === pointName);
            }
        }
        return pointDataModel;
    }

    getSourceDatasByPointNameFromTableDatas=async()=>{
        let {tableDatas} = this.state;
        let pointDatas = [];
        console.log("pointName:",this.pointName);
        if(this.pointName){
            pointDatas = tableDatas.filter(e=>e.pointName === this.pointName);
        }
        await this.setState({
            pointDatas
        })
    }

    onSearch=(surefaceSearchModel:SurefaceSearchModel)=>{
        
        this.getFlexData(surefaceSearchModel);
    }

    initEchart=()=>{
        // 基于准备好的dom，初始化echarts实例
        let {echartsVisible} = this.state;
        if( echartsVisible){
            this.myChart1 = echarts.init(document.getElementById('main1'),'dark');
            this.myChart2 = echarts.init(document.getElementById('main2'),'dark');
            this.myChart3 = echarts.init(document.getElementById('main3'),'dark');
            
            this.setEchartOption([]);
        }
    }
    getFtaOption=(curveTypeId:string,data:FlexiTiltAnalysisModel,curveType2Id:string)=>{
        let option = getFtaOption(data,this.getFieldBycurveTypeId(curveTypeId),this.getFieldBycurveTypeId(curveType2Id));
        return option;
    }
    // setChart4Option=(pointName)=>{
    //     let {echartsVisible,data} = this.state;
    //     if(echartsVisible){
    //         this.myChart4 = echarts.init(document.getElementById('main4'),'dark');
    //         this.myChart4.setOption(getFtaWeiyilishiOption(data,pointName,"ax","ay"));
    //     }
    // }

   
    getFieldsBycurveTypeIds=(curveTypeIds:Array<string>):Array<iCurveTypeField>=>{
        let fields = [] as Array<iCurveTypeField>;
        if(!curveTypeIds || !curveTypeIds.length){
            fields = [{curveTypeId:DataTypeEnum.ROUXING_SHENDUWEIYI_X,fieldName:this.getFieldBycurveTypeId(DataTypeEnum.ROUXING_SHENDUWEIYI_X)},
                {curveTypeId:DataTypeEnum.ROUXING_SHENDUWEIYI_Y,fieldName:this.getFieldBycurveTypeId(DataTypeEnum.ROUXING_SHENDUWEIYI_Y)}];
            return fields;
        }
        //控制只能选两个展示
        if(curveTypeIds.length === 1){
            this.fillCurveTypeId(curveTypeIds);
        }else if(curveTypeIds.length > 2){
            curveTypeIds = curveTypeIds.slice(0,2);
        }
        curveTypeIds.forEach(e=>{
            fields.push({
                curveTypeId:e,
                fieldName:this.getFieldBycurveTypeId(e)
            });
        })
        return fields;
    }

    //如果只选了一个默认再自动补充一个
    fillCurveTypeId=(curveTypeIds:Array<string>)=>{
        let totalCurveTypeIds = [DataTypeEnum.ROUXING_SHENDUWEIYI_X,DataTypeEnum.ROUXING_SHENDUWEIYI_Y,DataTypeEnum.ROUXING_SHENDUWEIYI_XY];
        if(curveTypeIds && curveTypeIds.length === 1){
            
            curveTypeIds.push(totalCurveTypeIds.filter(e=>e !== curveTypeIds[0])[0]);
        }
    }

    getFieldBycurveTypeId=(curveTypeId:string):string=>{
        let fieldName = null;
        switch(curveTypeId){
            case DataTypeEnum.ROUXING_SHENDUWEIYI_X:
                fieldName= "ax";
                break;
            case DataTypeEnum.ROUXING_SHENDUWEIYI_Y:
                fieldName = "ay";
                break;
            case DataTypeEnum.ROUXING_SHENDUWEIYI_XY:
                fieldName = "axy";
                break;
            default:
                fieldName= "ax";
                break;
        }
        return fieldName;
    }

    ftaWeiyishiliangShow=async()=>{
        console.log("ftaWeiyishiliangShow");
        await this.setState({
            main7Visible:true
        })
        this.setMyChart7Option();
    }

    setEchartOption=async(curveTypeIds:Array<string>)=>{
        let fields = this.getFieldsBycurveTypeIds(curveTypeIds);
        console.log("setEchartOption fields:",fields);
        // 绘制图表
        let {echartsVisible,data,surefaceSearchModel} = this.state;
        if(echartsVisible){
            let option1 = this.getFtaOption(fields[0].curveTypeId,data,fields[1].curveTypeId);
            console.log("option1:",option1);
            let option2 = this.getFtaOption(fields[1].curveTypeId,data,fields[0].curveTypeId);
            console.log("option2:",option2);

            this.myChart4 = echarts.init(document.getElementById('main4'),'dark');
            this.myChart4.setOption(getFtaWeiyilishiOption({...data,pointList:[]},"",null,fields[0].fieldName,fields[1].fieldName,this.ftaWeiyishiliangShow));
            if(option1){
                this.myChart1.setOption(option1);
                this.myChart1.on('click', (params) => {
                    this.setPointName(params.name);
                    console.log("point:",params)
                    let pointDataModel = this.getPointByPointNameFromSourceData(params.name);
                    console.log("fta pointDataModel",pointDataModel);
                    this.myChart4 = echarts.init(document.getElementById('main4'),'dark');
                    this.myChart4.setOption(getFtaWeiyilishiOption(data,params.name,pointDataModel.number,
                        fields[0].fieldName,fields[1].fieldName,this.ftaWeiyishiliangShow));
                    // this.setMyChart7Option(pointDataModel);
                    return this.pointName;
                });
            }
            if(option2){
                this.myChart2.setOption(option2);
                this.myChart2.on('click',  (params)=> {
                    this.setPointName(params.name);
                    console.log("point:",params)
                    let pointDataModel = this.getPointByPointNameFromSourceData(params.name);
                    console.log("fta pointDataModel",pointDataModel);
                    this.myChart4 = echarts.init(document.getElementById('main4'),'dark');
                    this.myChart4.setOption(getFtaWeiyilishiOption(data,params.name,pointDataModel.number,
                        fields[0].fieldName,fields[1].fieldName,this.ftaWeiyishiliangShow));
                    this.pointName = params.name;
                    // this.setMyChart7Option(pointDataModel);
                });
            }
            this.myChart3.setOption(getFtaDegreeOption(surefaceSearchModel.degree));
            
        }
    }

    setMyChart7Option=()=>{
        let {pointName} = this.state;
        let pointDataModel = this.getPointByPointNameFromSourceData(pointName);
        if(!pointDataModel){
           return; 
        }
        this.myChart7 = echarts.init(document.getElementById('main7'),'dark');
        this.myChart7.setOption(getFtaShiliangOption(pointDataModel));
    }

    setPointName=async(pointName:string)=>{
        await this.setState({
            pointName
        })
    }

    set3DEchart=async(type:string)=>{
        let {data} = this.state;
        if(type ==="main5"){
            await this.setState({
                main5Visible:true
            })
            this.myChart5 = echarts.init(document.getElementById('main5'),"default");
            this.myChart5.setOption(getFta3DOption(data,"variant3d","三维变形图"));
        }else{
            await this.setState({
                main6Visible:true
            })
            this.myChart6 = echarts.init(document.getElementById('main6'),'default');
            this.myChart6.setOption(getFta3DOption(data,"install3d","三维安装图"));
        }
    }

    onModalCancel=()=>{
        this.setState({
            main5Visible:false,
            main6Visible:false,
            main7Visible:false
        })
    }

    onChangeDegree=async(value)=>{
        let {surefaceSearchModel} = this.state
        // this.getFlexData({...surefaceSearchModel,degree:value.target.value});
        await this.setState({
            surefaceSearchModel:{...surefaceSearchModel,degree:value}
        })
    }

    onClickDegreeChange=()=>{
        this.onSearch(this.state.surefaceSearchModel);
    }

    onExportData=()=>{
        download({
            url:DownloadFilfUrl.FtaData,
            method:"get",
            fileName:"柔性源数据导出.xlsx",
            params:this.state.surefaceSearchModel
        })
    }


    render() {
        let {data,tableVisible,echartsVisible,main5Visible,main6Visible,main7Visible,surefaceSearchModel,tableSourceDatas,tableColumn,radioDisabled,chartRadioValue} = this.state;
        let { getFieldDecorator } = this.props.form;
        console.log("data.degree:",data.degree)
        return (
            <div>
                <Card className={"data-setting-card"}>
                <FtaDataForm deviceId={this.deviceId} onSearch={this.onSearch} onCurvetTypeChange={this.onCurvetTypeChange} onDataTypeChange={this.onDataTypeChange} radioValue={chartRadioValue} surefaceSearchModel={surefaceSearchModel}></FtaDataForm>
                <Row>
                    <Col span={6}><span style={{textAlign:"left"}}><h3>{tableVisible?"柔性测斜数据表":"柔性测斜趋势图"}</h3></span></Col>
                    <Col style={{textAlign:"right",marginBottom:10}}>
                        <Radio.Group value={chartRadioValue} buttonStyle="solid" onChange={this.radioChange} style={{marginRight: 10}}>
                            <Radio.Button value="1">数据表</Radio.Button>
                            <Radio.Button value="2" disabled={radioDisabled}>趋势图</Radio.Button>
                        </Radio.Group>
                        <Button icon="export" onClick={this.onExportData} type={"primary"} style={{marginRight: 10}}>
                            导出
                        </Button>
                        <Button type={"primary"} onClick={()=>this.set3DEchart("main5")} style={{marginRight: 10}}>3D变形图</Button>
                        <Button type={"primary"} onClick={()=>this.set3DEchart("main6")} style={{marginRight: 10}}>3D安装图</Button>
                    </Col>
                </Row>
                    {tableVisible &&
                        <Table
                            rowKey="key"
                            bordered
                            columns={tableColumn}
                            dataSource={tableSourceDatas}
                        />
                    }
                    {echartsVisible && 
                        <div style={{height:700}}>
                            <div style={{width:"50%", height:700,float:"left"}}>
                                <div id={"main1"} style={{float:"left" ,width:"49%"}} className={"fta-data-class echart-backgroud-color"}/>
                                <div id={"main2"} style={{float:"right",width:"49%"}} className={"fta-data-class echart-backgroud-color"}/>
                            </div>
                            <div style={{width:"50%", paddingLeft:20, height:700,float:"right"}}>
                                <div className={"echart-backgroud-color"} style={{width:"100%" ,height:280}}>
                                    <div id={"main3"} style={{width: "50%",height:280,float:"left"}}/>
                                    <div style={{width:"50%",float:"right"}}>
                                        <div style={{width:270,marginTop:25}}><span>说明：输入变形方向至XMark方向的夹角(顺时针“+”,逆时针“-”)，进行方向纠正后X轴数据即为变形方向数据。</span></div>
                                        <div style={{marginTop:45}}>
                                            <Button disabled >度数：</Button>
                                            <InputNumber value={surefaceSearchModel.degree} onChange={this.onChangeDegree}></InputNumber>
                                            <Button style={{marginLeft:19}} type={"primary"} onClick={this.onClickDegreeChange}>方向纠正</Button>
                                            </div>
                                        <div style={{marginTop:45}}><Button style={{width:270}} disabled>变形方向:{data.degree}</Button></div>
                                        {/* <div style={{paddingLeft:60,paddingTop:20}}><Button type={"primary"} onClick={()=>this.set3DEchart("main5")} style={{width:270}}>3D变形图</Button></div>
                                        <div style={{paddingLeft:60,paddingTop:20}}><Button type={"primary"} onClick={()=>this.set3DEchart("main6")} style={{width:270}}>3D安装图</Button></div> */}
                                    </div>
                                </div>
                                <div id={"main4"} style={{height:420,paddingTop:20}} className={"echart-backgroud-color"}/>
                            </div>
                        </div>
                    }
                </Card>

                <Modal width={800} className={"white-modal"} bodyStyle={{backgroundColor:"white", height:600}} visible={main5Visible} footer={null} onCancel={this.onModalCancel}>
                    <div id={"main5"} style={{width: "auto",height:"100%"}}/>
                </Modal>
                <Modal width={800} className={"white-modal"} bodyStyle={{backgroundColor:"white", height:600}} visible={main6Visible} footer={null} onCancel={this.onModalCancel}>
                    <div id={"main6"} style={{width: "auto",height:"100%"}}/>
                </Modal>
                <Modal width={900} bodyStyle={{height:700}} visible={main7Visible} footer={null} onCancel={this.onModalCancel}>
                    <div id={"main7"} style={{width: "auto",height:"100%"}}/>
                </Modal>
            </div>
        )
    }
}

const mapPropsToFields = props => {
    return {
     
    };
  };
export default Form.create({ mapPropsToFields })(FtaData);