/*
 * @Author: your name
 * @Date: 2020-06-25 18:06:32
 * @LastEditTime: 2020-09-04 10:56:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\pages\m-home\Home.tsx
 */ 
import React, { Component } from 'react'
import ProjectVo from '../../model/project/ProjectVo'
import BaseMap from '../components/amap/BaseMap';
import { Card } from 'antd';
import { getMarker } from '../../lib/utils'
import { MarkerTypeEnum } from '../../model/enum/enum';
import { RouteComponentProps } from 'react-router-dom';
import UserService from '../../service/user/UserService';

export default class Home extends Component<RouteComponentProps> {
    constructor(props){
        super(props);
    }
    private userService = new UserService();
    private projectList = new Array<ProjectVo>();
    private map:any = null;
    private BMap:any = null;

    initProjectList = async () =>{
        let userId = window.sessionStorage.getItem("userId");
        if(userId){
            this.projectList = await this.userService.getProjectsByUser(userId);
        }
    }
    async componentDidMount(){
        window["home"] = this;
        await this.initProjectList();
        let point = new this.BMap.Point(116.404, 39.915);
        this.map.centerAndZoom(point,5);
        this.initMap();
    }
    initMap = () =>{
        this.projectList.forEach(project=>{
            let point = new this.BMap.Point(project.coordinatex, project.coordinatey);
            let content = project.projectName;
            let marker = getMarker(MarkerTypeEnum.PROJECT,this.BMap,point,content);
            marker.setTitle(project.projectDescription);
            this.map.addOverlay(marker);
        })
    }
    render() {
        return (
            <div>
                <Card bordered={false} className="card">
                    <BaseMap mapId={"home-map"} width={null} zooms={[5,18]} height={"100vh"} onLoaded={(map,BMap)=>{this.map = map;this.BMap = BMap}} />
                </Card>
            </div>
        )
    }
}
