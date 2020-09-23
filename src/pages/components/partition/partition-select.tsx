import React, { Component } from 'react'
import { Select } from 'antd'
import PartitionService from '../../../service/project/PartitionService';
import PartitionVo from '../../../model/project/PartitionVo';
const {Option} = Select;


interface iProps{
    projectId:string,
    partitionId?:string,
    onChange?:Function
}

export default class PartitionSelect extends Component<iProps,any> {

    state={
        partitionId:null,
        partitionList: new Array<PartitionVo>()
    }

    async componentDidMount(){
        await this.getPartitionList(this.props.projectId);
        await this.setState({partitionId:this.props.partitionId})
        this.onChange(this.props.partitionId)
    }

    componentWillReceiveProps(newprops){
        if(this.props.partitionId !== newprops.partitionId){
            this.setState({partitionId:newprops.partitionId})
        }
        if(this.props.projectId !== newprops.projectId){
            this.onChange(null);
            this.getPartitionList(newprops.projectId);
        }
    }

    getPartitionList=async(projectId:string)=>{
        if(projectId){
            let list = await new PartitionService().list(projectId) as Array<PartitionVo>;
            await this.setState({
                 partitionList:list
            })
        }
    }

    onChange = partitionId =>{
        this.props.onChange(partitionId);
        this.setState({partitionId})
    }

    render() {
        let {partitionList, partitionId} = this.state;
        return (
            <div>
                <Select onChange={this.onChange} value={partitionId} allowClear>
                    {partitionList.map((e,key)=>
                            <Option key={key} value={e.partitionId}>{e.partitionName}</Option>
                        )
                    }
                </Select>
            </div>
        )
    }
}
