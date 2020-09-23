import RoleVo from './RoleVo'
import ProjectVo from '../project/ProjectVo'

export default class AccountVo{
    public userId:string;
    public userName:string;
    public realName:string;
    public roleList:Array<RoleVo>;
    public roleIds:string;
    public projectList:Array<ProjectVo>;
    public projectIds:string;
    public enabled:number;
    public password:string;
    public phone:string;
    public sex:number;
    
    constructor({userId,userName,realName,roleList,roleIds,projectList,projectIds,enabled,password,phone,sex}:any){
        this.userId = userId;
        this.userName = userName;
        this.realName = realName;
        this.roleList = roleList;
        this.roleIds = roleIds;
        this.projectList = projectList;
        this.projectIds = projectIds;
        this.enabled = enabled;
        this.password = password;
        this.phone = phone;
        this.sex = sex;
    }

}