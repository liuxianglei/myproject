import { getToken,getUserInfo } from "../api/business"
import LoginParamVo from "../model/LoginParamVo";

export default class LoginService {

    async getToken(loginParam:LoginParamVo): Promise<any> {
        return await getToken(loginParam);
      }
    async getUserInfo(): Promise<any> {
        return await getUserInfo();
      }
}
