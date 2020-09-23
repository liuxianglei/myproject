/*
 * @Author: your name
 * @Date: 2020-08-08 08:36:07
 * @LastEditTime: 2020-08-16 16:23:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\SurefaceParmsSetModel.ts
 */
export default class SurefaceParmsSetModel{
    public userId:string;

    public projectId:string;

    public groupId:string;

    public groupName:string;

    public createAt:Date;

    public enableVelocity:boolean;

    public incidentalVelocity:number;

    public vLevel0:number;

    public vLevel1:number;

    public vLevel2:number;

    public vLevel3:number;

    public enableDisplacement:boolean;

    public dType:number;

    public dLevel0:number;

    public dLevel1:number;

    public dLevel2:number;

    public dLevel3:number;

    public mobileNumbers:string;

constructor({
        userId,
        projectId,
        groupId,
        groupName,
        createAt,
        enableVelocity,
        incidentalVelocity,
        vLevel0,
        vLevel1,
        vLevel2,
        vLevel3,
        enableDisplacement,
        dType,
        dLevel0,
        dLevel1,
        dLevel2,
        dLevel3,
        mobileNumbers,
    }:any){
        this.userId = userId;
        this.projectId = projectId;
        this.groupId = groupId;
        this.groupName = groupName;
        this.createAt = createAt;
        this.enableVelocity = enableVelocity;
        this.incidentalVelocity = incidentalVelocity;
        this.vLevel0 = vLevel0;
        this.vLevel1 = vLevel1;
        this.vLevel2 = vLevel2;
        this.vLevel3 = vLevel3;
        this.enableDisplacement = enableDisplacement;
        this.dType = dType;
        this.dLevel0 = dLevel0;
        this.dLevel1 = dLevel1;
        this.dLevel2 = dLevel2;
        this.dLevel3 = dLevel3;
        this.mobileNumbers = mobileNumbers;
    }
}

