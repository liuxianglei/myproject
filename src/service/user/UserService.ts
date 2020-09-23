import { changePassword,resetPassword,getSmsCode,getProjectsByUser } from '../../api/user/user-api';

export default class UserService{
    changePassword = async (userName:string,oldPassword:string,newPassword:string):Promise<any> =>{
        let res = await changePassword(userName,oldPassword,newPassword);
        return res;
    }
    resetPassword = async (userName:string,phone:string,code:string,newPassword:string):Promise<any> =>{
        let res = await resetPassword(userName,phone,code,newPassword);
        return res;
    }
    getSmsCode = async (userName:string,phone:string):Promise<any> =>{
        let res = await getSmsCode(userName,phone);
        return res;
    }
    getProjectsByUser = async (userId:string):Promise<any> =>{
        let res = await getProjectsByUser(userId);
        return res;
    }
}