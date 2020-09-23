import React, { Component } from 'react'

declare let BMap:any;
declare let BMAP_SATELLITE_MAP:any;
interface iProps{
    mapId:string,
    zooms?:Array<number>,
    width:number,
    height:any,
    onLoaded:Function
}
export default class BaseMap extends Component<iProps> {
    constructor(props) {
        super(props);
    }

    private map:any = null;

    componentDidMount(){
        let minZoom = 3;
        let maxZoom = 18;
        if(this.props.zooms){
            minZoom = this.props.zooms[0];
            maxZoom = this.props.zooms[1];
        }
        this.map = new BMap.Map(this.props.mapId,{
            minZoom,
            maxZoom
        });
        let point = new BMap.Point(116.404, 39.915);
        let top_left_navigation = new BMap.NavigationControl();  
        this.map.centerAndZoom(point, 4);
        this.map.enableScrollWheelZoom(true); 
        this.map.setMapType(BMAP_SATELLITE_MAP); 
        this.map.addControl(top_left_navigation)
        this.props.onLoaded(this.map,BMap);
    }
    componentWillUnmount(){
        
    }
 
    render() {
        return (
            <div id={this.props.mapId} style ={{width:this.props.width,height:this.props.height}}>               
            </div>
        );
    }
 
}
