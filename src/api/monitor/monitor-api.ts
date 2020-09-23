/*
 * @Author: your name
 * @Date: 2020-08-08 16:42:29
 * @LastEditTime: 2020-08-09 19:23:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\api\monitor\monitor-api.ts
 */
import axios from "../../lib/api.request";

export const getProjectMonitor=(projectId:string)=>{
  return axios.request({
    url: "/api/v1/RealtimeMonitoring/"+projectId,
    method: "get",
    params: projectId
  });
}

export const getMonitoringPoint=(projectId:string,partitionId:string,groupId:string)=>{
    return axios.request({
      url: "/api/v1/MonitoringPoint",
      method: "get",
      params: {
          projectId,
          partitionId,
          groupId
        }
    });
  }