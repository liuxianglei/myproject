import React,{ Component } from 'react';
import Form,{ FormComponentProps } from 'antd/lib/form';
import { Row, Col, Select, DatePicker, Button, Divider, Radio, InputNumber, Input } from 'antd';
import ProjectSelect from '../components/project/project-select';
import PartitionSelect from '../components/partition/partition-select';
import GroupSelect from '../components/group/group-select';
import StationSelect from '../components/station/station-select';
import CurvetTypeModel from '../../model/data/CurveTypeModel';
import DataService from '../../service/data/DataService';
import SurefaceSearchModel from '../../model/data/SurefaceSearchModel';
// import moment from 'antd/node_modules/moment';
import DeviceModel from '../../model/device/DeviceModel';
import { DeviceIdEnum, DataTypeEnum } from '../../model/enum/enum';
import { RouteComponentProps } from 'react-router-dom';
import "./data.less";
import { convert } from '../../lib/utils';
import moment from 'moment';
const {RangePicker } = DatePicker;

const {Option} = Select;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
interface iProps extends FormComponentProps{
    onSearch:Function,
    onCurvetTypeChange:Function,
    onDataTypeChange:Function,
    deviceId:string,
    radioValue:string,
    surefaceSearchModel:SurefaceSearchModel
}
interface iState{
    projectId:string,
    partitionId:string,
    groupId:string,
    stationId:string,
    countPeriod:string,
    startTime:string,
    endTime:string,
    tableVisible:boolean,
    echartsVisible:boolean,
    curveTypeId:string,
    curveTypeIds:Array<string>,
    dataQueryFrequency:number,
}
class FtaDataForm extends Component<iProps,iState>{
    private dataService = new DataService();
    private curveList = [] as Array<CurvetTypeModel>;
    private surefaceSearchModel = new SurefaceSearchModel({});
    state={
        projectId:null,
        partitionId:null,
        groupId:null,
        stationId:"",
        countPeriod:"",
        startTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()-3*24*3600*1000),"yyyy-MM-dd hh:mm:ss"),
        endTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),"yyyy-MM-dd hh:mm:ss"),
        tableVisible:true,
        echartsVisible:false,
        curveTypeId:null,
        curveTypeIds:[],
        dataQueryFrequency:24
    }

    componentDidMount(){
        this.getCurveTypeSet();
    }

    async componentWillReceiveProps(newprops){
        // console.log("fta form componentWillReceiveProps:",newprops.location.pathname,newprops.location.state)
        if(newprops.surefaceSearchModel){
            let {surefaceSearchModel} = newprops;
            if(surefaceSearchModel.stationId){
                await this.setState({
                    stationId:surefaceSearchModel.stationId,
                    dataQueryFrequency:surefaceSearchModel.dataQueryFrequency,
                    startTime:surefaceSearchModel.startTime,
                    endTime:surefaceSearchModel.endTime,
                })
            }
        }
    }
    redo=async()=>{
        await this.setState({
            // projectId:null,
            partitionId:null,
            groupId:null,
            stationId:null,
            countPeriod:"",
            startTime:"",
            endTime:"",
            curveTypeId:null,
            curveTypeIds:[],
            dataQueryFrequency:null
        })
    }
    getCurveTypeSet=async()=>{
        this.curveList = await this.dataService.getCurveTypeSet(this.props.deviceId);
        // if(this.curveList && this.curveList.length){
        //     this.onCurvetTypeChange(this.curveList[0].curveTypeId);
        // }
    }

    onProjectChange=(projectId)=>{
        this.setState({
            projectId
        })
    }

    onPartitionChange=(partitionId)=>{
        this.setState({
            partitionId
        })
    }

    onGroupChange=(groupId)=>{
        this.setState({
            groupId
        })
    }

    onStationChange=async(stationIds)=>{
        console.log("fta stationId:",stationIds)
        
        await this.setState({
            stationId:stationIds
        })
    }

    onSearch=()=>{
        let {projectId,
            stationId,
            dataQueryFrequency, 
            startTime,
            endTime,
        } = this.state;

        this.surefaceSearchModel = {...this.surefaceSearchModel,
            dataQueryFrequency,startTime,endTime,
            stationId:stationId
        }
        this.props.onSearch(this.surefaceSearchModel);
    }

    onCurvetTypeChange=async(curveTypeId)=>{
        console.log(curveTypeId);
        this.surefaceSearchModel.lineType = curveTypeId;
        await this.setState({
            curveTypeId,
            
        })
        this.props.onCurvetTypeChange(curveTypeId);
    }
    onDataTypeChange=async(value,option)=>{
        let curentIds = [] as Array<string>;
        if(value && value.length){
            for(let i = 0;i<value.length;i++){
                if(!curentIds.find(f=>f === value[i])){
                    curentIds.push(value[i]);
                }
            }
        }
        await this.setState({
            curveTypeIds:curentIds
        })
        this.props.onDataTypeChange(curentIds);
    }

    dateChange=async(date, dateString: Array<string>)=>{
        console.log(date,dateString);
        await this.setState({
            startTime:dateString[0],
            endTime:dateString[1],
        })
    }

    onCountPeriodChange=async(value)=>{
        await this.setState({
            countPeriod:value,
        })
    }

    onDataQueryFrequencyChange=async e=>{
        console.log("onDataQueryFrequencyChange:",e)
        await this.setState({
            dataQueryFrequency:e,
        })
    }

    render(){
        let {projectId,partitionId,groupId,stationId,curveTypeId,dataQueryFrequency,curveTypeIds,startTime,endTime} = this.state;
        let { getFieldDecorator } = this.props.form;
        let dates:any = []
        if(startTime && endTime){
            dates = [moment(startTime, "yyyy-MM-DD hh:mm:ss"), moment(endTime, "yyyy-MM-DD hh:mm:ss")];
        }
        return (
            <div>
            <Form {...formItemLayout} colon={false}>
            <Row gutter={0}>
                <Col span={6}>
                    <Form.Item label={"项目:"}>
                        <ProjectSelect  projectId={projectId} deviceId={this.props.deviceId} onChange={this.onProjectChange}></ProjectSelect>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={"分区:"}>
                        <PartitionSelect projectId = {projectId} partitionId={partitionId} onChange={this.onPartitionChange}/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={"分组:"}>
                       <GroupSelect  projectId = {projectId} partitionId={partitionId} groupId={groupId} onChange={this.onGroupChange}/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={"监测点:"}>
                       <StationSelect projectId = {projectId} partitionId={partitionId} groupId={groupId} stationIds={[stationId]} deviceId={this.props.deviceId} onChange={this.onStationChange} multiple={false}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={0} >
                <Col span={6} >
                    <Form.Item label={"查询频率:"} className={"fta-inputnum-formitem"}>
                       <InputNumber step={1} precision={0} onChange={this.onDataQueryFrequencyChange} value={dataQueryFrequency} ></InputNumber>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    {this.props.radioValue === "1" && 
                       <Form.Item label={"数据源:"}>
                        <Select onChange={this.onCurvetTypeChange} maxTagCount={2} value={curveTypeId} allowClear>
                            <Option key={DataTypeEnum.SHENDUWEIYI} value={DataTypeEnum.SHENDUWEIYI}>深度位移曲线</Option>
                            <Option key={DataTypeEnum.JIEDIANWEIYILISHI} value={DataTypeEnum.JIEDIANWEIYILISHI}>节点位移历时曲线</Option>
                            <Option key={DataTypeEnum.ROUXING_TOTAL} value={DataTypeEnum.ROUXING_TOTAL}>综合数据分析表</Option>
                                {/* {
                                    this.curveList.map((e,key)=>
                                        <Option key={key} value={e.curveTypeId}>{e.curveTypeName}</Option>
                                        )
                                } */}
                        </Select>
                        </Form.Item>
                    }
                    {
                        this.props.radioValue === "2" &&
                        <Form.Item label={"曲线类型:"}>
                            <Select onChange={this.onDataTypeChange} maxTagCount={2} mode={"multiple"} value={curveTypeIds} allowClear>
                                <Option key={DataTypeEnum.ROUXING_SHENDUWEIYI_X}>X向深度位移</Option>
                                <Option key={DataTypeEnum.ROUXING_SHENDUWEIYI_Y}>Y向深度位移</Option>
                                <Option key={DataTypeEnum.ROUXING_SHENDUWEIYI_XY} >XY向深度位移</Option>
                            </Select>
                        </Form.Item>
                    }
                </Col>
                <Col span={6}>
                    <Form.Item label={"起止时间:"}>
                        <RangePicker style={{width:"100%"}} onChange={this.dateChange} value={dates} format={"YYYY-MM-DD HH:mm:ss"} 
                        showTime={{
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                          }}
                        allowClear/>
                    </Form.Item>
                </Col>
                <Col span={5} offset={1}>
                    <Button type="primary" icon="search" onClick={this.onSearch}>
                        查询
                    </Button>
                    &nbsp;&nbsp;
                    <Button icon="redo" onClick={this.redo}>
                        重置
                    </Button>
                </Col>
            </Row>
            <Divider style={{margin:15}}/>
        </Form>
        </div>
            
        
        )
    }
}
const mapPropsToFields = props => {
    return {
        onSearch:Form.createFormField({
            ...props.onSearch,
            value: props.onSearch
        }),
    };
  };
export default Form.create({ mapPropsToFields })(FtaDataForm);