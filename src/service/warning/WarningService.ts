/*
 * @Author: your name
 * @Date: 2020-08-07 23:07:48
 * @LastEditTime: 2020-08-16 19:15:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\service\warning\WarningService.ts
 */
import WarninSearchModel from '../../model/warning/WarningSearchModel';
import { getWarningRecordList, warningStatusSet, setFissureMeter, getFissureMeter, setFlexiTiltParams, getFlexiTiltParamsSearch, setIntellectualCorePile, getIntellectualCorePile, setRainParams, getRainParams, setsurfaceParams, getsufaceParames, setWaterLevelParams, getWaterLevelParams, setWaterPressureParams, getWaterPressureParams } from '../../api/warning/warning-api';
import PageRequest from '../../model/common/PageRequest';
import WarningDataModel from '../../model/warning/WarningDataModel';
import FissureMeterModel from '../../model/warning/FissureMeterModel';
import WarningSettingSearchModel from '../../model/warning/WarningSettingSearchModel';
import FlexiTiltParmsSetModel from '../../model/warning/FlexiTiltParmsSetModel';
import IntellectualCorePileParmsModel from '../../model/warning/IntellectualCorePileParmsModel';
import RainGaugeParmsSetModel from '../../model/warning/RainGaugeParmsSetModel';
import SurefaceParmsSetModel from '../../model/warning/SurefaceParmsSetModel';
import WarningLevelModel from '../../model/warning/WarningLevelModel';
import WarningPressureModel from '../../model/warning/WarningPressureModel';

export default class WarningService{
    
    
  getWarningRecordList=async(warninSearchModel:WarninSearchModel,pageRequest:PageRequest):Promise<any>=>{
    let res =await getWarningRecordList(warninSearchModel,pageRequest);
    return res;
  }
  
  
warningStatusSet=async(warningDataModel:WarningDataModel):Promise<any>=>{
    let res = await warningStatusSet(warningDataModel);
    return res;
  }

setFissureMeter=async(params:FissureMeterModel):Promise<any>=>{
  let res = await setFissureMeter(params);
  return res;
}

getFissureMeter=async(params:WarningSettingSearchModel):Promise<any>=>{
  let res = await getFissureMeter(params);
  return res;
}
setFlexiTiltParams=async(params:FlexiTiltParmsSetModel):Promise<any>=>{
  let res = await setFlexiTiltParams(params);
  return res;
}
getFlexiTiltParamsSearch=async(params:WarningSettingSearchModel):Promise<any>=>{
  let res = await getFlexiTiltParamsSearch(params);
  return res;
}
setIntellectualCorePile=async(params:IntellectualCorePileParmsModel):Promise<any>=>{
  let res = await setIntellectualCorePile(params);
  return res;
}
getIntellectualCorePile=async(params:WarningSettingSearchModel):Promise<any>=>{
  let res = await getIntellectualCorePile(params);
  return res;
}
setRainParams=async(params:RainGaugeParmsSetModel):Promise<any>=>{
  let res =  await setRainParams(params);
  return res;
}
getRainParams=async(params:WarningSettingSearchModel):Promise<any>=>{
  let res = await getRainParams(params);
  return res;
}
setsurfaceParams=async(params:SurefaceParmsSetModel):Promise<any>=>{
  let res = await setsurfaceParams(params);
  return res;
}
getsufaceParames=async(params:WarningSettingSearchModel):Promise<any>=>{
  let res = await getsufaceParames(params);
  return res;
}
setWaterLevelParams=async(params:WarningLevelModel):Promise<any>=>{
  let res = await setWaterLevelParams(params);
  return res;
}
getWaterLevelParams=async(params:WarningSettingSearchModel):Promise<any>=>{
  let res = await getWaterLevelParams(params);
  return res;
}
setWaterPressureParams=async(params:WarningPressureModel):Promise<any>=>{
  let res = await setWaterPressureParams(params);
  return res;
}
getWaterPressureParams=async(params:WarningSettingSearchModel):Promise<any>=>{
  let res = await getWaterPressureParams(params);
  return res;
}
}