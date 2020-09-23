import React, { Component } from 'react'
import ProjectSelect from '../components/project/project-select'
import { Card, Form, Row, Col } from 'antd'
import ProjectMonitorService from '../../service/monitor/ProjectMonitorService';
import RealtimeMonitoringModel from '../../model/monitor/RealtimeMonitoringModel';
import {getMonitorProjectOption,getMonitorProjectPieOption,getMonitorProjectWarningOption} from '../m-data/echarts-utils';
import './monitor.less';
import '../m-data/data.less';
import $ from "../../lib/jquery-vendor";
const echarts = require('echarts');
import MonitorProjectMap from '../components/amap/MonitorProjectMap'

interface iProps{
    userId:string,
    projectId:string
}
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

export default class MonitorProjectCount extends Component<iProps> {
    private projectMonitorService = new ProjectMonitorService();
    private myChart1 = null;
    private myChart2 = null;
    private main1Width = 0;
    private main2Width = 0;
    state={
        projectId:"",
        project:new RealtimeMonitoringModel({}),
    }

    componentDidMount(){
        window["ccc"] = this
    }

    onProjectChange=async(projectId:string)=>{
        this.getProjectMonitor(projectId);
        let width = $("#e-outer").outerWidth();
        this.main1Width = width * 0.39;
        this.main2Width = width * 0.59;
    }

    getProjectMonitor=async(projectId:string)=>{
        if(!projectId){
            return;
        }
        let project =await this.projectMonitorService.getProjectMonitor(projectId) as RealtimeMonitoringModel;
        console.log("getProjectMonitor project:",project);
        await this.setState({
            projectId,
            project
        })
        this.initEcharts(project);
    }

    initEcharts=(project:RealtimeMonitoringModel)=>{
        this.myChart1 = echarts.init(document.getElementById('main1'),'dark');
        this.myChart2 = echarts.init(document.getElementById('main2'),'dark');
        this.setOption(project)
    }
    
    setOption=(project:RealtimeMonitoringModel)=>{
        this.myChart1.setOption(getMonitorProjectPieOption(project));
        this.myChart2.setOption(getMonitorProjectOption(project));
    }

    render() {
        let {projectId,project} = this.state;
        return (
            <div>
                <Card>
                    <Form {...formItemLayout} colon={false}>
                        <Row gutter={0}>
                            <Col span={6} >
                                <Form.Item label={"请选择项目:"}>
                                    <ProjectSelect projectId={projectId} onChange={this.onProjectChange}></ProjectSelect>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <br/>
                <Card >
                    <div id={"e-outer"} style={{width:"100%"}}>
                        <div id={"main1"} className={"monitor-main1 echart-backgroud-color"} style={{width:this.main1Width}} /> 
                        <div id={"main2"} className={"monitor-main2 echart-backgroud-color"} style={{width:this.main2Width}} /> 
                    </div>
                </Card>
                <br/>
                <Card title={"项目位置"}>
                    <MonitorProjectMap mapId={"monitor-project-map"} projectId={projectId} position={{lng:Number.parseFloat(project.currentX),lat:Number.parseFloat(project.currentY)}}/>
                </Card>
            </div>
        )
    }
}
