import React, { Component } from 'react'
import { Select } from 'antd'
import GroupService from '../../../service/project/GroupService';
import GroupVo from '../../../model/project/GroupVo';
const {Option} = Select;


interface iProps{
    projectId:string,
    partitionId:string,
    groupId?:string,
    onChange?:Function
}

export default class GroupSelect extends Component<iProps,any> {

    state={
        groupList: new Array<GroupVo>()
    }
    componentDidMount(){
       this.getGroupList(this.props.projectId,this.props.partitionId);
    }

    componentWillReceiveProps(newprops){
        if(this.props.partitionId !== newprops.partitionId){
            this.onChange(null);
            this.getGroupList(newprops.projectId,newprops.partitionId);
        }
    }

    getGroupList=async(projectId:string,partitionId:string)=>{
        let groupList = await new GroupService().list(projectId,partitionId)
        await this.setState({
            groupList
        })
    }

    onChange=groupId=>{
        this.props.onChange(groupId);
    }

    render() {
        let {groupList} = this.state;
        return (
            <div>
                <Select value={this.props.groupId?this.props.groupId:null} onChange={this.onChange} allowClear>
                    {groupList && groupList.map((e,key)=>
                        <Option key={key} value={e.groupId}>{e.groupName}</Option>
                        )
                    }
                </Select>
            </div>
        )
    }
}
