export default class MonitorPointVo{
  public monitorPointId: string;
  public monitorPointName: string;
  public waringState: string;
  public currentX: string;
  public currentY: string;
  public deviceId:string;
  public deviceName:string;

  constructor({monitorPointId,monitorPointName,waringState,currentX,currentY,deviceId,deviceName}:any){
    this.monitorPointId = monitorPointId;
    this.monitorPointName = monitorPointName;
    this.waringState = waringState;
    this.currentX = currentX;
    this.currentY = currentY;
    this.deviceId = deviceId;
    this.deviceName = deviceName;
  }
}