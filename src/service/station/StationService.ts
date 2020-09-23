/*
 * @Author: your name
 * @Date: 2020-07-06 19:58:56
 * @LastEditTime: 2020-08-09 16:07:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\service\station\StationService.ts
 */ 
import {getStationTypeList,getChildNodeList,editChildNode,getStationList,addStation,editStation,delStation,findInitVal,findInitTypeList,addInitVal,delInitVal,findAddInitVal} from '../../api/station/station-api';
import StationQuery from '../../model/station/StationQuery';
import StationVo from '../../model/station/StationVo';
import InitValueVo from '../../model/project/InitValueVo';
import ChildNodeVo from '../../model/project/ChildNodeVo';
import PageRequest from '../../model/common/PageRequest';

export default class StationService {

    async getStationTypeList():Promise<any> {
        return await getStationTypeList();
    }
    async getChildNodeList(stationId:string):Promise<any> {
        return await getChildNodeList(stationId);
    }
    async editChildNode(editVo:ChildNodeVo):Promise<any> {
        return await editChildNode(editVo);
    }

    async getStationList(stationQuery:StationQuery): Promise<any> {
        let res = await getStationList(stationQuery);
        return res;
    }
    async addStation(addVo:StationVo): Promise<any> {
        let res = await addStation(addVo);
        return res;
    }
    async editStation(editVo:StationVo): Promise<any> {
        let res = await editStation(editVo);
        return res;
    }
    async delStation(stationId:string,deviceId:string): Promise<any> {
        let res = await delStation(stationId,deviceId);
        return res;
    }
    async findInitVal(stationId:string,deviceId:string): Promise<any> {
        let res = await findInitVal(stationId,deviceId);
        return res;
    }
    async findInitTypeList(): Promise<any> {
        let res = await findInitTypeList();
        return res;
    }
    async addInitVal(initValueVo:InitValueVo): Promise<any> {
        let res = await addInitVal(initValueVo);
        return res;
    }
    async delInitVal(stationId:string,deviceId:string,initialValueId:string): Promise<any> {
        let res = await delInitVal(stationId,deviceId,initialValueId);
        return res;
    }
    async findAddInitVal(stationId:string,deviceId:string,startDate:string,endDate:string,pageRequest:PageRequest): Promise<any> {
        let res = await findAddInitVal(stationId,deviceId,startDate,endDate,pageRequest);
        return res;
    }
    
}
