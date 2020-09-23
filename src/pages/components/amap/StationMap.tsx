import React, { Component } from 'react'
import BaseMap from './BaseMap'
import $ from "../../../lib/jquery-vendor";
import ProjectVo from '../../../model/project/ProjectVo';
import StationVo from '../../../model/station/StationVo';
import { getMarker,getInfoWindow, isArrayEqual, getImgBydeviceId, getMarkerByImg } from '../../../lib/utils'
import { MarkerTypeEnum, DeviceIdEnum } from '../../../model/enum/enum';
import editImg from '../../../assets/images/edit.png'
import delImg from '../../../assets/images/del.png'
import moveImg from '../../../assets/images/move.png'
import initImg from '../../../assets/images/init.png'
import subImg from '../../../assets/images/sub.png'
import './stationmap.less'
import { baseWebUrl } from '../../../config/config';

interface iProps{
    mapId:string,
    project:ProjectVo,
    stations:Array<StationVo>,
    onChange?:Function
}

interface iState{
    addVisible:boolean
}

export default class StationMap extends Component<iProps,iState> {
    constructor(props){
        super(props);
        this.width = $(".ant-divider").outerWidth();
    }
    state:iState={
        addVisible:false
    }
    private width:number = null;
    private map:any = null;
    private BMap:any = null;
    private activeStation:StationVo = null;
    private activeMarker = null;

    onLoaded = (map,BMap) =>{
        this.map = map;
        this.BMap = BMap;
    }

    componentWillReceiveProps(props:iProps){
        if(!isArrayEqual([props.project],[this.props.project])){
            this.setTileLayer(props);
        }
        if(!isArrayEqual(props.stations,this.props.stations)){
            this.setMarkers(props);
        }
    }
    
    componentDidMount(){
        window["bbb"] = this
        this.map.addEventListener("click", this.clickHandler);
    }

    onStationClick = async (e) =>{
        if(e.domEvent.stopPropagation) { 
            // 针对 Mozilla 和 Opera 
            e.domEvent.stopPropagation(); 
        }else if (window.event) { 
            // 针对 IE 
            window.event.cancelBubble = true; 
        }  
        // e.domEvent.stopPropagation();
        this.activeMarker = e.target;
        let title = this.getNameById(e.target.getTitle());
        this.activeStation = this.props.stations.find(station=>station.stationId === e.target.getTitle());
        let tempDom = null;
        let infoWindowHeight = 180;
        switch(this.activeStation.deviceId){
            case DeviceIdEnum.BIAOMIAN:{
                tempDom = $(".biaomianInfo").clone(true,true);
                infoWindowHeight = 180;
                break;
            }
            case DeviceIdEnum.CEXIE:{
                tempDom = $(".cexieInfo").clone(true,true);
                infoWindowHeight = 200;
                break;
            }
            default:{
                tempDom = $(".normal").clone(true,true);
                infoWindowHeight = 160;
                break;
            }
        }
        this.addEventToDom(tempDom);
        tempDom.css("display","block");
        let point = new this.BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat);
        let infoWindow = getInfoWindow(this.BMap,title,60,infoWindowHeight,tempDom[0]);
        this.map.openInfoWindow(infoWindow,point);
    }

    getNameById = (stationId:string) =>{
        let name = "";
        this.props.stations.forEach(s=>{
            if(s.stationId === stationId){
                name = s.stationName;
            }
        })
        return name;
    }

    addEventToDom = (dom:JQuery<HTMLElement>) =>{
        let self = this;
        dom.children().each(function(){
            if(this.className.startsWith("edit")){
                $(this).on("click",self.toEdit);
            }
            if(this.className.startsWith("move")){
                $(this).on("click",self.toMove);
            }
            if(this.className.startsWith("init")){
                $(this).on("click",self.toInit);
            }
            if(this.className.startsWith("del")){
                $(this).on("click",self.toDel);
            }
            if(this.className.startsWith("sub")){
                $(this).on("click",self.toSub);
            }
        })
    }

    setMarkers = (props:iProps) =>{
        this.map.clearOverlays();
        props.stations.forEach(station=>{
            let point = new this.BMap.Point(station.x,station.y);
            let marker = getMarkerByImg(getImgBydeviceId(station.deviceId),this.BMap,point,station.stationName);
            marker.addEventListener("dragend",this.dragEnd);
            marker.setTitle(station.stationId);
            marker.addEventListener("click",this.onStationClick);
            this.map.addOverlay(marker);
        })
    }

    setTileLayer = (props:iProps) =>{
        console.log("setTileLayer")
        if(!props.project){
            return;
        }
        let point = new this.BMap.Point(props.project.coordinatex,props.project.coordinatey);
        this.map.centerAndZoom(point,16);
        let url = props.project.mapURL;

        let tileLayer = new this.BMap.TileLayer();
        tileLayer.getTilesUrl = (tileCoord, zoom) => {
            var x = tileCoord.x;
            var y = tileCoord.y;
            return `${baseWebUrl}${url}/${zoom}/tile${x}_${y}.png`;
        }
        this.map.addTileLayer(tileLayer);
    }

    onAddOk = () =>{

    }
    dragEnd = (e) =>{
        e.target.disableDragging();
        this.activeStation = this.props.stations.find(station=>station.stationId === e.target.getTitle());
        this.activeStation.x = e.point.lng;
        this.activeStation.y = e.point.lat;
        this.props.onChange("move",this.activeStation);
    }
    toEdit = () =>{
        this.props.onChange("edit",this.activeStation);
    }
    toMove = () =>{
        this.map.closeInfoWindow();
        this.activeMarker.enableDragging();
    }
    toInit = () =>{
        this.props.onChange("init",this.activeStation);
    }
    toDel = () =>{
        this.props.onChange("del",this.activeStation);
    }
    toSub = () =>{
        this.props.onChange("sub",this.activeStation);
    }

    clickHandler = (e) =>{
        let addStation = new StationVo({x:e.point.lng,y:e.point.lat});
        this.props.onChange("add",addStation);
    }

    render() {
        return (
            <div>
                <BaseMap mapId={this.props.mapId} zooms={[16,18]} width={this.width} height={700} onLoaded={this.onLoaded}/>
                <div key={1} className={"biaomianInfo"}>
                    <div style={{marginTop:10}} className="edit right_li">
                        <img style={{width:20,height:20}} src={editImg}/>&nbsp;&nbsp;<span>编辑</span>
                    </div>
                    <div style={{marginTop:10}} className="move right_li">
                        <img style={{width:20,height:20}} src={moveImg}/>&nbsp;&nbsp;<span>移动</span>
                    </div>
                    <div style={{marginTop:10}} className="del right_li">
                        <img style={{width:20,height:20}} src={delImg}/>&nbsp;&nbsp;<span>删除</span>
                    </div>
                    <div style={{marginTop:10}} className="init right_li">
                        <img style={{width:20,height:20}} src={initImg}/>&nbsp;&nbsp;<span>初始值</span>
                    </div>
                </div>
                <div key={2} className={"cexieInfo"}>
                    <div style={{marginTop:10}} className="edit right_li">
                        <img style={{width:20,height:20}} src={editImg}/>&nbsp;&nbsp;<span>编辑</span>
                    </div>
                    <div style={{marginTop:10}} className="move right_li">
                        <img style={{width:20,height:20}} src={moveImg}/>&nbsp;&nbsp;<span>移动</span>
                    </div>
                    <div style={{marginTop:10}} className="del right_li">
                        <img style={{width:20,height:20}} src={delImg}/>&nbsp;&nbsp;<span>删除</span>
                    </div>
                    <div style={{marginTop:10}} className="sub right_li">
                        <img style={{width:20,height:20}} src={subImg}/>&nbsp;&nbsp;<span>子节点</span>
                    </div>
                    <div style={{marginTop:10}} className="init right_li">
                        <img style={{width:20,height:20}} src={initImg}/>&nbsp;&nbsp;<span>初始值</span>
                    </div>
                </div>
                <div key={3} className={"normal"}>
                    <div style={{marginTop:10}} className="edit right_li">
                        <img style={{width:20,height:20}} src={editImg}/>&nbsp;&nbsp;<span>编辑</span>
                    </div>
                    <div style={{marginTop:10}} className="move right_li">
                        <img style={{width:20,height:20}} src={moveImg}/>&nbsp;&nbsp;<span>移动</span>
                    </div>
                    <div style={{marginTop:10}} className="del right_li">
                        <img style={{width:20,height:20}} src={delImg}/>&nbsp;&nbsp;<span>删除</span>
                    </div>
                </div>
            </div>
        )
    }
}
