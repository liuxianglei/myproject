import { pageAccount,getAccount,addAccount,editAccount,delAccount } from './../../api/account/account-api';
import PageRequest from '../../model/common/PageRequest'
import AccountVo from '../../model/authority/AccountVo';

export default class AccountService{
    pageAccount = async (realName:string,pageRequest:PageRequest):Promise<any> =>{
        let res = await pageAccount(realName,pageRequest);
        return res;
    }
    getAccount = async (userId:string):Promise<any> =>{
        let res = await getAccount(userId);
        return res;
    }

    addAccount = async (accountVo: AccountVo) =>{
        let res = addAccount(accountVo);
        return res;
    }

    editAccount = async (accountVo: AccountVo) =>{
        let res = editAccount(accountVo);
        return res;
    }
    delAccount = async (userId: string) =>{
        let res = delAccount(userId);
        return res;
    }
}