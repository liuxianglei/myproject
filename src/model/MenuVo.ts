export default class MenuVo{
    public parentKey:string;
    public functionStr:string;
    public key:string;
    public name:string;
    public icon:string;
    public path:string;
    public children:Array<MenuVo>;

    constructor({parentKey,functionStr,key,name,icon,path,children}:any){
        this.parentKey = parentKey;
        this.functionStr = functionStr;
        this.key = key;
        this.name = name;
        this.icon = icon;
        this.path = path;
        this.children = children;
    }
}