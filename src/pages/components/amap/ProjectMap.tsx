import React, { Component } from 'react'
import BaseMap from './BaseMap'
import { getMarker } from '../../../lib/utils'
import { MarkerTypeEnum } from '../../../model/enum/enum';

interface iProps {
    mapId: string,
    position?: any,
    onChange?: Function
}
export default class ProjectMap extends Component<iProps> {
    private map: any = null;
    private BMap: any = null;
    private marker: any = null;
    onLoaded = (map, BMap) => {
        this.map = map;
        this.BMap = BMap;
    }
    componentDidMount() {
        console.log("componentDidMount",this.props.position)
        window['aaa'] = this
        if(this.props.position){
            let { lng,lat } = this.props.position;
            let point = new this.BMap.Point(lng,lat);
            this.map.setCenter(point);
            this.map.clearOverlays(); 
            let content = `经度：${lng} </br> 纬度：${lat}`
            this.marker = getMarker(MarkerTypeEnum.PROJECT,this.BMap,point,content);
            this.map.addOverlay(this.marker);   
        }
        this.map.addEventListener("click", this.clickHandler);
    }
    componentWillReceiveProps(nextProps){
        if(!this.props.position && nextProps.position){
            let { lng,lat } = nextProps.position;
            let point = new this.BMap.Point(lng,lat);
            this.map.setCenter(point);
            this.map.clearOverlays(); 
            let content = `经度：${lng} </br> 纬度：${lat}`
            this.marker = getMarker(MarkerTypeEnum.PROJECT,this.BMap,point,content);
            this.map.addOverlay(this.marker); 
        }
    }

    clickHandler = e =>{
        this.map.clearOverlays();  
        let { lng,lat } = e.point;
        let content = `经度：${lng} </br> 纬度：${lat}`
        this.marker = getMarker(MarkerTypeEnum.PROJECT,this.BMap,new this.BMap.Point(lng,lat),content);
        this.map.addOverlay(this.marker);   
        this.props.onChange({lng,lat})
    }

    render() {
        return (
            <div>
                <BaseMap mapId={this.props.mapId} width={860} height={500} onLoaded={this.onLoaded} />
            </div>
        )
    }
}
