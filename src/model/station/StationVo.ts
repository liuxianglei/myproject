export default class StationVo{
    public coordinateSystemType: number;
    public description: string;
    public deviceId: string;
    public deviceName: string;
    public enable: boolean;
    public groupId: string;
    public groupName: string;
    public installDepth: number;
    public installType: number;
    public partitionId: string;
    public partitionName: string;
    public projectId: string;
    public projectName: string;
    public stationId: string;
    public stationName: string;
    public timeOut: number;
    public voltageLimit: number;
    public warningLevel: string;
    public x: number;
    public xmarkOffset: number;
    public y: number;

    constructor({coordinateSystemType,description,deviceId,deviceName,enable=true,groupId,groupName,installDepth,installType,partitionId,partitionName,projectId
    ,projectName,stationId,stationName,timeOut,voltageLimit,warningLevel,x,xmarkOffset,y}:any){
        this.coordinateSystemType=coordinateSystemType;
        this.description=description;
        this.deviceId=deviceId;
        this.deviceName=deviceName;
        this.enable=enable;
        this.groupId=groupId;
        this.groupName=groupName;
        this.installDepth=installDepth;
        this.installType=installType;
        this.partitionId=partitionId;
        this.partitionName=partitionName;
        this.projectId=projectId;
        this.projectName=projectName;
        this.stationId=stationId;
        this.stationName=stationName;
        this.timeOut=timeOut;
        this.voltageLimit=voltageLimit;
        this.warningLevel=warningLevel;
        this.x=x;
        this.xmarkOffset=xmarkOffset;
        this.y=y;
    }
}