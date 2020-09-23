export default class XYZModel{
    public pointNo: string;

    public pointName: string;

    public x: number;

    public y: number;

    public z: number;

    public h: number;

    constructor({
        pointNo,
        pointName,
        x,
        y,
        z,
        h,
    }: any){
        this.pointNo = pointNo;
        this.pointName = pointName;
        this.x = x;
        this.y = y;
        this.z = z;
        this.h = h;
    }
}