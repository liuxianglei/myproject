export default class ChildNodeVo{
  public description: string;
  public distanceReferencePoint: string;
  public number: number;
  public pointName: string;
  public pointNo: string;
  public pointValid: boolean;
  public stationId: string;
  public warningJudge: boolean;

  constructor({description,distanceReferencePoint,number,pointName,pointNo,pointValid,stationId,warningJudge}:any){
    this.description = description;
    this.distanceReferencePoint = distanceReferencePoint;
    this.number = number;
    this.pointName = pointName;
    this.pointNo = pointNo;
    this.pointValid = pointValid;
    this.stationId = stationId;
    this.warningJudge = warningJudge;
  }
}