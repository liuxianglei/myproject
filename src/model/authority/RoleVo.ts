import FunctionVo from './FunctionVo'
export default class RoleVo{
    public roleId:string;
    public roleName:string;
    public roleDisabled:boolean;
    public description:string;
    public functions:Array<string>;
    public functionList:Array<FunctionVo>

    constructor({roleId, roleName,roleDisabled=false, description, functions, functionList}:any){
        this.roleId = roleId;
        this.roleName = roleName;
        this.roleDisabled = roleDisabled;
        this.description = description;
        this.functions = functions;
        this.functionList = functionList;
    }

}