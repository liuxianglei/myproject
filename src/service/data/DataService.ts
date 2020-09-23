/*
 * @Author: your name
 * @Date: 2020-07-25 18:02:08
 * @LastEditTime: 2020-08-30 19:39:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\service\data\DataService.ts
 */ 
import {getSureFaceData, getCurveTypeSet,getIntellectualCorePileData,getRainData,getWaterLevelData,getWaterPressureData,getFlexData, exportSureFaceData} from '../../api/data/data-api';
import SurfaceDisplacementAnalysisModel from '../../model/data/SurfaceDisplacementAnalysisModel';
import SurefaceSearchModel from '../../model/data/SurefaceSearchModel';
import CurvetTypeModel from '../../model/data/CurveTypeModel';
import RainGaugeAnalysisModel from '../../model/data/RainGaugeAnalysisModel';
import FlexiTiltAnalysisModel from '../../model/data/FlexiTiltAnalysisModel';
import PointDataModel from '../../model/data/PointDataModel';
import PointModel from '../../model/data/PointModel';
import IntellectualCorePileModel from '../../model/data/IntellectualCorePileModel';
import WaterLevelDataModel from '../../model/data/WaterLevelDataModel';

export default class DataService {

    getSureFaceData=async(surefaceSearchModel:SurefaceSearchModel): Promise<any>=> {
        console.log("surefaceSearchModel:",surefaceSearchModel)
        let res = await getSureFaceData(surefaceSearchModel);

    //     let data = [];
    //     let data1 = 
    //     {   stationName:"stationName",  
    //         collectDataTime:new Date("2020-08-01 13:00:00"),
    //         startTime:new Date(),  
    //         endTime:new Date(), 
    //         xd:1, 
    //         yd:1, 
    //         hd:1, 
    //         lxyd:1, 
    //         ld:1, 
    //         sxd:1, 
    //         syd:1, 
    //         shd:1, 
    //         sxyd:1, 
    //         s3dd:1, 
    //         vxd:1, 
    //         vyd:1, 
    //         vhd:1, 
    //         vxyd:1, 
    //         vLd:1, 
    //         accXd:1, 
    //         accYd:1, 
    //         accHd:1, 
    //         acc3Dd:1, 
    //         vectorAngleXYd:1,  
    //     }
    //     let data2 = {   stationName:"stationName",  
    //     collectDataTime:new Date(),
    //     startTime:new Date(),  
    //     endTime:new Date(), 
    //     xd:2, 
    //     yd:2, 
    //     hd:2, 
    //     lxyd:2, 
    //     ld:2, 
    //     sxd:2, 
    //     syd:2, 
    //     shd:2, 
    //     sxyd:2, 
    //     s3dd:2, 
    //     vxd:2, 
    //     vyd:2, 
    //     vhd:2, 
    //     vxyd:2, 
    //     vLd:2, 
    //     accXd:2, 
    //     accYd:2, 
    //     accHd:2, 
    //     acc3Dd:2, 
    //     vectorAngleXYd:2,  
    // }
    //     data.push(new SurfaceDisplacementAnalysisModel(data1))
    //     data.push(new SurfaceDisplacementAnalysisModel(data2))

    //     let surfaceDisplacementAnalysisModelList = data.map((e:SurfaceDisplacementAnalysisModel)=>e);
        return res;
    }
    
    exportSureFaceData=(surefaceSearchModel:SurefaceSearchModel)=>{
        exportSureFaceData(surefaceSearchModel);
    }

    async getCurveTypeSet(deviceId:string): Promise<any> {
        let res = await getCurveTypeSet(deviceId);
        // let {data} = res;
        // let curveList = data.map(e=>new CurvetTypeModel(e));

        return res;
    }

    getRainsData=async(surefaceSearchModel:SurefaceSearchModel): Promise<any>=> {
        let res = await getRainData(surefaceSearchModel);
        // let rainGaugeAnalysisModel1 = new RainGaugeAnalysisModel({time:new Date("2020-08-07 11:11:11"),rains:22});
        // let rainGaugeAnalysisModel2 = new RainGaugeAnalysisModel({time:new Date("2020-08-08 11:11:11"),rains:33});

        // return [rainGaugeAnalysisModel1,rainGaugeAnalysisModel2];
        return res;
    }

    getFlexData=async(surefaceSearchModel:SurefaceSearchModel): Promise<any>=> {
        // console.log("surefaceSearchModel:",surefaceSearchModel)
        let res = await getFlexData(surefaceSearchModel);
        let axpointModel1 = new PointModel({dataDate:new Date("2020-08-01 13:00:00"),dataValue:2});
        let axpointModel2 = new PointModel({dataDate:new Date("2020-08-02 13:00:00"),dataValue:2});
        let aypointModel1 = new PointModel({dataDate:new Date("2020-08-01 15:00:00"),dataValue:5});
        let aypointModel2 = new PointModel({dataDate:new Date("2020-08-02 15:00:00"),dataValue:5});
        
        let axpointModelList = [axpointModel1,axpointModel2];
        let aypointModelList = [aypointModel1,aypointModel2];

        let pointDataModel = new PointDataModel({number:1,pointName:"-50m",ax:axpointModelList,ay:aypointModelList});

        let axpointModel3 = new PointModel({dataDate:new Date("2020-08-01 13:00:00"),dataValue:-3});
        let axpointModel4 = new PointModel({dataDate:new Date("2020-08-02 13:00:00"),dataValue:-2});
        let aypointModel3 = new PointModel({dataDate:new Date("2020-08-01 15:00:00"),dataValue:-5});
        let aypointModel4 = new PointModel({dataDate:new Date("2020-08-02 15:00:00"),dataValue:-5});
        let axpointModelList2 = [axpointModel3,axpointModel4];
        let aypointModelList2 = [aypointModel3,aypointModel4];

        let pointDataModel2 = new PointDataModel({number:1,pointName:"-40m",ax:axpointModelList2,ay:aypointModelList2});



        let model = new FlexiTiltAnalysisModel({degree:5,pointList:[pointDataModel,pointDataModel2],variant3d:[{x:2,y:2,z:2},{x:4,y:4,z:4}],install3d:[{x:3,y:3,z:3},{x:5,y:5,z:5}]});


        return res;
    }

    getIntellectualCorePileData=async(surefaceSearchModel:SurefaceSearchModel): Promise<any>=> {
        let res = await getIntellectualCorePileData(surefaceSearchModel);
        // let intellectualCorePileModel1 = new IntellectualCorePileModel({collectTime:new Date("2020-08-02 15:00:00"),tiltAngle:22,acceleration:33,Ariant:44});
        // let intellectualCorePileModel2 = new IntellectualCorePileModel({collectTime:new Date("2020-08-03 16:00:00"),tiltAngle:55,acceleration:66,Ariant:77});
        // let intellectualCorePileModel3 = new IntellectualCorePileModel({collectTime:new Date("2020-08-04 17:00:00"),tiltAngle:80,acceleration:90,Ariant:100});


        // return [intellectualCorePileModel1,intellectualCorePileModel2,intellectualCorePileModel3];
        return res;
    }
    getWaterLevelData=async(surefaceSearchModel:SurefaceSearchModel): Promise<any>=> {
        let res = await getWaterLevelData(surefaceSearchModel);
        // let waterModel1 = new WaterModel({collectDate:new Date("2020-08-01 14:00:00"),waterLevel:22});
        // let waterModel2 = new WaterModel({collectDate:new Date("2020-08-02 15:00:00"),waterLevel:33});
        // let waterModel3 = new WaterModel({collectDate:new Date("2020-08-04 17:00:00"),waterLevel:44});
        // return [waterModel1,waterModel2,waterModel3];
        return res;
    }
    getWaterPressureData=async(surefaceSearchModel:SurefaceSearchModel): Promise<any>=> {
        let res = await getWaterPressureData(surefaceSearchModel);
        // let waterModel1 = new WaterModel({collectDate:new Date("2020-08-01 14:00:00"),waterPresure:22});
        // let waterModel2 = new WaterModel({collectDate:new Date("2020-08-02 15:00:00"),waterPresure:33});
        // let waterModel3 = new WaterModel({collectDate:new Date("2020-08-04 17:00:00"),waterPresure:44});
        // return [waterModel1,waterModel2,waterModel3];
        return res;
    }
}