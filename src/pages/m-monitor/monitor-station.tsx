import React, { Component } from 'react'
import { Card, Form, Row, Col, Button, Divider } from 'antd'
import ProjectSelect from '../components/project/project-select'
import PartitionSelect from '../components/partition/partition-select';
import GroupSelect from '../components/group/group-select';
import MonitorMap from '../components/amap/MonitorMap'
import ProjectVo from '../../model/project/ProjectVo';
import ProjectService from '../../service/project/ProjectService';
import MonitorPointVo from '../../model/monitor/MonitorPoingVo';
import normal from '../../assets/images/normal.png'
import blue from '../../assets/images/blue.png'
import yellow from '../../assets/images/yellow.png'
import red from '../../assets/images/red.png'
import orange from '../../assets/images/orange.png'
import offline from '../../assets/images/offline.png'
import { getImgBydeviceId, getNameBydeviceId } from '../../lib/utils';
import ProjectMonitorService from '../../service/monitor/ProjectMonitorService';
import MonitoringPointModel from '../../model/monitor/MonitoringPointModel';
import { RouteComponentProps } from 'react-router-dom';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

interface iState{
    projectId:string,
    partitionId:string,
    groupId:string,
    stations:Array<MonitorPointVo>,
    deviceIds:Array<string>,
}

export default class MonitorStation extends Component<RouteComponentProps,iState> {
    state:iState={
        projectId:null,
        partitionId:null,
        groupId:null,
        stations:[],
        deviceIds:[]
    }

    private project:ProjectVo = null;
    private projectService:ProjectService = new ProjectService();
    private projectMonitorService:ProjectMonitorService = new ProjectMonitorService();

    // componentDidMount(){
    //     this.props.history.push({pathname:"/index/home",state:{day:"1234565"}});
    //     window["aaa"] = this;
    // }
    onProjectNameChange = async ( projectId ) =>{
        this.project = await this.projectService.getProjectInfo(projectId);
        this.setState({ projectId },()=>{
            this,this.search()
        });
    }

    onPartitionNameChange = ( partitionId ) =>{
        this.setState({ partitionId });
    }

    onGroupNameChange = ( groupId ) =>{
        this.setState({ groupId });
    }
    search = async() =>{
        console.log("search")
        let {projectId,partitionId,groupId} = this.state;
        let res = await this.projectMonitorService.getMonitoringPoint(projectId,partitionId,groupId) as Array<MonitoringPointModel>;
        let stations = res.map(e=>new MonitorPointVo({...e}));
        let deviceIds = [] as Array<string>;
        stations.forEach(e=>{
            if(!deviceIds.find(f=>f === e.deviceId)){
                deviceIds.push(e.deviceId);
            }
        });
        await this.setState({
            stations,
            deviceIds
        })
    }
    reset = () =>{

    }

    redirect = (redirect) =>{
        this.props.history.push(redirect);
    }
    render() {
        let { projectId, partitionId,groupId, deviceIds,stations } = this.state;
        return (
            <div>
                <Card bordered={false} className="card">
                    <Form {...formItemLayout} labelAlign={"left"} colon={false}>
                        <Row gutter={0}>
                            <Col span={5}>
                                <Form.Item label={"项目名称："}>
                                    <ProjectSelect onChange={this.onProjectNameChange} projectId={projectId}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item label={"分区名称："}>
                                    <PartitionSelect projectId={projectId} partitionId={partitionId} onChange={this.onPartitionNameChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={1}>
                                <Form.Item label={"分组名称："}>
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
                                <Form.Item labelCol={{span:2}} wrapperCol={{span:22}} label={"监测点类型："}>
        {deviceIds.map((id,index)=>{
                let margin = 20;
                if(index === 0){
                    margin = 0;
                }
                return <div key={index} style={{display:"inline",marginLeft:margin}}><img key={`img${index}`} width={30} height={30} src={getImgBydeviceId(id)}/>&nbsp;<span>{getNameBydeviceId(id)}</span></div>
            })}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col span={24}>
                                <Form.Item labelCol={{span:2}} wrapperCol={{span:22}} label={"预警状态："}>
                                        <div style={{display:"inline"}}>
                                                <img width={30} height={30} src={normal} />&nbsp;
                                                <span>正常</span>
                                        </div>
                                        <div style={{display:"inline",marginLeft:20}}>
                                                <img width={30} height={30} src={blue} />&nbsp;
                                                <span>蓝色预警</span>
                                        </div>
                                        <div style={{display:"inline",marginLeft:20}}>
                                                <img width={30} height={30} src={orange} />&nbsp;
                                                <span>橙色预警</span>
                                        </div>
                                        <div style={{display:"inline",marginLeft:20}}>
                                                <img width={30} height={30} src={yellow} />&nbsp;
                                                <span>黄色预警</span>
                                        </div>
                                        <div style={{display:"inline",marginLeft:20}}>
                                                <img width={30} height={30} src={red} />&nbsp;
                                                <span>红色预警</span>
                                        </div>
                                        <div style={{display:"inline",marginLeft:20}}>
                                                <img width={30} height={30} src={offline} />&nbsp;
                                                <span>掉线</span>
                                        </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Divider style={{marginTop:0}} />
                    <MonitorMap project={this.project} stations={stations} mapId={"monitor-map"} clickStation={this.redirect}/>
                </Card>
            </div>
        )
    }
}
