import React, { Component } from 'react'
import SearchForm from '../components/SearchForm'
import { Card, Table, Button } from 'antd'
import OriginalSetModel from '../../../model/dataManage/OriginalSetModel'
import { convert, download } from '../../../lib/utils';
import PageDataVo from '../../../model/common/PageDataVo';
import FlexiTiltOriginalRetModel from '../../../model/dataManage/FlexiTiltOriginalRetModel'
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
    pageData: PageDataVo<FlexiTiltOriginalRetModel>
}

export default class Flexitilt extends Component<iState> {

    state: iState = {
        pageData: new PageDataVo<FlexiTiltOriginalRetModel>({})
    }
    private downloadUrl = `${baseUrl}api/v1/Original/GetFlexiTiltDataExcel`;
    private dataManageService: DataManageService = new DataManageService();
    private pageRequest: PageRequest = new PageRequest({});
    private originalSetModel: OriginalSetModel = new OriginalSetModel({});

    onFormChange = (originalSetModel: OriginalSetModel) => {
        this.originalSetModel = originalSetModel;
        this.search();
    }

    search = async () => {
        let pageData = await this.dataManageService.pageFlt(this.originalSetModel, this.pageRequest);
        this.setState({ pageData });
    }

    exportData = () => {
        download({
            url: this.downloadUrl,
            method: "get",
            fileName: "柔性斜测仪解算导出数据.xlsx",
            params: this.originalSetModel
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.pageRequest.page = pagination.current;
        this.pageRequest.pageSize = pagination.pageSize;
        this.search();
    }

    expandedRowRender = (e) => {
        const columns:any = [
          { title: '节点序号', dataIndex: 'pointNo', key: 'pointNo' ,align:"center" },
          { title: '节点名称', dataIndex: 'pointName', key: 'pointName' ,align:"center" },
          { title: 'x(mm)', dataIndex: 'x', key: 'x' ,align:"center" },
          { title: 'y(mm)', dataIndex: 'y', key: 'y' ,align:"center" },
          { title: 'z(mm)', dataIndex: 'z', key: 'z' ,align:"center" },
        ];
        return <Table rowKey="pointNo" columns={columns} dataSource={e.xyzModelList} pagination={false} />;
    };

    render() {
        let { pageData } = this.state;
        let { pageRequest } = this;
        return (
            <div>
                <Card bordered={false} className="card">
                    <SearchForm deviceId={DeviceIdEnum.CEXIE} onChange={this.onFormChange} />
                    <Table
                        rowKey={(record)=>{return record.stationName+record.collectingTime}}
                        title={() => {
                            return (<Button icon="export" onClick={this.exportData}>导出数据</Button>);
                        }}
                        bordered
                        columns={data_column}
                        expandedRowRender={this.expandedRowRender}
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
