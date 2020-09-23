export default class FunctionVo{
    public id:string;
    public parentId:string;
    public name:string;
    public icon:string;
    public path:string;
    public functionStr:string;

    constructor({id,parentId,name,icon,path,functionStr}:any){
        this.id = id;
        this.parentId = parentId;
        this.name = name;
        this.icon = icon;
        this.path = path;
        this.functionStr = functionStr;
    }
}