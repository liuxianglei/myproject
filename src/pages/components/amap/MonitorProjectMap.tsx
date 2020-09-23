import React, { Component } from 'react'
import BaseMap from './BaseMap'
import { getMarker } from '../../../lib/utils'
import { MarkerTypeEnum } from '../../../model/enum/enum';

interface iProps {
    mapId: string,
    projectId: string,
    position: any,
}
export default class MonitorProjectMap extends Component<iProps> {
    private map: any = null;
    private BMap: any = null;
    private marker: any = null;
    onLoaded = (map, BMap) => {
        this.map = map;
        this.BMap = BMap;
    }
    componentWillReceiveProps(nextProps: iProps) {
        console.log("componentWillReceiveProps")
        this.initPoint(nextProps);
    }
    componentDidMount() {
        window['aaa'] = this
        if (this.props.position) {
            this.initPoint(this.props);
        }
    }
    initPoint = (props: iProps) => {
        this.map.clearOverlays();  
        let { lng, lat } = props.position;
        let point = new this.BMap.Point(lng, lat);
        this.map.setCenter(point);
        this.map.clearOverlays();
        let content = `经度：${lng} </br> 纬度：${lat}`
        this.marker = getMarker(MarkerTypeEnum.PROJECT, this.BMap, point, content);
        this.marker.addEventListener("click",this.clickMarker);
        this.map.addOverlay(this.marker);
    }
    clickMarker = () =>{
        console.log("go to next page")
    }

    render() {
        return (
            <div>
                <BaseMap zooms={[5,18]} mapId={this.props.mapId} width={null} height={"100vh"} onLoaded={this.onLoaded} />
            </div>
        )
    }
}
