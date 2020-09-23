export default class PageRequest{
    public page:number;
    public pageSize:number;

    constructor({page = 1,pageSize = 10}:any){
        this.page = page;
        this.pageSize = pageSize;
    }
}