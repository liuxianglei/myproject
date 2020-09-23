export default class OriginalSetModel {
    public projectId: string;

    public partitionId: string;

    public groupId:string;
   
    public stationId: string;

    public startDate: string;

    public endDate: string;

    constructor({
        projectId,
        partitionId,
        groupId,
        stationId,
        startDate,
        endDate,
    }: any) {
        this.projectId = projectId;
        this.partitionId = partitionId;
        this.groupId = groupId;
        this.stationId = stationId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
