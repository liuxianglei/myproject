import React, { Component } from 'react'
import ProjectVo from '../../../model/project/ProjectVo'
import MonitorPointVo from '../../../model/monitor/MonitorPoingVo'
import { MarkerTypeEnum, DeviceIdEnum, DataPathEnum } from '../../../model/enum/enum';
import { getMarkerByImg, getImgByWarningLevelAndDeviceId, isArrayEqual } from '../../../lib/utils';
import BaseMap from './BaseMap';
import {baseWebUrl} from '../../../config/config'

interface iProps{
    mapId:string,
    project:ProjectVo,
    stations:Array<MonitorPointVo>,
    clickStation:Function
}

export default class MonitorMap extends Component<iProps> {

    private map:any = null;
    private BMap:any = null;

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
    }
    
    setMarkers = (props:iProps) =>{
        this.map.clearOverlays();
        props.stations.forEach(station=>{
            let point = new this.BMap.Point(Number.parseFloat(station.currentX),Number.parseFloat(station.currentY));
            let marker = getMarkerByImg(getImgByWarningLevelAndDeviceId(station.waringState,station.deviceId),this.BMap,point,station.monitorPointName);
            marker.addEventListener("click",()=>{this.clickMarker(station)});
            this.map.addOverlay(marker);
        })
    }

    clickMarker = (station: MonitorPointVo) =>{
        console.log(station)
        this.props.clickStation({pathname:DataPathEnum[station.deviceId],state:{stationIdList:[station.monitorPointId],stationId:station.monitorPointId}});
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
    render() {
        return (
            <div>
                <BaseMap mapId={this.props.mapId} zooms={[16,18]} width={null} height={"100vh"} onLoaded={this.onLoaded}/>
            </div>
        )
    }
}
