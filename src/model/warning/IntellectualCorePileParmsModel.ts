/*
 * @Author: your name
 * @Date: 2020-08-08 08:51:25
 * @LastEditTime: 2020-08-16 16:37:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\IntellectualCorePileParmsModel.ts
 */
export default class IntellectualCorePileParmsModel{
    public projectId:string;

    public partitionId:string;

    public groupId:string;

    public enable:boolean;

    public vxyLevel0:number;

    public vxyLevel1:number;

    public vxyLevel2:number;

    public vxyLevel3:number;

    public angleXYLevel0:number;

    public angleXYLevel1:number;

    public angleXYLevel2:number;

    public angleXYLevel3:number;

    public phones:string;

    constructor({
        projectId,
        partitionId,
        groupId,
        enable,
        vxyLevel0,
        vxyLevel1,
        vxyLevel2,
        vxyLevel3,
        angleXYLevel0,
        angleXYLevel1,
        angleXYLevel2,
        angleXYLevel3,
        phones,
    }:any){
        this.projectId = projectId;
        this.partitionId = partitionId;
        this.groupId = groupId;
        this.enable = enable;
        this.vxyLevel0 = vxyLevel0;
        this.vxyLevel1 = vxyLevel1;
        this.vxyLevel2 = vxyLevel2;
        this.vxyLevel3 = vxyLevel3;
        this.angleXYLevel0 = angleXYLevel0;
        this.angleXYLevel1 = angleXYLevel1;
        this.angleXYLevel2 = angleXYLevel2;
        this.angleXYLevel3 = angleXYLevel3;
        this.phones = phones;
    }
}
