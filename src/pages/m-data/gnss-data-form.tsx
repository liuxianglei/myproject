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
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { convert } from '../../lib/utils';
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
    surefaceSearchModel:SurefaceSearchModel
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
    curveTypeId:string,
    anotherDeviceId:string,
    anotherStationId:string,
    curveList:Array<CurvetTypeModel>
}
class GnssDataForm extends Component<iProps,iState>{
    private dataService = new DataService();
    private surefaceSearchModel = new SurefaceSearchModel({});
    state={
        projectId:null,
        partitionId:null,
        groupId:null,
        stationIds:[],
        countPeriod:"0",
        startTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()-3*24*3600*1000),"yyyy-MM-dd hh:mm:ss"),
        endTime:convert(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),"yyyy-MM-dd hh:mm:ss"),
        tableVisible:true,
        echartsVisible:false,
        curveTypeId:null,
        anotherDeviceId:null,
        anotherStationId:null,
        curveList:[] as Array<CurvetTypeModel>
    }

    componentDidMount(){
        this.getCurveTypeSet();
    }

    async componentWillReceiveProps(newprops){
        console.log("surefaceSearchModel:",newprops.surefaceSearchModel)
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
            stationIds:null,
            countPeriod:"",
            startTime:"",
            endTime:"",
            curveTypeId:null,
            anotherDeviceId:null,
            anotherStationId:null,
        })
    }

    getCurveTypeSet=async()=>{
        let curveList = await this.dataService.getCurveTypeSet(this.props.deviceId);
        await this.setState({
            curveList
        })
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
        console.log("gnss stationIds:",stationIds)
        
        await this.setState({
            stationIds
        })
    }

    onSearch=()=>{
        let {projectId,
            stationIds,
            countPeriod, 
            startTime,
            endTime,
            anotherDeviceId,
            anotherStationId,
            curveTypeId
        } = this.state;

        
        this.surefaceSearchModel = {...this.surefaceSearchModel,
            countPeriod,startTime,endTime,
            stationIdList:this.getStationIdStr(stationIds),
            stationId:anotherStationId,
            deviceId:anotherDeviceId,
            lineType:curveTypeId,
        }
        this.props.onSearch(this.surefaceSearchModel);
    }

    getStationIdStr=(stationIds:Array<string>):string=>{
        let stationIdStr = "";
        if(stationIds && stationIds.length){
            stationIds.forEach(e=>{
                stationIdStr = stationIdStr + e +",";
            })
        }

        return stationIdStr?stationIdStr.substring(0,stationIdStr.length-1):null
    }

    onCurvetTypeChange=async(curveTypeId)=>{
        console.log(curveTypeId);
        await this.setState({
            curveTypeId,
            anotherDeviceId:null,
            anotherStationId:null
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

    onAnotherDeviceIdChange=async(anotherDeviceId:string)=>{
        await this.setState({
            anotherDeviceId
        })
    }

    onAnotherStationChange=async(anotherStationId)=>{
        await this.setState({
            anotherStationId
        })
    }

    getMutipleVisible=(curveTypeId:string)=>{
        return (curveTypeId === DataTypeEnum.WEIYIANDRAINS || curveTypeId === DataTypeEnum.WEIYIANDWATERLEVEL || curveTypeId === DataTypeEnum.WEIYISUDUANDRAINS);
    }

    render(){
        let {projectId,partitionId,groupId,stationIds,curveTypeId,anotherDeviceId,anotherStationId,curveList,countPeriod,startTime,endTime} = this.state;
        let mutipleVisible = this.getMutipleVisible(curveTypeId);
        console.log("startTime",startTime)
        console.log("endTime",endTime)
        console.log("gnss mutipleVisible:",mutipleVisible);
        let dates:any = []
        if(startTime && endTime){
            dates = [moment(startTime, "yyyy-MM-DD hh:mm:ss"), moment(endTime, "yyyy-MM-DD hh:mm:ss")];
        }
        let { getFieldDecorator } = this.props.form;
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
            <Row gutter={0}>
                <Col span={6}>
                    <Form.Item label={"统计周期:"}>
                        <Select value={countPeriod} onChange={this.onCountPeriodChange} allowClear>
                            <Option value="0">日</Option>
                            <Option value="1">三天</Option>
                            <Option value="2">周</Option>
                            <Option value="3">季</Option>
                            <Option value="4">月</Option>
                            <Option value="5">年</Option>
                            <Option value="6">实时</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6} >
                    <Form.Item label={"数据类型:"} style={{paddingLeft:"3"}}>
                        <Select  onChange={this.onCurvetTypeChange} value={curveTypeId}>
                            {
                                curveList.map((e,key)=>
                                    <Option key={key} value={e.curveTypeId} >{e.curveTypeName}</Option>
                                    )
                            }
                        </Select>
                    </Form.Item>
                </Col>
            
                <Col span={6}>
                    <Form.Item label={"设备类型:"}>
                        <Select  onChange={this.onAnotherDeviceIdChange} disabled={!mutipleVisible} value={anotherDeviceId}>
                            {
                                (curveTypeId === DataTypeEnum.WEIYIANDRAINS || curveTypeId === DataTypeEnum.WEIYISUDUANDRAINS) &&
                                <Option key={1} value={DeviceIdEnum.JIANGYU}>{"降雨量"}</Option>
                            }
                            {
                                curveTypeId === DataTypeEnum.WEIYIANDWATERLEVEL &&
                                <Option key={2} value={DeviceIdEnum.SHUIWEI}>{"水位"}</Option>
                            }
                            
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={"叠加监测点:"}>
                        <StationSelect stationIds={[anotherStationId]} deviceId={anotherDeviceId} projectId={projectId} onChange={this.onAnotherStationChange} disabled={!mutipleVisible} multiple={false}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6} >
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
export default Form.create({ mapPropsToFields })(GnssDataForm);