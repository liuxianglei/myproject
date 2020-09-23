import axios from "axios";
import { message, notification } from "antd";

class HttpRequest {
  public baseUrl: string;
  public queue: object;
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    let token = window.sessionStorage.getItem('token');
    const config = {
      baseURL: this.baseUrl,
      methods: "get",
      headers: {
        XASPSESSION:token?token:''
      }
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      message.destroy();
    }
  }
  interceptors(instance, url, noLoading = false, noMessage = false) {
    
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          if (!noLoading) {
            message.loading("加载中……", 0);
          }
        }
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        console.log(res)
        const { status,data } = res;
        switch (true) {
          case status===200: {
            let { success,message,data:_data,code } = data;
            if(code === 1){
              return data
            }
            if(success){
              if(res.config.method === "post" || res.config.method === "put"){
                notification.destroy();
                let args = {
                  message: "SUCCESS!",
                  description: message,
                  duration: 1,
                };
                !noMessage && notification.success(args);
              }
              return _data;
            }else{
              notification.destroy();
              let args = {
                message: "提示",
                description: message,
                duration: 3,
                
              };
              !noMessage && notification.error(args);
              return Promise.reject(_data);
            }
          }
          case status!==200: {
            notification.destroy();
            let args = {
              message: "提示",
              description: data.message,
              duration: 3,
              
            };
            !noMessage && notification.error(args);
            return Promise.reject({ status, message: data.message });
          }
          default:
            return data;
        }
      },
      error => {
        this.destroy(url);
        if (error.response) {
          console.log(error.response)
          let errorInfo = error.response;
          let args = {
            message: errorInfo.status,
            description: errorInfo.statusText?errorInfo.statusText:errorInfo.data.message,
            duration: 3,
          };
          !noMessage && notification.error(args);
        }else{
          notification.error({
            message: "提示",
            description:JSON.stringify(error)
          })
        }
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    console.log(options)
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(
      instance,
      options.url,
      options.noLoading,
      options.noMessage
    );
    return instance(options);
  }
}
export default HttpRequest;
