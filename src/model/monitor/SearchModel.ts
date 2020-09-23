/*
 * @Author: your name
 * @Date: 2020-08-08 16:51:45
 * @LastEditTime: 2020-08-08 16:52:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\monitor\SearchModel.ts
 */
export default class SearchModel{
    public projectId:string;
    
    public ParitionId:string;
    
    public groupId:string;
    
    constructor({
        projectId,
        ParitionId,
        groupId,
    }:any){
        this.projectId = projectId;
        this.ParitionId = ParitionId;
        this.groupId = groupId;
    }
}