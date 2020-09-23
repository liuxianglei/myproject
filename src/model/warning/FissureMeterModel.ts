/*
 * @Author: your name
 * @Date: 2020-08-16 16:57:29
 * @LastEditTime: 2020-08-16 16:57:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\dsf .ts
 */
export default class FissureMeterModel{
    public projectId:string;

    public groupId:string;

    public createAt:Date;

    public createBy:string;

    public enable:boolean;

    public updateAt:Date;

    public updateBy:string;

    public lengthLevel0:number;

    public lengthLevel1:number;

    public lengthLevel2:number;

    public lengthLevel3:number;

    public phones:string;

    constructor({
        projectId,
        groupId,
        createAt,
        createBy,
        enable,
        updateAt,
        updateBy,
        lengthLevel0,
        lengthLevel1,
        lengthLevel2,
        lengthLevel3,
        phones,
    }:any){
        this.projectId = projectId;
        this.groupId = groupId;
        this.createAt = createAt;
        this.createBy = createBy;
        this.enable = enable;
        this.updateAt = updateAt;
        this.updateBy = updateBy;
        this.lengthLevel0 = lengthLevel0;
        this.lengthLevel1 = lengthLevel1;
        this.lengthLevel2 = lengthLevel2;
        this.lengthLevel3 = lengthLevel3;
        this.phones = phones;
    }
}

