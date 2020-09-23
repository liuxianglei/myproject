/*
 * @Author: your name
 * @Date: 2020-07-27 00:07:02
 * @LastEditTime: 2020-08-09 10:54:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\project\PartitionVo.ts
 */
export default class PartitionVo{
    public projectId:string;
    public projectName:string;
    public partitionId:string;
    public partitionName:string;
    public createDate:Date;

    constructor({projectId,projectName,partitionId,partitionName,createDate}:any){
        this.projectId = projectId;
        this.projectName = projectName;
        this.partitionId = partitionId;
        this.partitionName = partitionName;
        this.createDate = createDate;
    }
}