export default class WaterPressureOriginalRetModel {
    public stationName: string;

    public collectingTime: Date;

    public pressure: number;

    public voltage: string;

    public signalIntensity: string;

    constructor({
        stationName,
        collectingTime,
        pressure,
        voltage,
        signalIntensity,
    }: any) {
        this.stationName = stationName;
        this.collectingTime = collectingTime;
        this.pressure = pressure;
        this.voltage = voltage;
        this.signalIntensity = signalIntensity;
    }
}