import React, { Component } from 'react'
import StationService from '../../../service/station/StationService';
import { Checkbox } from 'antd';
import { isArrayEqual } from '../../../lib/utils';
import { UsableDeviceIdEnum } from '../../../model/enum/enum';

interface iProps{
    deviceIds?:Array<string>
    onChange?:Function
}
export default class StationTypeCheckbox extends Component<iProps> {

    state={
        plainOptions:[]
    }
    async componentDidMount(){
         let stationTypeList:Array<any> = await new StationService().getStationTypeList();
         
         let options = stationTypeList.map(st=>{
            let disable = true;
            for(let en in UsableDeviceIdEnum){
                if(UsableDeviceIdEnum[en] === st.deviceId){
                    disable = false;
                }
            }
             let option = {
                label:st.deviceName,
                value:st.deviceId,
                disabled:disable
             }
             return option;
         });
         options.sort((a,b)=>{
            if(b.disabled){
                return -1
            }
         })
         this.setState({
            plainOptions:options
         })
    }

    onChange = (deviceIds) =>{
        this.props.onChange(deviceIds);
    }

    render() {
        return (
            <div>
                <Checkbox.Group value={this.props.deviceIds} options={this.state.plainOptions} onChange={this.onChange} />
            </div>
        )
    }
}
