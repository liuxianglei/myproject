import React,{ Component } from 'react';
import Form,{ FormComponentProps } from 'antd/lib/form';
import { Row, Col, Select, DatePicker, Button, Divider, Radio } from 'antd';
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
    deviceId:string,
    surefaceSearchModel:SurefaceSearchModel,
}
interface iState{
    projectId:string,
    partitionId:string,
    groupId:string,
    stationIds:Array<string>,
    countPeriod:string,
    startTime:string,
    endTime:string,
    tableVisible:boolean,
    echartsVisible:boolean,
    curveTypeId:string
}
class DataForm extends Component<iProps,iState>{
    private dataService = new DataService();
    private curveList = [] as Array<CurvetTypeModel>;
    private surefaceSearchModel = new SurefaceSearchModel({});
    state={
        projectId:null,
        partitionId:null,
        groupId:null,
        stationIds:[],
        countPeriod:"1",
        startTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()-3*24*3600*1000),"yyyy-MM-dd hh:mm:ss"),
        endTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),"yyyy-MM-dd hh:mm:ss"),
        tableVisible:true,
        echartsVisible:false,
        curveTypeId:null
    }

    componentDidMount(){
        this.getCurveTypeSet();
    }

    async componentWillReceiveProps(newprops){
        if(newprops.surefaceSearchModel){
            let {surefaceSearchModel} = newprops;
            if(surefaceSearchModel.stationIdList){
                await this.setState({
                    stationIds:this.getStationIds(surefaceSearchModel.stationIdList),
                    countPeriod:surefaceSearchModel.countPeriod,
                    startTime:surefaceSearchModel.startTime,
                    endTime:surefaceSearchModel.endTime,
                })
            }
        }
    }
    getStationIds=(stationIdListStr:string):Array<string>=>{
        let stationIds = [];
        if(stationIdListStr){
            let strs = stationIdListStr.split(",");
            strs.forEach(e=>{
                if(!stationIds.includes(e)){
                    stationIds.push(e);
                }
            })
        }
        return stationIds;
    }
    redo=()=>{
        this.setState({
            // projectId:null,
            partitionId:null,
            groupId:null,
            stationIds:[],
            countPeriod:null,
            startTime:"",
            endTime:"",
            curveTypeId:null
        })
    }
    getCurveTypeSet=async()=>{
        this.curveList = await this.dataService.getCurveTypeSet(this.props.deviceId);
        if(this.curveList && this.curveList.length){
            this.onCurvetTypeChange(this.curveList[0].curveTypeId);
        }
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

    onStationChange=async(stationIds:Array<string>)=>{
        await this.setState({
            stationIds
        })
    }

    getStationIdStr=(stationIds:Array<string>):string=>{
        console.log("getStationIdStr stationids:",stationIds)
        let stationIdStr = "";
        if(stationIds && stationIds.length){
            stationIds.forEach(e=>{
                stationIdStr = stationIdStr + e +",";
            })
        }

        return stationIdStr?stationIdStr.substring(0,stationIdStr.length-1):null
    }

    onSearch=()=>{
        let {projectId,
            stationIds,
            countPeriod, 
            startTime,
            endTime,
        } = this.state;

        this.surefaceSearchModel = {...this.surefaceSearchModel,
            countPeriod,startTime,endTime,
            stationIdList:this.getStationIdStr(stationIds)
        }
        this.props.onSearch(this.surefaceSearchModel);
    }

    onCurvetTypeChange=async(curveTypeId)=>{
        console.log("current curveTypeId:",curveTypeId);
        await this.setState({
            curveTypeId
        })
        this.props.onCurvetTypeChange(curveTypeId);
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

    render(){
        let {projectId,partitionId,groupId,stationIds,curveTypeId,countPeriod,startTime,endTime} = this.state;
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
                       <StationSelect projectId = {projectId} partitionId={partitionId} groupId={groupId} stationIds={stationIds} deviceId={this.props.deviceId} onChange={this.onStationChange} multiple={true}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={0} style={{marginBottom:-14}}>
                    {this.props.deviceId === DeviceIdEnum.JIANGYU && <>
                        <Col span={6} >
                        <Form.Item label={"统计周期:"}>
                            <Select defaultValue={countPeriod}  onChange={this.onCountPeriodChange} allowClear>
                                <Option value="1">小时</Option>
                                <Option value="0">日</Option>
                                <Option value="2">七日</Option>
                                <Option value="4">月</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    </>}
                <Col span={6}>
                    <Form.Item label={"数据类型:"}>
                        <Select defaultValue={this.curveList.length?this.curveList[0].curveTypeId:""} onChange={this.onCurvetTypeChange}>
                            {
                                this.curveList.map((e,key)=>
                                    <Option key={key} value={e.curveTypeId}>{e.curveTypeName}</Option>
                                    )
                            }
                        </Select>
                    </Form.Item>
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
export default Form.create({ mapPropsToFields })(DataForm);