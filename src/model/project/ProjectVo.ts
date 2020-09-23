export default class ProjectVo{
    public projectId:string;
    public projectName:string;
    public userId:string;
    public coordinatex:number;
    public coordinatey:number;
    public deviceIds:string;
    public createDate:Date;
    public mapURL:string;
    public mapFileNamePattern:string;
    public description:string;
    public probeCnt:number;
    public normalProbeCnt:number;
    public offlineProbeCnt:number;
    public warningProbeCnt:number;
    public projectDescription:string;

    constructor({projectId,projectName,userId,coordinatex,coordinatey,deviceId,createDate,mapURL,mapFileNamePattern,description,probeCnt,normalProbeCnt,offlineProbeCnt,warningProbeCnt,projectDescription}:any){
        this.projectId = projectId;
        this.projectName = projectName;
        this.userId = userId;
        this.coordinatex = coordinatex;
        this.coordinatey = coordinatey;
        this.deviceIds = deviceId;
        this.createDate = createDate;
        this.mapURL = mapURL;
        this.mapFileNamePattern = mapFileNamePattern;
        this.description = description;
        this.probeCnt = probeCnt;
        this.normalProbeCnt = normalProbeCnt;
        this.offlineProbeCnt = offlineProbeCnt;
        this.warningProbeCnt = warningProbeCnt;
        this.projectDescription = projectDescription;
    }
}