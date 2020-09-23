export default class XYZList{
  public h: number;
  public pointName: string;
  public pointNo: string;
  public x: number;
  public y: number;
  public z: number

    constructor({x,y,z,h,pointNo,pointName}:any){
        this.x = x;
        this.y = y;
        this.z = z;
        this.h = h;
        this.pointNo = pointNo;
        this.pointName = pointName;
    }
}