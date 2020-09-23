export default class LoginParamVo{
    public username:string;
    public password:string;
    public captcha:string;
    constructor({
        username,
        password,
        captcha=''
    }:any){
        this.username=username;
        this.password=password;
        this.captcha=captcha;
    }
}