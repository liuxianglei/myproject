import React, { Component } from 'react'
import { Select } from 'antd'
import StationService from '../../../service/station/StationService';
import { UsableDeviceIdEnum } from '../../../model/enum/enum';
const {Option} = Select;


interface iProps{
    deviceId?:any,
    onChange?:Function
}

export default class StationTypeSelect extends Component<iProps,any> {

    state={
        stationTypeList:[]
    }
    async componentDidMount(){
         let stationTypeList = await new StationService().getStationTypeList();
         this.setState({
             stationTypeList:stationTypeList
         })
    }
    renderOption = () =>{
        let list1 = this.state.stationTypeList.map(t=>{
            let disable = true;
            for(let en in UsableDeviceIdEnum){
                if(UsableDeviceIdEnum[en] === t.deviceId){
                    disable = false;
                }
            }
            t.disabled = disable
            return t;
        }).sort((a,b)=>{
            return b.disabled?-1:1
        });
        return list1.map(e=>{
            return <Option key={e.deviceId} disabled={e.disabled} value={e.deviceId}>{e.deviceName}</Option>
        })
    }

    onChange = value =>{
        this.props.onChange(value);
    }

    render() {
        return (
            <div>
                <Select defaultValue={this.props.deviceId} onChange={this.onChange} allowClear>
                    {this.renderOption()}
                </Select>
            </div>
        )
    }
}
