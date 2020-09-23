import XYZModel from './XYZModel'

export default class FlexiTiltOriginalRetModel {
    public stationName: string;

    public collectingTime: Date;

    public xyzModelList: Array<XYZModel>;

    public voltage: string;

    public signalIntensity: string;

    constructor({
        stationName,
        collectingTime,
        xyzModelList,
        voltage,
        signalIntensity,
    }: any) {
        this.stationName = stationName;
        this.collectingTime = collectingTime;
        this.xyzModelList = xyzModelList;
        this.voltage = voltage;
        this.signalIntensity = signalIntensity;
    }
}