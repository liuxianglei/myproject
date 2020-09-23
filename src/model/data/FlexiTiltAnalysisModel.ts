import PointDataModel from './PointDataModel';
import Fta3DModel from './Fta3DModel';

export default class FlexiTiltAnalysisModel{
    public degree:number;
    public pointList:Array<PointDataModel>;
    /**
     * 安装3d数据
     *
     * @type {Array<Fta3DModel>}
     * @memberof FlexiTiltAnalysisModel
     */
    public install3d:Array<Fta3DModel>;
    /**
     * 变形3d坐标
     *
     * @type {Array<Fta3DModel>}
     * @memberof FlexiTiltAnalysisModel
     */
    public variant3d:Array<Fta3DModel>;
    public stationName:string;
    constructor({
        degree,
        pointList,
        install3d,
        variant3d,
        stationName
    }:any){
        this.degree = degree;
        this.pointList = pointList;
        this.install3d = install3d;
        this.variant3d = variant3d;
        this.stationName = stationName;
    }
}