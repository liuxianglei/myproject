export default class CorePileOriginalRetModel {
    public stationName: string;

    public collectingTime: Date;

    public ax: number;

    public ay: number;

    public thetaX: number;

    public thetaY: number;

    public voltage: string;

    public signalIntensity: string;

    constructor({
        stationName,
        collectingTime,
        ax,
        ay,
        thetaX,
        thetaY,
        voltage,
        signalIntensity,
    }: any) {
        this.stationName = stationName;
        this.collectingTime = collectingTime;
        this.ax = ax;
        this.ay = ay;
        this.thetaX = thetaX;
        this.thetaY = thetaY;
        this.voltage = voltage;
        this.signalIntensity = signalIntensity;
    }
}
