import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import { Card, Table, Button, Modal, Upload, Icon, Divider, notification } from 'antd'
import OriginalSetModel from '../../../model/dataManage/OriginalSetModel'
import { convert, download } from '../../../lib/utils';
import PageDataVo from '../../../model/common/PageDataVo';
import RainOriginalRetModel from '../../../model/dataManage/RainOriginalRetModel'
import PageRequest from '../../../model/common/PageRequest';
import DataManageService from '../../../service/dataManage/DataManageService'
import { DeviceIdEnum } from '../../../model/enum/enum';
import { baseUrl } from '../../../config/config';

const data_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "collectingTime",
        title: "监测时间",
        width: 150,
        align:"center",
        render: text => {
            if (text) {
                return <span>{convert(new Date(text), "yyyy-MM-dd hh:mm:ss")}</span>;
            } else {
                return <span>--</span>;
            }
        }
    },
    {
        dataIndex: "rainfall",
        title: "降雨量",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "voltage",
        title: "电源电压（V）",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "signalIntensity",
        title: "信号强度（db）",
        width: 150,
        align:"center"
    },
];

const previewData_column:any = [
    {
        dataIndex: "stationName",
        title: "监测点名称",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "time",
        title: "监测时间",
        width: 150,
        align:"center",
        render: text => {
            if (text) {
                return <span>{convert(new Date(text), "yyyy-MM-dd hh:mm:ss")}</span>;
            } else {
                return <span>--</span>;
            }
        }
    },
    {
        dataIndex: "rain",
        title: "降雨量",
        width: 150,
        align:"center"
    }
];
interface iState {
    importVisible: boolean,
    previewData:Array<any>,
    pageData: PageDataVo<RainOriginalRetModel>
}

export default class Raingauge extends Component<iState> {

    state: iState = {
        importVisible: false,
        previewData: new Array<RainOriginalRetModel>(),
        pageData: new PageDataVo<RainOriginalRetModel>({})
    }
    private downloadUrl = `${baseUrl}api/v1/Original/GetRainOriginalDataExcel`;
    private dataManageService: DataManageService = new DataManageService();
    private pageRequest: PageRequest = new PageRequest({});
    private originalSetModel: OriginalSetModel = new OriginalSetModel({});
    private uploadProps = {
        accept:".txt,.csv,.dat",
        name: 'files',
        action: `${baseUrl}api/v1/Original/SetRainOriginalDataExcel`,
        headers: {
            XASPSESSION: window.sessionStorage.getItem('token'),
        },
        showUploadList:false,
        onChange:(info)=>{this.handleUpload(info)}
    }

    handleUpload = (info) =>{
        if (info.file.status === 'done') {
            let data = info.file.response.data;
            this.setState({previewData:data});
        } else if (info.file.status === 'error') {
          notification.open({
              message: '导入文件报错',
              description: info.file.response.message
            });
        }
    }
    onFormChange = (originalSetModel: OriginalSetModel) => {
        this.originalSetModel = originalSetModel;
        this.search();
    }

    search = async () => {
        let pageData = await this.dataManageService.pageRain(this.originalSetModel, this.pageRequest);
        this.setState({ pageData });
    }

    exportData = () => {
        download({
            url: this.downloadUrl,
            method: "get",
            fileName: "雨量计导出数据.xlsx",
            params: this.originalSetModel
        })
    }
    toImportData = () => {
        this.setState({ importVisible: true, previewData: [] })
    }
    importData = async () => {
        await this.dataManageService.saveRain(this.state.previewData);
        this.setState({importVisible:false})
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.pageRequest.page = pagination.current;
        this.pageRequest.pageSize = pagination.pageSize;
        this.search();
    }

    render() {
        let { pageData,importVisible,previewData } = this.state;
        let { pageRequest,uploadProps } = this;
        return (
            <div>
                <Modal
                    title="导入数据"
                    visible={importVisible}
                    width={900}
                    bodyStyle={{overflow:"auto",maxHeight:600}}
                    footer={<div style={{textAlign:"center"}}><Button disabled={!previewData || previewData.length === 0} type="primary" icon="check" onClick={this.importData}>提交</Button></div>}
                    maskClosable={false}
                    onCancel={() => { this.setState({ importVisible: false }) }}
                >
                    <Upload {...uploadProps}>
                        <Button>
                            <Icon type="upload" /> 上传文件
                        </Button>
                    </Upload>
                    <span style={{marginLeft:10}}>支持扩展名：.txt .csv .dat</span>
                    <Divider/>
                    <Table
                        rowKey={(record) => { return record.stationName + record.time }}
                        title={() => {
                            return (<div>
                            </div>);
                        }}
                        bordered
                        columns={previewData_column}
                        dataSource={previewData}
                        pagination={false}
                    />
                </Modal>
                <Card bordered={false} className="card">
                    <SearchForm deviceId={DeviceIdEnum.JIANGYU} onChange={this.onFormChange} />
                    <Table
                        rowKey={(record)=>{return record.stationName+record.collectingTime}}
                        title={() => {
                            return (<div>
                                        <Button icon="export" onClick={this.exportData}>导出数据</Button>&nbsp;&nbsp;
                                        <Button type="primary" icon="import" onClick={this.toImportData}>导入数据</Button>
                                    </div>);
                        }}
                        bordered
                        columns={data_column}
                        dataSource={pageData.content}
                        pagination={{
                            size: "large",
                            total: pageData.totalElements,
                            pageSize: pageRequest.pageSize,
                            current: pageRequest.page,
                            // pageSizeOptions:['10', '20', '30', '40'],
                            showTotal: total => `共 ${pageData.totalElements} 条`,
                            showQuickJumper: true,
                            // showSizeChanger: true,
                        }}
                        onChange={this.handleTableChange}
                    />
                </Card>
            </div>
        )
    }
}
