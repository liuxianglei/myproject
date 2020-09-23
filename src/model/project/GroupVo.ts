export default class GroupVo{

    public projectId:string;
    public projectName:string;
    public partitionId:string;
    public partitionName:string;
    public groupId:string;
    public groupName:string;
    public createDate:Date;

    constructor({projectId,projectName,partitionId,partitionName,groupId,groupName,createDate}:any){
        this.projectId = projectId;
        this.projectName = projectName;
        this.partitionId = partitionId;
        this.partitionName = partitionName;
        this.groupId = groupId;
        this.groupName = groupName;
        this.createDate = createDate;
    }

}