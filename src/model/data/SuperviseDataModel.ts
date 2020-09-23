import RainGaugeAnalysisModel from './RainGaugeAnalysisModel';
import MonitoringDataModel from './MonitoringDataModel';
import WaterLevelDataModel from './WaterLevelDataModel';
import WaterPressureDataModel from './WaterPressureDataModel';

export default class SuperviseDataModel{
    public levelList:Array<WaterLevelDataModel>;
    public pointModels:Array<MonitoringDataModel>;
    public pressureList:Array<WaterPressureDataModel>;
    public rainList:Array<RainGaugeAnalysisModel>;

    constructor({
        levelList,
        pointModels,
        pressureList,
        rainList
    }:any){
        this.levelList = levelList;
        this.pointModels = pointModels;
        this.pressureList = pressureList;
        this.rainList = rainList;
    }

}