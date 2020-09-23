import React, { Component } from 'react'
import { Card, Col, Row, Form, Button, Divider, Modal, Switch, Input } from 'antd';
import ProjectSelect from '../../components/project/project-select';
import PartitionSelect from '../../components/partition/partition-select';
import GroupSelect from '../../components/group/group-select';
import StationTypeCheckbox from '../../components/station/station-type-checkbox';
import StationMap from '../../components/amap/StationMap'
import ProjectVo from '../../../model/project/ProjectVo';
import ProjectService from '../../../service/project/ProjectService';
import StationVo from '../../../model/station/StationVo';
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'
import DInitModal from './components/DInitModal'
import CInitModal from './components/CInitModal'
import SubModal from './components/SubModal'
import StationService from '../../../service/station/StationService';
import StationQuery from '../../../model/station/StationQuery';
import { DeviceIdEnum } from '../../../model/enum/enum';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};
interface iState{
    projectId:string,
    partitionId:string,
    groupId:string,
    deviceIds:Array<string>,
    stations:Array<StationVo>,
    addVisible:boolean,
    editVisible:boolean,
    addStation:StationVo,
    editStation:StationVo,
    dibiaoInitVisible:boolean,
    cexieInitVisible:boolean,
    subVisible:boolean
}

export default class Station extends Component<iState> {
    state:iState={
        projectId:null,
        partitionId:null,
        groupId:null,
        deviceIds:[],
        stations:[],
        addVisible:false,
        editVisible:false,
        dibiaoInitVisible:false,
        cexieInitVisible:false,
        subVisible:false,
        addStation:new StationVo({}),
        editStation:new StationVo({})
    }
    private project:ProjectVo = null;
    private projectService:ProjectService = new ProjectService();
    private stationService:StationService = new StationService();

    onProjectNameChange = async ( projectId ) =>{
        this.project = await this.projectService.getProjectInfo(projectId);
        this.setState({ projectId },()=>{this.search()});
    }

    onPartitionNameChange = ( partitionId ) =>{
        this.setState({ partitionId });
    }

    onGroupNameChange = ( groupId ) =>{
        this.setState({ groupId });
    }

    onDeviceChange = ( deviceIds ) =>{
        this.setState({ deviceIds });
    }

    onMapChange = async (type:string,station:StationVo) =>{
        if(type === "add"){
            station.projectId = this.project.projectId;
            station.projectName = this.project.projectName;
            station.partitionId = this.state.partitionId;
            station.groupId = this.state.groupId;
            this.setState({
                addStation:station,
                addVisible:true
            });
        }
        if(type === "edit"){
            station.projectName = this.project.projectName;
            this.setState({
                editStation:station,
                editVisible:true
            });
        }
        if(type === "del"){
            Modal.confirm({
                title: '删除监测点！',
                content: <span>确认删除监测点：<span style={{color:"red"}}>{station.stationName}</span> 吗？</span>,
                okText: '确认',
                onOk:async ()=>{
                    console.log(station)
                    await this.stationService.delStation(station.stationId,station.deviceId);
                    this.search();
                },
                cancelText: '取消',
              });
        }
        if(type === "init"){
            if(DeviceIdEnum.BIAOMIAN === station.deviceId){
                this.setState({
                    editStation:station,
                    dibiaoInitVisible:true
                })
            }
            if(DeviceIdEnum.CEXIE === station.deviceId){
                this.setState({
                    editStation:station,
                    cexieInitVisible:true
                })
            }
           
        }
        if(type === "sub"){
            this.setState({
                editStation:station,
                subVisible:true
            })
        }
        if(type === "move"){
            await this.stationService.editStation(station);
            this.search();
        }
    }
    
    search = async () =>{
        let { projectId,partitionId,groupId,deviceIds } = this.state
        let stations = await this.stationService.getStationList(new StationQuery({projectId,partitionId,groupId,deviceId:deviceIds.join(",")}))
        this.setState({
            stations:stations
        })
    }
    reset = () =>{

    }
    render() {
        let { projectId, partitionId, groupId, stations, addVisible, editVisible, dibiaoInitVisible, cexieInitVisible, subVisible, addStation, editStation, deviceIds } = this.state;
        return (
            <div>
                <DInitModal visible={dibiaoInitVisible} station={editStation} closeModal={()=>{this.setState({dibiaoInitVisible:false})}} />
                <CInitModal visible={cexieInitVisible} station={editStation} closeModal={()=>{this.setState({cexieInitVisible:false})}} />
                <SubModal visible={subVisible} station={editStation} closeModal={()=>{this.setState({subVisible:false})}} />
                <Card bordered={false} className="card">
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={6}>
                                <Form.Item label={"项目名称:"}>
                                    <ProjectSelect onChange={this.onProjectNameChange} projectId={projectId}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"分区名称:"}>
                                    <PartitionSelect projectId={projectId} partitionId={partitionId} onChange={this.onPartitionNameChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"分组名称:"}>
                                    <GroupSelect projectId={projectId} partitionId={partitionId} groupId={groupId} onChange={this.onGroupNameChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={" "}>
                                    <Button type="primary" icon="search" onClick={this.search}>
                                        查询
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button icon="reload" onClick={this.reset}>
                                        重置
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={24}>
                                <Form.Item labelCol={{span:1.25}} wrapperCol={{span:22.7}} label={"监测点类型:"}>
                                    <StationTypeCheckbox deviceIds={deviceIds} onChange={this.onDeviceChange}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Divider />
                    <StationMap project={this.project} stations={stations} mapId={"station-map"} onChange={this.onMapChange}/>
                </Card>
                <AddForm visible={addVisible} station={addStation} closeModal={(refresh)=>{this.setState({addVisible:false}); if(refresh) this.search()}}/>
                <EditForm visible={editVisible} station={editStation} closeModal={(refresh)=>{this.setState({editVisible:false}); if(refresh) this.search()}}/>
            </div>
        )
    }
}
