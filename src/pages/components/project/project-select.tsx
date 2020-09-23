import React, { Component } from 'react'
import { Select } from 'antd'
import ProjectService from '../../../service/project/ProjectService';
import ProjectVo from '../../../model/project/ProjectVo';
const {Option} = Select;


interface iProps{
    width?:number,
    disabled?:boolean,
    deviceId?:string,
    projectId?:string,
    onChange?:Function
}

interface iState{
    projectId:string,
    projectList:Array<ProjectVo>,
}

export default class ProjectSelect extends Component<iProps,iState> {
    state:iState={
        projectId:null,
        projectList:[]
    }

    onChange = (value) =>{
        this.setState({projectId:value})
        window.sessionStorage.setItem("selectedProjectId",value);
        this.props.onChange(value)
    }

    componentWillReceiveProps(nextProps:iProps){
        if(this.props.projectId !== nextProps.projectId){
            this.setState({projectId:nextProps.projectId})
        }
    }
    async componentDidMount(){
        let projectList = await new ProjectService().getProjectList(this.props.deviceId);
        let sessionProjectId = window.sessionStorage.getItem("selectedProjectId");
        let projectId = this.props.projectId?this.props.projectId:sessionProjectId?sessionProjectId:projectList.length>0?projectList[0].projectId:null;
        this.onChange(projectId);
        await this.setState({
            projectId,
            projectList
        })
    }

    render() {
        let {projectList,projectId} = this.state;
        return (
            <div>
                <Select style={{width:this.props.width?this.props.width:"100%"}} disabled={this.props.disabled?this.props.disabled:false} value={projectId} onChange={this.onChange} allowClear>
                    { projectList.map((e,key)=>
                        <Option key={key} value={e.projectId}>{e.projectName}</Option>
                        )
                    }
                </Select>
            </div>
        )
    }
}
