/*
 * @Author: your name
 * @Date: 2020-08-08 08:40:19
 * @LastEditTime: 2020-08-16 16:26:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\FlexiTiltParmsSetModel.ts
 */
export default class FlexiTiltParmsSetModel{
    public groupId:string;

    public groupName:string;

    public userId:string;

    public projectId:string;

    public createAt:Date;

    public horizontalDisplacementEnabled:boolean;

    public horizontalDisplacementLevel0:number;

    public horizontalDisplacementLevel1:number;

    public horizontalDisplacementLevel2:number;

    public horizontalDisplacementLevel3:number;

    public vEnabled:boolean;

    public vLevel0:number;

    public vLevel1:number;

    public vLevel2:number;

    public vLevel3:number;

    public updateAt:Date;

    public updateBy:string;

    public mobileNumbers:string;

constructor({
    groupId,
    groupName,
    userId,
    projectId,
    createAt,
    horizontalDisplacementEnabled,
    horizontalDisplacementLevel0,
    horizontalDisplacementLevel1,
    horizontalDisplacementLevel2,
    horizontalDisplacementLevel3,
    vEnabled,
    vLevel0,
    vLevel1,
    vLevel2,
    vLevel3,
    updateAt,
    updateBy,
    mobileNumbers,
}:any){
    this.groupId = groupId;
    this.groupName = groupName;
    this.userId = userId;
    this.projectId = projectId;
    this.createAt = createAt;
    this.horizontalDisplacementEnabled = horizontalDisplacementEnabled;
    this.horizontalDisplacementLevel0 = horizontalDisplacementLevel0;
    this.horizontalDisplacementLevel1 = horizontalDisplacementLevel1;
    this.horizontalDisplacementLevel2 = horizontalDisplacementLevel2;
    this.horizontalDisplacementLevel3 = horizontalDisplacementLevel3;
    this.vEnabled = vEnabled;
    this.vLevel0 = vLevel0;
    this.vLevel1 = vLevel1;
    this.vLevel2 = vLevel2;
    this.vLevel3 = vLevel3;
    this.updateAt = updateAt;
    this.updateBy = updateBy;
    this.mobileNumbers = mobileNumbers;
    }
}

