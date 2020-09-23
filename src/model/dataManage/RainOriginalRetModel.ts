export default class RainOriginalRetModel {
    public stationName: string;

    public collectingTime: Date;

    public rainfall: number;

    public voltage: string;

    public signalIntensity: string;

    constructor({
        stationName,
        collectingTime,
        rainfall,
        voltage,
        signalIntensity,
    }: any) {
        this.stationName = stationName;
        this.collectingTime = collectingTime;
        this.rainfall = rainfall;
        this.voltage = voltage;
        this.signalIntensity = signalIntensity;
    }
}