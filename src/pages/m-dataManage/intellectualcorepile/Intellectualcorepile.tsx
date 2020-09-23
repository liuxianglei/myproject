import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import { Card, Table, Button } from 'antd'
import OriginalSetModel from '../../../model/dataManage/OriginalSetModel'
import { convert, download } from '../../../lib/utils';
import PageDataVo from '../../../model/common/PageDataVo';
import CorePileOriginalRetModel from '../../../model/dataManage/CorePileOriginalRetModel'
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
        dataIndex: "ax",
        title: "x加速度",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "ay",
        title: "y加速度",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "thetaX",
        title: "x倾角",
        width: 150,
        align:"center"
    },
    {
        dataIndex: "thetaY",
        title: "y倾角",
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

interface iState {
    pageData: PageDataVo<CorePileOriginalRetModel>
}

export default class Intellectualcorepile extends Component<iState> {

    state: iState = {
        pageData: new PageDataVo<CorePileOriginalRetModel>({})
    }
    private downloadUrl = `${baseUrl}api/v1/Original/GetCorePileOriginalDataExcel`;
    private dataManageService: DataManageService = new DataManageService();
    private pageRequest: PageRequest = new PageRequest({});
    private originalSetModel: OriginalSetModel = new OriginalSetModel({});

    onFormChange = (originalSetModel: OriginalSetModel) => {
        this.originalSetModel = originalSetModel;
        this.search();
    }

    search = async () => {
        let pageData = await this.dataManageService.pageIcp(this.originalSetModel, this.pageRequest);
        this.setState({ pageData });
    }

    exportData = () => {
        download({
            url: this.downloadUrl,
            method: "get",
            fileName: "智芯桩导出数据.xlsx",
            params: this.originalSetModel
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.pageRequest.page = pagination.current;
        this.pageRequest.pageSize = pagination.pageSize;
        this.search();
    }

    render() {
        let { pageData } = this.state;
        let { pageRequest } = this;
        return (
            <div>
                <Card bordered={false} className="card">
                    <SearchForm deviceId={DeviceIdEnum.ZHIXINZHUANG} onChange={this.onFormChange} />
                    <Table
                        rowKey={(record)=>{return record.stationName+record.collectingTime}}
                        title={() => {
                            return (<Button icon="export" onClick={this.exportData}>导出数据</Button>);
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
