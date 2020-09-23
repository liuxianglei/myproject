import React, { Component } from 'react'
import Form, { FormComponentProps } from 'antd/lib/form'
import { Card, Row, Col, Select, DatePicker, Button, Divider, Input, InputNumber, Switch, Radio, notification } from 'antd'
import  "./warning.less";
import ProjectSelect from '../components/project/project-select';
import PartitionSelect from '../components/partition/partition-select';
import GroupSelect from '../components/group/group-select';
import StationTypeSelect from '../components/station/station-type-select';
import FlexiTiltParmsSetModel from '../../model/warning/FlexiTiltParmsSetModel';
import IntellectualCorePileParmsModel from '../../model/warning/IntellectualCorePileParmsModel';
import RainGaugeParmsSetModel from '../../model/warning/RainGaugeParmsSetModel';
import SurefaceParmsSetModel from '../../model/warning/SurefaceParmsSetModel';
import WarningLevelModel from '../../model/warning/WarningLevelModel';
import WarningPressureModel from '../../model/warning/WarningPressureModel';
import FissureMeterModel from '../../model/warning/FissureMeterModel';
import WarningSettingSearchModel from '../../model/warning/WarningSettingSearchModel';
import WarningService from '../../service/warning/WarningService';
import { DeviceIdEnum } from '../../model/enum/enum';
const {Option} = Select;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
interface iProps extends FormComponentProps{

}

class WarningSetting extends Component<iProps,any> {

    state={
        deviceId:'',
        warningSettingSearchModel:new WarningSettingSearchModel({}),
        flexiTiltParmsSetModel:new FlexiTiltParmsSetModel({horizontalDisplacementEnabled:false,vEnabled:false}),
        intellectualCorePileParmsModel:new IntellectualCorePileParmsModel({enable:false}),
        rainGaugeParmsSetModel:new RainGaugeParmsSetModel({enable:false}),
        waterLevelParmsModel:new WarningLevelModel({enable:false}),
        surefaceParmsSetModel:new SurefaceParmsSetModel({enableVelocity:false,enableDisplacement:false}),
        waterPreParmsModel:new WarningPressureModel({enable:false}),
        fissureMeterModel:new FissureMeterModel({enable:false}),
        mobileNumbers:null
    }

    private warningService = new WarningService();

    getWarningSettingParams=async()=>{
        let {deviceId,warningSettingSearchModel} = this.state;
        switch(deviceId){
            case DeviceIdEnum.BIAOMIAN:
                warningSettingSearchModel.deviceId = null
                let surefaceParmsSetModel =await this.warningService.getsufaceParames(warningSettingSearchModel) as SurefaceParmsSetModel;
                await this.setState({
                    surefaceParmsSetModel:surefaceParmsSetModel?surefaceParmsSetModel:new SurefaceParmsSetModel({enableVelocity:false,enableDisplacement:false}),
                    mobileNumbers:surefaceParmsSetModel?surefaceParmsSetModel.mobileNumbers:null
                })
                break;
            case DeviceIdEnum.CEXIE:
                let flexiTiltParmsSetModel =await this.warningService.getFlexiTiltParamsSearch(warningSettingSearchModel) as FlexiTiltParmsSetModel;
                await this.setState({
                    flexiTiltParmsSetModel:flexiTiltParmsSetModel?flexiTiltParmsSetModel:new FlexiTiltParmsSetModel({horizontalDisplacementEnabled:false,vEnabled:false}),
                    mobileNumbers:flexiTiltParmsSetModel?flexiTiltParmsSetModel.mobileNumbers:null
                })
                break;
            case DeviceIdEnum.JIANGYU:
                let rainGaugeParmsSetModel =await this.warningService.getRainParams(warningSettingSearchModel) as RainGaugeParmsSetModel;
                await this.setState({
                    rainGaugeParmsSetModel:rainGaugeParmsSetModel?rainGaugeParmsSetModel:new RainGaugeParmsSetModel({enable:false}),
                    mobileNumbers:rainGaugeParmsSetModel?rainGaugeParmsSetModel.mobileNumbers:null
                })
                break;
            case DeviceIdEnum.LIEFENG:
                let fissureMeterModel =await this.warningService.getFissureMeter(warningSettingSearchModel) as FissureMeterModel;
                await this.setState({
                    fissureMeterModel:fissureMeterModel?fissureMeterModel:new FissureMeterModel({enable:false}),
                    mobileNumbers:fissureMeterModel?fissureMeterModel.phones:null
                })
                break;
            case DeviceIdEnum.SHUIWEI:
                let waterLevelParmsModel =await this.warningService.getWaterLevelParams(warningSettingSearchModel) as WarningLevelModel;
                await this.setState({
                    waterLevelParmsModel:waterLevelParmsModel?waterLevelParmsModel:new WarningLevelModel({enable:false}),
                    mobileNumbers:waterLevelParmsModel?waterLevelParmsModel.mobileNumbers:null
                })
                break;
            case DeviceIdEnum.SHUIYA:
                let waterPreParmsModel =await this.warningService.getWaterPressureParams(warningSettingSearchModel) as WarningPressureModel;
                await this.setState({
                    waterPreParmsModel:waterPreParmsModel?waterPreParmsModel:new WarningPressureModel({enable:false}),
                    mobileNumbers:waterPreParmsModel?waterPreParmsModel.mobileNumbers:null
                })
                break;
            case DeviceIdEnum.ZHIXINZHUANG:
                let intellectualCorePileParmsModel =await this.warningService.getIntellectualCorePile(warningSettingSearchModel) as IntellectualCorePileParmsModel;
                await this.setState({
                    intellectualCorePileParmsModel:intellectualCorePileParmsModel?intellectualCorePileParmsModel:new IntellectualCorePileParmsModel({enable:false}),
                    mobileNumbers:intellectualCorePileParmsModel?intellectualCorePileParmsModel.phones:null
                })
                break;
            default:
                break;
        }
    }

    renderParamsForm=async(deviceId:string)=>{
        await this.setState({
            deviceId,
            warningSettingSearchModel:{...this.state.warningSettingSearchModel,deviceId}
        })
        this.getWarningSettingParams();
    }

    save=()=>{
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return null;
            } else {
                let {deviceId,warningSettingSearchModel,
                    flexiTiltParmsSetModel,
                    intellectualCorePileParmsModel,
                    rainGaugeParmsSetModel,
                    surefaceParmsSetModel,
                    waterLevelParmsModel,
                    waterPreParmsModel,
                    fissureMeterModel,
                } = this.state;
                let params = {...values,
                    projectId:warningSettingSearchModel.projectId,
                    partitionId:warningSettingSearchModel.partitionId,
                    groupId:warningSettingSearchModel.groupId,
                };
                console.log("warning-setting params:",params)
                if(!deviceId || !warningSettingSearchModel.groupId){
                    notification.destroy();
                    let args = {
                      message: "提示",
                      description: "请选择分组和设备类型",
                      duration: 3,
                      
                    };
                    notification.error(args);
                }
                let res;
                switch(deviceId){
                    case DeviceIdEnum.BIAOMIAN:
                        res =await this.warningService.setsurfaceParams({...params,enableVelocity:surefaceParmsSetModel.enableVelocity,enableDisplacement:surefaceParmsSetModel.enableDisplacement});
                        break;
                    case DeviceIdEnum.CEXIE:
                        res =await this.warningService.setFlexiTiltParams({...params,horizontalDisplacementEnabled:flexiTiltParmsSetModel.horizontalDisplacementEnabled,vEnabled:flexiTiltParmsSetModel.vEnabled});
                        break;
                    case DeviceIdEnum.JIANGYU:
                        res =await this.warningService.setRainParams({...params,enable:rainGaugeParmsSetModel.enable});
                        break;
                    case DeviceIdEnum.LIEFENG:
                        res =await this.warningService.setFissureMeter({...params,enable:fissureMeterModel.enable});
                        break;
                    case DeviceIdEnum.SHUIWEI:
                        res =await this.warningService.setWaterLevelParams({...params,enable:waterLevelParmsModel.enable});
                        break;
                    case DeviceIdEnum.SHUIYA:
                        res =await this.warningService.setWaterPressureParams({...params,enable:waterPreParmsModel.enable});
                        break;
                    case DeviceIdEnum.ZHIXINZHUANG:
                        res =await this.warningService.setIntellectualCorePile({...params,enable:intellectualCorePileParmsModel.enable});
                        break;
                    default:
                        break;
                }
                //TODO 结果提示处理

            }
          });
    }

    onProjectChange=async(projectId)=>{
        await this.setState({
            warningSettingSearchModel:{...this.state.warningSettingSearchModel,projectId}
        })
    }

    onPartitionChange=async(partitionId)=>{
        await this.setState({
            warningSettingSearchModel:{...this.state.warningSettingSearchModel,partitionId}
        })
    }

    onGroupChange=async(groupId)=>{
        await this.setState({
            warningSettingSearchModel:{...this.state.warningSettingSearchModel,groupId}
        })
    }

    onDibiaoEnableVelocityChange=async(checked: boolean)=>{
        await this.setState({
            surefaceParmsSetModel:{...this.state.surefaceParmsSetModel,enableVelocity:checked}
        })
    }
    onDibiaoEnableDisplacementChange=async(checked: boolean)=>{
        await this.setState({
            surefaceParmsSetModel:{...this.state.surefaceParmsSetModel,enableDisplacement:checked}
        })
    }
    onRouxingHorizontalDisplacementEnabledChange=async(checked: boolean)=>{
        await this.setState({
            flexiTiltParmsSetModel:{...this.state.flexiTiltParmsSetModel,horizontalDisplacementEnabled:checked}
        })
    }
    onRouxingVEnabledChange=async(checked: boolean)=>{
        await this.setState({
            flexiTiltParmsSetModel:{...this.state.flexiTiltParmsSetModel,vEnabled:checked}
        })
    }
    onRainsEnabledChange=async(checked: boolean)=>{
        await this.setState({
            rainGaugeParmsSetModel:{...this.state.rainGaugeParmsSetModel,enable:checked}
        })
    }
    onWaterLevelEnabledChange=async(checked: boolean)=>{
        await this.setState({
            waterLevelParmsModel:{...this.state.waterLevelParmsModel,enable:checked}
        })
    }
    onWaterPressureEnabledChange=async(checked: boolean)=>{
        await this.setState({
            waterPreParmsModel:{...this.state.waterPreParmsModel,enable:checked}
        })
    }
    onIntellectualCorePileEnabledChange=async(checked: boolean)=>{
        await this.setState({
            intellectualCorePileParmsModel:{...this.state.intellectualCorePileParmsModel,enable:checked}
        })
    }
    onFissureMeterEnabledChange=async(checked: boolean)=>{
        await this.setState({
            fissureMeterModel:{...this.state.fissureMeterModel,enable:checked}
        })
    }

    validateMutiplePhoneNum = (rule, value:string, callback) => {
        console.log("validateMutiplePhoneNum",value)
        let pattern= /^1[3|4|5|7|8][0-9]\d{8}$/;
        let result = true;
        if (value) {
            let mobileNumbers = value.split(",");
            mobileNumbers.forEach(e=>{
                console.log(e)
                if(!pattern.test(e)){
                    result = false;
                }
            })
            if(!result){
                callback("请输入正确的手机号并且用英文逗号分隔");
            }
        }
        callback();
    };
    render() {
        let {
            deviceId,
            warningSettingSearchModel,
            flexiTiltParmsSetModel,
            intellectualCorePileParmsModel,
            rainGaugeParmsSetModel,
            surefaceParmsSetModel,
            waterLevelParmsModel,
            waterPreParmsModel,
            fissureMeterModel,
            mobileNumbers
        } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form {...formItemLayout} colon={false}>
                    <Card>
                        <Row gutter={0}>
                            <Col span={6}>
                                <Form.Item label={"项目:"}>
                                    <ProjectSelect projectId={warningSettingSearchModel.projectId} onChange={this.onProjectChange}></ProjectSelect>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"分区:"}>
                                    <PartitionSelect projectId={warningSettingSearchModel.projectId} partitionId={warningSettingSearchModel.partitionId} onChange={this.onPartitionChange}></PartitionSelect>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"分组:"}>
                                    <GroupSelect projectId={warningSettingSearchModel.projectId} partitionId={warningSettingSearchModel.partitionId} groupId={warningSettingSearchModel.groupId} onChange={this.onGroupChange}></GroupSelect>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={"监测点类型:"}>
                                <StationTypeSelect onChange={this.renderParamsForm}></StationTypeSelect>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <br/>
                        { deviceId === DeviceIdEnum.BIAOMIAN && <div>
                            <Card title={"位移速度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用"  onChange={this.onDibiaoEnableVelocityChange} checked={surefaceParmsSetModel.enableVelocity} />} className={"warning-setting-card"}>
                                <Form.Item label="偶发位移速率突变报警：">
                                    {getFieldDecorator('incidentalVelocity', {
                                        initialValue:surefaceParmsSetModel.incidentalVelocity,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入偶发位移速率突变报警',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm/d)
                                </Form.Item>
                                <Form.Item label="速度黄色预警值:">
                                    {getFieldDecorator('vLevel1', {
                                        initialValue:surefaceParmsSetModel.vLevel1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入速度黄色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm/d)
                                </Form.Item>
                                <Form.Item label="速度橙色预警值:">
                                    {getFieldDecorator('vLevel2', {
                                        initialValue:surefaceParmsSetModel.vLevel2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入速度橙色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm/d)
                                </Form.Item>
                                <Form.Item label="速度红色预警值:">
                                    {getFieldDecorator('vLevel3', {
                                        initialValue:surefaceParmsSetModel.vLevel3,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入速度红色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm/d)
                                </Form.Item>
                            </Card>
                            <br/>
                            <Card title={"位移矢量值超限预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" checked={surefaceParmsSetModel.enableDisplacement} onChange={this.onDibiaoEnableDisplacementChange}/>} className={"warning-setting-card"}>
                                <Form.Item label="累计位移矢量值阈值类型:">
                                    {getFieldDecorator('dType', {
                                        initialValue:surefaceParmsSetModel.dType,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请选择累计位移矢量值阈值类型',
                                        },
                                        ],
                                    })(<Radio.Group>
                                        <Radio value={1}>水平累积位移矢量值</Radio>
                                        <Radio value={2}>三维累积位移矢量值</Radio>
                                    </Radio.Group>)}
                                </Form.Item>
                                <Form.Item label="距离黄色预警值：">
                                    {getFieldDecorator('dLevel1', {
                                        initialValue:surefaceParmsSetModel.dLevel1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入距离黄色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)(mm/d)
                                </Form.Item>
                                <Form.Item label="距离橙色预警值：">
                                    {getFieldDecorator('dLevel2', {
                                        initialValue:surefaceParmsSetModel.dLevel2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入距离橙色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)(mm/d)
                                </Form.Item>
                                <Form.Item label="距离红色预警值：">
                                    {getFieldDecorator('dLevel3', {
                                        initialValue:surefaceParmsSetModel.dLevel3,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入距离红色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)(mm/d)
                                </Form.Item>
                            </Card>
                        </div>}
                        { deviceId === DeviceIdEnum.JIANGYU && <div>
                            <Card title={"降雨量预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" checked={rainGaugeParmsSetModel.enable} onChange={this.onRainsEnabledChange}/>} className={"warning-setting-card"}>
                                <Form.Item label="天降雨量黄色预警值：">
                                    {getFieldDecorator('dayRainLevel1', {
                                        initialValue:rainGaugeParmsSetModel.dayRainLevel1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入天降雨量黄色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                                <Form.Item label="天降雨量橙色预警值:">
                                    {getFieldDecorator('dayRainLevel2', {
                                        initialValue:rainGaugeParmsSetModel.dayRainLevel2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入天降雨量橙色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                                <Form.Item label="天降雨量红色预警值:">
                                    {getFieldDecorator('dayRainLevel3', {
                                        initialValue:rainGaugeParmsSetModel.dayRainLevel3,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入天降雨量红色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                            </Card>
                        </div>}
                        { deviceId === DeviceIdEnum.LIEFENG && <div>
                            <Card title={"裂缝长度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" checked={fissureMeterModel.enable} onChange={this.onFissureMeterEnabledChange}/>} className={"warning-setting-card"}>
                                <Form.Item label="裂缝黄色预警值:">
                                    {getFieldDecorator('lengthLevel1', {
                                        initialValue:fissureMeterModel.lengthLevel1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入黄色预警',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)}(°)
                                </Form.Item>
                                <Form.Item label="裂缝橙色预警值：">
                                    {getFieldDecorator('lengthLevel2', {
                                        initialValue:fissureMeterModel.lengthLevel2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入裂缝橙色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (°)
                                </Form.Item>
                                <Form.Item label="裂缝红色预警值：">
                                    {getFieldDecorator('lengthLevel3', {
                                        initialValue:fissureMeterModel.lengthLevel3,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入裂缝红色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (°)
                                </Form.Item>
                            </Card>
                        </div>}
                        { deviceId === DeviceIdEnum.CEXIE && <div>
                            <Card title={"水平位移预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" checked={flexiTiltParmsSetModel.horizontalDisplacementEnabled} onChange={this.onRouxingHorizontalDisplacementEnabledChange}/>} className={"warning-setting-card"}>
                                <Form.Item label="黄色预警值:">
                                    {getFieldDecorator('horizontalDisplacementLevel1', {
                                        initialValue:flexiTiltParmsSetModel.horizontalDisplacementLevel1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入黄色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                                <Form.Item label="橙色预警值:">
                                    {getFieldDecorator('horizontalDisplacementLevel2', {
                                        initialValue:flexiTiltParmsSetModel.horizontalDisplacementLevel2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入橙色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                                <Form.Item label="红色预警值:">
                                    {getFieldDecorator('horizontalDisplacementLevel3', {
                                        initialValue:flexiTiltParmsSetModel.horizontalDisplacementLevel3,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入红色预警值',
                                            },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                            </Card>
                            <br/>
                            <Card title={"位移速度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" checked={flexiTiltParmsSetModel.vEnabled} onChange={this.onRouxingVEnabledChange} />} className={"warning-setting-card"}>
                                <Form.Item label="黄色预警值:">
                                    {getFieldDecorator('vLevel1', {
                                        initialValue:flexiTiltParmsSetModel.vLevel1,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入黄色预警值',
                                            },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                                <Form.Item label="橙色预警值:">
                                    {getFieldDecorator('vLevel2', {
                                        initialValue:flexiTiltParmsSetModel.vLevel2,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入橙色预警值',
                                            },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                                <Form.Item label="红色预警值:">
                                    {getFieldDecorator('vLevel3', {
                                        initialValue:flexiTiltParmsSetModel.vLevel3,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入红色预警值',
                                            },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (mm)
                                </Form.Item>
                            </Card>
                        </div>}
                        { deviceId === DeviceIdEnum.SHUIWEI && <div>
                            <Card title={"水位高度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" checked={waterLevelParmsModel.enable} onChange={this.onWaterLevelEnabledChange}/>} className={"warning-setting-card"}>
                                <Form.Item label="水位黄色预警值：">
                                    {getFieldDecorator('waterLevel1', {
                                        initialValue:waterLevelParmsModel.waterLevel1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入水位黄色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (m)
                                </Form.Item>
                                <Form.Item label="水位橙色预警值：">
                                    {getFieldDecorator('waterLevel2', {
                                        initialValue:waterLevelParmsModel.waterLevel2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入水位橙色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (m)
                                </Form.Item>
                                <Form.Item label="水位红色预警值：">
                                    {getFieldDecorator('waterLevel3', {
                                        initialValue:waterLevelParmsModel.waterLevel3,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入水位红色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (m)
                                </Form.Item>
                            </Card>
                        </div>}
                        { deviceId === DeviceIdEnum.SHUIYA && <div>
                            <Card title={"水压高度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" checked={waterPreParmsModel.enable} onChange={this.onWaterPressureEnabledChange}/>} className={"warning-setting-card"}>
                                <Form.Item label="水压黄色预警值：">
                                    {getFieldDecorator('waterPressure1', {
                                        initialValue:waterPreParmsModel.waterPressure1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入水压黄色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (m)
                                </Form.Item>
                                <Form.Item label="水压橙色预警值">
                                    {getFieldDecorator('waterPressure2', {
                                        initialValue:waterPreParmsModel.waterPressure2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入水压橙色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (m)
                                </Form.Item>
                                <Form.Item label="水压红色预警值">
                                    {getFieldDecorator('waterPressure3', {
                                        initialValue:waterPreParmsModel.waterPressure3,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入水压红色预警值',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (m)
                                </Form.Item>
                            </Card>
                        </div>}
                        { deviceId === DeviceIdEnum.ZHIXINZHUANG && <div>

                            <Card title={"XY向角位移速度预警参数"} extra={<Switch checkedChildren="启用" unCheckedChildren="禁用" checked={intellectualCorePileParmsModel.enable} onChange={this.onIntellectualCorePileEnabledChange} />} className={"warning-setting-card"}>
                            <Form.Item label="黄色预警:">
                                    {getFieldDecorator('vxyLevel1', {
                                        initialValue:intellectualCorePileParmsModel.vxyLevel1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入黄色预警',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (°)
                                </Form.Item>
                                <Form.Item label="橙色预警：">
                                    {getFieldDecorator('vxyLevel2', {
                                        initialValue:intellectualCorePileParmsModel.vxyLevel2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入橙色预警',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (°)
                                </Form.Item>
                                <Form.Item label="红色预警：">
                                    {getFieldDecorator('vxyLevel3', {
                                        initialValue:intellectualCorePileParmsModel.vxyLevel3,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入红色预警',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (°)
                                </Form.Item>
                            </Card>
                            <br/>
                            <Card title={"XY向倾斜角预警参数"} className={"warning-setting-card"}>
                                <Form.Item label="黄色预警:">
                                    {getFieldDecorator('angleXYLevel1', {
                                        initialValue:intellectualCorePileParmsModel.angleXYLevel1,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入黄色预警',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (°)
                                </Form.Item>
                                <Form.Item label="橙色预警：">
                                    {getFieldDecorator('angleXYLevel2', {
                                        initialValue:intellectualCorePileParmsModel.angleXYLevel2,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入橙色预警',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (°)
                                </Form.Item>
                                <Form.Item label="红色预警：">
                                    {getFieldDecorator('angleXYLevel3', {
                                        initialValue:intellectualCorePileParmsModel.angleXYLevel3,
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入红色预警',
                                        },
                                        ],
                                    })(<InputNumber precision={2} min={0}/>)} (°)
                                </Form.Item>
                            </Card>
                        </div>}
                    <br/>
                    <Card className={"warning-setting-card"}>
                        <Form.Item label="联系电话：">
                            {getFieldDecorator('mobileNumbers', {
                                initialValue:mobileNumbers,
                                rules: [
                                    {
                                        validator: this.validateMutiplePhoneNum,
                                    },
                                    {
                                        required: false,
                                        message: '请输入联系电话',
                                    },
                                ],
                            })(<Input placeholder={"短信通知:每个手机号之间用( , )分割"}  style={{ width: 612 }}/>)}
                        </Form.Item>
                    </Card>
                    <br/>
                    <Button type={"primary"} size={"large"} icon={"save"} onClick={this.save}>
                            保存
                    </Button>
                </Form>

            </div>

        )
    }
}
const mapPropsToFields = props => {
    return {
     
    };
  };
export default Form.create({ mapPropsToFields })(WarningSetting);