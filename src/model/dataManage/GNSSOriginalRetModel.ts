export default class GNSSOriginalRetModel {
    public stationName: string;

    public collectingTime: Date;

    public longitude: string;

    public latitude: string;

    public x: number;

    public y: number;

    public h: number;

    constructor({
        stationName,
        collectingTime,
        longitude,
        latitude,
        x,
        y,
        h,
    }: any) {
        this.stationName = stationName;
        this.collectingTime = collectingTime;
        this.longitude = longitude;
        this.latitude = latitude;
        this.x = x;
        this.y = y;
        this.h = h;
    }
}

