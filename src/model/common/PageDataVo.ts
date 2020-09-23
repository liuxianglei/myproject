export default class PageDataVo<T> {
    public page: number;
    public size: number;
    public totalElements: number;
    public totalPage: number;
    public content: Array<T>;
    constructor({
        page = 1,
        size = 10,
        totalElements = 0,
        totalPage = 0,
        content = [],
    }: any) {
        this.page = page
        this.size = size
        this.totalElements = totalElements
        this.totalPage = totalPage
        this.content = content
    }
}
