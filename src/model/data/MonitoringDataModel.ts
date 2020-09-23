import SurfaceDisplacementAnalysisModel from './SurfaceDisplacementAnalysisModel';

export default class MonitoringDataModel{
    public displacementList:Array<Array<SurfaceDisplacementAnalysisModel>>;

    public stationName:string;

    public azimuth:number;

    public vectorValue:number;
    constructor({
        displacementList,
        stationName,
        azimuth,
        vectorValue
    }:any){
        this.displacementList = displacementList;
        this.stationName = stationName;
        this.azimuth = azimuth;
        this.vectorValue = vectorValue;
    }
}