import React, { Component } from 'react'
import { Form, Row, Col, Button, Divider, Input, DatePicker, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import OriginalSetModel from '../../../model/dataManage/OriginalSetModel'
import ProjectSelect from '../../components/project/project-select';
import PartitionSelect from '../../components/partition/partition-select';
import GroupSelect from '../../components/group/group-select';
import StationVo from '../../../model/station/StationVo';
import StationService from '../../../service/station/StationService';
import moment from 'moment';
const { RangePicker } = DatePicker;
const {Option} = Select;

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
interface iProps extends FormComponentProps {
    deviceId:string,
    onChange: Function
}
interface iState {
    projectId: string,
    partitionId: string,
    groupId: string,
    stationIds: Array<string>,
    dates: Array<any>,
    dateStrs: Array<string>,
    stationList:Array<StationVo>
}
class SearchForm extends Component<iProps, iState> {

    state: iState = {
        projectId: null,
        partitionId: null,
        groupId: null,
        stationIds: new Array<string>(),
        dates: new Array<any>(),
        dateStrs: new Array<string>(),
        stationList: new Array<StationVo>()
    }
    private originalSetModel: OriginalSetModel = new OriginalSetModel({});

    search = () => {
        this.originalSetModel.projectId = this.state.projectId;
        this.originalSetModel.partitionId = this.state.partitionId;
        this.originalSetModel.groupId = this.state.groupId;
        this.originalSetModel.stationId = this.state.stationIds.join(",");
        this.originalSetModel.startDate = this.state.dateStrs.length > 1 ? this.state.dateStrs[0] : null,
        this.originalSetModel.endDate = this.state.dateStrs.length > 1 ? this.state.dateStrs[1] : null,
        this.props.onChange(this.originalSetModel);
    }
    reset = () => {
        this.setState({
            partitionId: null,
            groupId: null,
            stationIds: [],
            dates: [],
            dateStrs:[]
        })
    }
    getStations = async () =>{
        let {projectId, partitionId, groupId} = this.state
        let stationList = await new StationService().getStationList({projectId,partitionId,groupId,deviceId:this.props.deviceId}) as Array<StationVo>;
        this.setState({stationList});
    }

    onProjectChange = (projectId) => {
        this.setState({ projectId,stationIds:[] }, () => { this.search() })
    }
    onPartitionChange = (partitionId) => {
        this.setState({ partitionId,stationIds:[] })
    }
    onGroupChange = (groupId) => {
        this.setState({ groupId,stationIds:[] })
    }
    onStationChange = (stationIds) => {
        this.setState({ stationIds })
    }
    onDateChange = (date, dateStr) => {
        console.log(date)
        console.log(dateStr)
        this.setState({ dates: date, dateStrs: dateStr })
    }
    render() {
        let { projectId, partitionId, groupId, stationIds, dates,stationList } = this.state;
        return (
            <div>
                <Form {...formItemLayout} colon={false}>
                    <Row gutter={0}>
                        <Col span={6}>
                            <Form.Item label={"项目:"}>
                                <ProjectSelect projectId={projectId} onChange={this.onProjectChange} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={"分区:"}>
                                <PartitionSelect projectId={projectId} partitionId={partitionId} onChange={this.onPartitionChange} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={"分组:"}>
                                <GroupSelect projectId={projectId} partitionId={partitionId} groupId={groupId} onChange={this.onGroupChange} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label={"监测点:"}>
                                <Select value={stationIds} onChange={this.onStationChange} onFocus={this.getStations} mode={'multiple'} allowClear>
                                    {stationList && stationList.map((e, key) =>
                                        <Option key={key} value={e.stationId}>{e.stationName}</Option>
                                    )
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item label={"时间范围:"}>
                                <RangePicker style={{width:"100%"}} value={dates} onChange={this.onDateChange} format={"YYYY-MM-DD HH:mm:ss"} 
                                    showTime={{
                                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                  }}
                                 />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item label={" "}>
                                <Button type="primary" icon="search" onClick={this.search}>
                                    查询
                                </Button>
                                    &nbsp;&nbsp;
                                <Button icon="reload" onClick={this.reset}>
                                    重置
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider />
            </div>
        )
    }
}
const mapPropsToFields = props => {
    return {
        onChange: Form.createFormField({
            ...props.onChange,
            value: props.onChange
        })
    };
};
export default Form.create({ mapPropsToFields })(SearchForm);