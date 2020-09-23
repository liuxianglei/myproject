import OriginalSetModel from "../../model/dataManage/OriginalSetModel";
import PageRequest from "../../model/common/PageRequest";
import { pageGnss,pageFlt,pageIcp,pageRain,pageWl,pageWp,saveGnss,saveRain } from '../../api/dataManage/data-manage-api'

export default class DataManageService{

    async pageGnss(originalSetModel:OriginalSetModel,pageRequest:PageRequest): Promise<any>{
        return await pageGnss(originalSetModel,pageRequest);
    }
    async saveGnss(data): Promise<any>{
        return await saveGnss(data);
    }
    async saveRain(data): Promise<any>{
        return await saveRain(data);
    }
    async pageFlt(originalSetModel:OriginalSetModel,pageRequest:PageRequest): Promise<any>{
        return await pageFlt(originalSetModel,pageRequest);
    }
    async pageIcp(originalSetModel:OriginalSetModel,pageRequest:PageRequest): Promise<any>{
        return await pageIcp(originalSetModel,pageRequest);
    }
    async pageRain(originalSetModel:OriginalSetModel,pageRequest:PageRequest): Promise<any>{
        return await pageRain(originalSetModel,pageRequest);
    }
    async pageWl(originalSetModel:OriginalSetModel,pageRequest:PageRequest): Promise<any>{
        return await pageWl(originalSetModel,pageRequest);
    }
    async pageWp(originalSetModel:OriginalSetModel,pageRequest:PageRequest): Promise<any>{
        return await pageWp(originalSetModel,pageRequest);
    }
}