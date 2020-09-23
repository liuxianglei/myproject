export default class WaterLevelOriginalRetModel {
    public stationName: string;

    public collectingTime: Date;

    public level: number;

    public voltage: string;

    public signalIntensity: string;

    constructor({
        stationName,
        collectingTime,
        level,
        voltage,
        signalIntensity,
    }: any) {
        this.stationName = stationName;
        this.collectingTime = collectingTime;
        this.level = level;
        this.voltage = voltage;
        this.signalIntensity = signalIntensity;
    }
}

