import React, { Component } from 'react'
import { Select } from 'antd'
import StationService from '../../../service/station/StationService';
import StationQuery from '../../../model/station/StationQuery';
import StationVo from '../../../model/station/StationVo';
import { isArrayEqual } from '../../../lib/utils';
const {Option} = Select;

interface iProps{
    partitionId?:string,
    projectId?:string,
    groupId?:string,
    stationIds:Array<string>,
    deviceId:string,
    onChange?:Function,
    disabled?:boolean,
    multiple:boolean
}

export default class StationSelect extends Component<iProps,any> {

    state={
        stationIds:[] as Array<string>,
        stationList:[] as Array<StationVo>,
    }
    async componentDidMount(){
        window["select"] = this;
        // console.log("componentDidMount",this.props)
        // if(this.props.deviceId){
        //     this.getStationList(this.props.projectId,this.props.partitionId,this.props.groupId,this.props.deviceId);
        // }
        // if(this.props.stationIds && this.props.stationIds.length){
        //     await this.setState({
        //         stationIds:this.props.stationIds
        //     })
        // }
    }

    async componentWillReceiveProps(newprops:iProps){
        if(newprops.deviceId){
            if(!isArrayEqual(newprops.stationIds,this.props.stationIds)){
                await this.setState({
                    stationIds:newprops.stationIds
                })
            }
            if(this.props.projectId !== newprops.projectId || this.props.partitionId !== newprops.partitionId || this.props.groupId !== newprops.groupId || this.props.deviceId !== newprops.deviceId){
                this.setState({stationIds:[]})
                this.getStationList(newprops.projectId,newprops.partitionId,newprops.groupId,newprops.deviceId);
                this.props.onChange([])
            }
        }
        if(!newprops.deviceId && this.props.deviceId){
            this.setState({stationIds:[]})
            this.props.onChange([])
        }
    }

    getStationList=async(projectId,partitionId,groupId,deviceId)=>{
        if((projectId != null || partitionId != null || groupId != null) && deviceId != null){
            let stationList = await new StationService().getStationList({projectId,partitionId,groupId,deviceId}) as Array<StationVo>;
            console.log("getStationList:",stationList)
            await this.setState({
                stationList
            })
        }
    }

    onChange=stationIds=>{
        this.props.onChange(stationIds);
    }

    render() {
        let {stationList,stationIds} = this.state
        return (
            <div>
                <Select value={this.props.multiple?stationIds:stationIds[0]} onChange={this.onChange} mode={this.props.multiple?'multiple':null} disabled={this.props.disabled?this.props.disabled:false} allowClear>
                    {stationList && stationList.map((e,key)=>
                        <Option key={key} value={e.stationId}>{e.stationName}</Option>
                        )
                    }
                </Select>
            </div>
        )
    }
}
