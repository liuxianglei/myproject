import XYZList from "./XYZList";

export default class InitValueVo{
    public deviceId:string;
    public createdTime: Date;
    public description: string;
    public initialType: number;
    public initialValueId: Array<string>;
    public projectId:string;
    public stationId: string;
    public stationName: string;
    public xyzList: Array<XYZList>;

    constructor({deviceId,createdTime,description,initialType,initialValueId,projectId,stationId,stationName,xyzList}:any){
        this.deviceId = deviceId;
        this.createdTime = createdTime;
        this.description = description;
        this.initialType = initialType;
        this.initialValueId = initialValueId;
        this.projectId = projectId;
        this.stationId = stationId;
        this.stationName = stationName;
        this.xyzList = xyzList;
    }
}