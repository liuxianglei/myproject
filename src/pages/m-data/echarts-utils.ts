import SurfaceDisplacementAnalysisModel from '../../model/data/SurfaceDisplacementAnalysisModel';
import { convert } from '../../config/utils';
import RainGaugeAnalysisModel from '../../model/data/RainGaugeAnalysisModel';
import IntellectualCorePileModel from '../../model/data/IntellectualCorePileModel';
import WaterLevelDataModel from '../../model/data/WaterLevelDataModel';
import WaterPressureDataModel from '../../model/data/WaterPressureDataModel';
import FlexiTiltAnalysisModel from '../../model/data/FlexiTiltAnalysisModel';
import PointModel from '../../model/data/PointModel';
import RealtimeMonitoringModel from '../../model/monitor/RealtimeMonitoringModel';
import SuperviseDataModel from '../../model/data/SuperviseDataModel';
import RainGaugeAnalysisRetModel from '../../model/data/RainGaugeAnalysisRetModel';
import WaterLevelDataRetModel from '../../model/data/WaterLevelDataRetModel';
import WaterPressureDataRetModel from '../../model/data/WaterPressureDataRetModel';
import IntellectualCorePileRetModel from '../../model/data/IntellectualCorePileRetModel';
import { defaultConfigValue } from '../../config/config';
import PointDataModel from '../../model/data/PointDataModel';

 

const echarts = require('echarts');

interface iSeriesData{
    time:string,
    value:number
}

interface iLegendField{
    legend:string,
    field:string
}

const getGnssDateToDay=(seriesDatas:Array<any>)=>{
    let timeList = [];
    console.log("getGnssDateToDay seriesDatas:",seriesDatas)
    seriesDatas.forEach(e=>{
        if(e && e.data && e.data.length){
            let data = e.data as Array<any>;
            data.forEach(a=>{
                if(a && a.length){
                    let dateStrs:string = a[0];
                    if(dateStrs){
                        dateStrs=dateStrs.replace(new RegExp(/-/gm) ,"/"); 
                        let dateStr = convert(new Date(dateStrs),"yyyy-MM-dd");
                        if(!timeList.includes(dateStr)){
                            timeList.push(dateStr);
                        }       
                    }
                }
            })
        }
    })
    console.log("getGnssDateToDay timeList:",timeList)
    return timeList;
}

const getGnssSeriesDatas=(data:SuperviseDataModel,names:Array<iLegendField>,time:string)=>{
    let dataList = [];
    console.log("getGnssSeriesDatas params:",data,names,time);
    let {pointModels} = data;
    if(!pointModels || !pointModels.length || !names || !names.length){
        return dataList;
    }
    pointModels.forEach(pointModel=>{
        let {displacementList} = pointModel;
        if(displacementList && displacementList.length){
            names.forEach(name=>{
                let datas = getGnssSeriesData(displacementList,name.field,time);
                dataList.push({
                    name: name.legend,
                    type: 'line',
                    data: datas
                })
            })
        }
    })
    console.log("getGnssSeriesDatas dataList:",dataList)
    return dataList;
}

const getGnssSeriesData=(displacementList:Array<Array<SurfaceDisplacementAnalysisModel>>,name:string,time:string):Array<iSeriesData>=>{
    let dataList = [];
    if(!displacementList || !displacementList.length){
        return dataList;
    }
    console.log("getGnssSeriesData params",displacementList,name,time)
    displacementList.forEach(displacement=>{
        if(displacement && displacement.length){
            displacement.forEach(childDisplacement=>{
                if(childDisplacement){
                    console.log("getGnssSeriesData time ",childDisplacement[time]);
                    let timestr = childDisplacement[time];
                    console.log("getGnssSeriesData timestr ",timestr);
                    if(timestr){
                        dataList.push([convert(new Date(timestr),"yyyy-MM-dd hh:mm:ss"),childDisplacement[name]+""]);
                    }
                }
            })
            if(displacement.length > 1){
                dataList.push(null);
            }
        }
    })
    console.log("getGnssSeriesData dataList:",dataList)
    return dataList;
}

const getGnssWeiyishiliangSeriesDatas=(data:SuperviseDataModel,field1:string,field2:string)=>{
    let dataList = [];
    console.log("getGnssWeiyishiliangSeriesDatas params:",data,field1,field2);
    let {pointModels} = data;
    if(!pointModels || !pointModels.length || !field1 || !field2){
        return dataList;
    }
    pointModels.forEach(pointModel=>{
        let {displacementList} = pointModel;
        if(displacementList && displacementList.length){
            let datas = getGnssWeiyishiliangSeriesData(displacementList,field1,field2);
            let links = [];
            if(datas && datas.length){
                datas.forEach((e,i)=>{
                    if(e && datas[i+1] ){
                        if(e && datas[i+1]){
                            links.push( {
                                source: i,
                                target: i + 1
                            });
                        }
                    }
                })
                if(links && links.length){
                    links.push({
                        source: links[links.length-1].target,
                        target: links[0].source,
                        lineStyle: {
                            color: '#0e5d5c'
                        }
                    });
                }
            }
            datas = datas.filter(e=>e !=null);
            dataList.push({
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 8,
                label: {
                    show: false
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [2, 8],
                data: datas,
                links: links,
                lineStyle: {
                    color: '#dd6866',
                    width:2
                }
            })
        }
    })
    console.log("getGnssWeiyishiliangSeriesDatas dataList:",dataList)
    return dataList;
}

const getGnssWeiyishiliangSeriesData=(displacementList:Array<Array<SurfaceDisplacementAnalysisModel>>,field1:string,field2:string):Array<iSeriesData>=>{
    let dataList = [];
    if(!displacementList || !displacementList.length){
        return dataList;
    }
    console.log("getGnssWeiyishiliangSeriesData params",displacementList,field1,field2)
    displacementList.forEach(displacement=>{
        if(displacement && displacement.length){
            displacement.forEach(childDisplacement=>{
                if(childDisplacement){
                    dataList.push([childDisplacement[field1],childDisplacement[field2]]);
                }
            })
            if(displacement.length > 1){
                dataList.push(null);
            }
        }
    })
    console.log("getGnssWeiyishiliangSeriesData dataList:",dataList)
    return dataList;
}

const getMultipleLegends=(dataList:Array<any>)=>{
    if(!dataList || !dataList.length){
        return [];
    }
    let resultList = [];
    dataList.forEach(e=>{
        resultList.push(e.stationName)
    })
    console.log("resultList:",resultList)
    return resultList;
}

const getMultipleDateToDay=(dataList:Array<any>,timeFieldName:string,modelsName:string)=>{
    if(!dataList || !dataList.length){
        return [];
    }
    let resultList = [];
    dataList.forEach(e=>{
        let models = e[modelsName];
        if(models && models.length){
            models.forEach(model=>{
                if(model){
                    let dateStrs = model[timeFieldName];
                    if(dateStrs){
                        let dateStr = convert(new Date(dateStrs),"yyyy-MM-dd");
                        if(!resultList.includes(dateStr)){
                            resultList.push(dateStr);
                        }
                    }
                }
            })
        }
    })
    console.log("getMultipleDateToDay resultList:",resultList)
    return resultList;
}

const getMultipleSeriesData=(dataList:Array<any>,timeFieldName:string,modelsName:string,dataField:string)=>{
    if(!dataList || !dataList.length){
        return [];
    }
    let resultList = [];
    dataList.forEach(data=>{
        let models = data[modelsName];
        if(models && models.length){
            let seriesDatas = models.map(e=>{
                if(e){
                    let timestr = e[timeFieldName];
                    if(timestr){
                        let value = e[dataField];
                        // timestr=timestr.replace(new RegExp(/-/gm) ,"/");
                        return [convert(new Date(timestr),"yyyy-MM-dd hh:mm:ss"),value]
                    }
                }
            })
            resultList.push({
                name: data.stationName,
                type: 'line',
                data: seriesDatas
            })
        }
    })
    console.log("resultList:",resultList)
    return resultList;
}

const getMultipleRainSeriesData=(dataList:Array<any>,timeFieldName:string,modelsName:string,dataField:string)=>{
    if(!dataList || !dataList.length){
        return [];
    }
    let resultList = [];
    dataList.forEach(data=>{
        let models = data[modelsName];
        if(models && models.length){
            let seriesDatas = models.map(e=>{
                if(e){
                    let timestr = e[timeFieldName];
                    if(timestr){
                        // timestr=timestr.replace(new RegExp(/-/gm) ,"/");
                        let value = e[dataField];
                        return [convert(new Date(timestr),"yyyy-MM-dd hh:mm:ss"),value]
                    }
                }
            })
            resultList.push({
                name: data.stationName,
                type: 'bar',
                data: seriesDatas,
                barMaxWidth:defaultConfigValue.barMaxWidth
            })
        }
    })
    console.log("resultList:",resultList)
    return resultList;
}

const getMultipleIcpSeriesData=(dataList:Array<IntellectualCorePileRetModel>,dataFields:Array<iLegendField>)=>{
    if(!dataList || !dataList.length){
        return [];
    }
    let resultList = [];
    dataList.forEach(data=>{
        let {corePileModels} = data;
        if(dataFields && dataFields.length){
            dataFields.forEach(field=>{
                if(corePileModels && corePileModels.length){
                    let seriesDatas = corePileModels.map(e=>
                        [convert(new Date(e.collectTime),"yyyy-MM-dd hh:mm:ss"),e[field.field]]
                    )
                    resultList.push({
                        name: field.legend,
                        type: 'line',
                        data: seriesDatas
                    })
                }
            })
        }
    })
    console.log("resultList:",resultList)
    return resultList;
}

const getDateToDay=(dataList:Array<any>,time:string)=>{
    let dateList = [];
    dataList.forEach(e=>{
        let timestr = e[time];
        if(timestr){
            // timestr=timestr.replace(new RegExp(/-/gm) ,"/");
            let dateStr = convert(new Date(timestr),"yyyy-MM-dd");
            if(!dateList.includes(dateStr)){
                dateList.push(dateStr);
            }
        }
    })
    console.log("dateList:",dateList)
    return dateList;
}

const getSeriesData=(dataList:Array<any>,name:string,time:string)=>{
    if(!dataList || !dataList.length){
        return [];
    }
    let datalist = dataList.map(e=>{
            if(e){
                let timestr = e[time];
                if(timestr){
                    // timestr=timestr.replace(new RegExp(/-/gm) ,"/");
                    return [convert(new Date(timestr),"yyyy-MM-dd hh:mm:ss"),e[name]]
                }
            }
        })
        console.log("datalist:",datalist)
    return datalist;
}

const getFtaXOptionY=(data:FlexiTiltAnalysisModel)=>{
    let yList = [] as Array<string>;
    let {pointList} = data;
    if(pointList && pointList.length){
        yList = pointList.map(e=>e.pointName);
    }
    if(yList && yList.length && yList.length >= 2){
        let lastOneStr = yList[0];
        let lastSecondStr = yList[1];
        let lastOne = Math.abs(Number.parseFloat(lastOneStr.substring(0,lastOneStr.length-1)));
        let lastSecond = Math.abs(Number.parseFloat(lastSecondStr.substring(0,lastSecondStr.length-1)));
        yList.unshift(-(lastOne+(lastOne - lastSecond))+".0m");
    }
    console.log("getFtaXOptionY yList:",yList);
    return yList;
}

const getFtaXOptionLegend=(data:FlexiTiltAnalysisModel,field:string)=>{
    let legends = [];
    if(data && data.pointList && data.pointList.length && field){
        let pointList:Array<PointModel> = data.pointList[0][field];
        if(pointList && pointList.length){
            legends = pointList.map(e=>convert(new Date(e.dataDate),"yyyy-MM-dd hh:mm:ss"));
        }

    }
    console.log("legends:",legends)
    return legends;
}

const getFta3DData=(data:FlexiTiltAnalysisModel,field:string)=>{
    let dataList = [];
    console.log("getFta3DData:",data)
    if(field && data){
        let datas3D = data[field];
        if(datas3D && datas3D.length){
            datas3D.forEach(e=>{
                dataList.push([e.x,e.y,e.z]);
            })
        }
    }
    console.log("dataList:",dataList);
    return dataList;
}

const getFtaWeiyilishiData=(data:FlexiTiltAnalysisModel,pointName:string,field:string)=>{
    let dataList = [];
    if(data && data.pointList && data.pointList.length && pointName && field){
        let pointDataModel = data.pointList.find(e=>e.pointName === pointName);
        let pointList = pointDataModel[field] as Array<PointModel>;
        if(pointList && pointList.length){
            pointList.forEach(point=>{
                dataList.push([point.dataDate,point.dataValue]);
            })
        }
    }
    return dataList;
}

const getFlexSeriesData=(data:FlexiTiltAnalysisModel,field:string)=>{
    let map = new Map<string,any>();
    let seriesDataList = [];
    let {pointList} = data;
    if(pointList && pointList.length){
        pointList.forEach(e=>{
            let pointModelList = e[field] as Array<PointModel>;
            if(pointModelList && pointModelList.length){
                pointModelList.forEach(e=>{
                    let obj = map.get(convert(new Date(e.dataDate),"yyyy-MM-dd hh:mm:ss"));
                    if(obj){
                        obj.data.push(e.dataValue);
                    }else{
                        let timeKey =  convert(new Date(e.dataDate),"yyyy-MM-dd hh:mm:ss");
                        let newObj = {
                            name: timeKey,
                            type: 'line',
                            // smooth: true,
                            lineStyle: {
                                width: 1,
                                // shadowColor: 'rgba(0,0,0,0.4)',
                                // shadowBlur: 10,
                                // shadowOffsetY: 10
                            },
                            data:[null,e.dataValue]
                        };
                        map.set(timeKey,newObj);
                    }
                })
            }
        })
    }
    if(map && map.size){
        map.forEach((value,key)=>{
            seriesDataList.push(value);
        })
        // seriesDataList.unshift(null);
        console.log("getFlexSeriesData seriesDataList:",seriesDataList)
        return seriesDataList;
    } 
}

const getFtaShiliangSeriesData=(data:PointDataModel):Array<any>=>{
    let datas = [];
    if(data && data.originalX && data.originalX.length && data.originalY && data.originalY.length){
        let {originalX,originalY} = data;
        originalX.forEach(e=>{
            let yValue = originalY.find(f=>f.dataDate === e.dataDate);
            datas.push([e.dataValue,yValue.dataValue]);
        })
    }   
    return datas;
}

const getFtaShiliangSeriesDatas=(data:PointDataModel)=>{
    let dataList = [];
        console.log("getFtaShiliangSeriesDatas params:",data);
        let {originalX,originalY} = data;
        if(!originalX || !originalX.length || !originalY || !originalY.length){
            return dataList;
        }
    
        let datas = getFtaShiliangSeriesData(data);
        let links = [];
        if(datas && datas.length){
            datas.forEach((e,i)=>{
                if(e && datas[i+1] ){
                    if(e && datas[i+1]){
                        links.push( {
                            source: i,
                            target: i + 1
                        });
                    }
                }
            })
            if(links && links.length){
                links.push({
                    source: links[links.length-1].target,
                    target: links[0].source,
                    lineStyle: {
                        color: '#0e5d5c'
                    }
                });
            }
        }
        datas = datas.filter(e=>e !=null);
        dataList.push({
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            symbolSize: 8,
            label: {
                show: false
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 8],
            data: datas,
            links: links,
            lineStyle: {
                color: '#dd6866',
                width:2
            }
        })
        console.log("getFtaShiliangSeriesDatas dataList:",dataList)
        return dataList;

}

const getMonitorProjectWarning=(realtimeMonitoringModel:RealtimeMonitoringModel)=>{
    if(!realtimeMonitoringModel){
        return 0;
    }
    if(realtimeMonitoringModel.redWarningNums){
        return 87.5;
    }else if(realtimeMonitoringModel.orangeWarningNums){
        return 62.5;
    }else if(realtimeMonitoringModel.yellowWarningNums){
        return 37.5;
    }else if(realtimeMonitoringModel.normalNums){
        return 12.5;
    }else{
        return 0;
    }
}


export const getGnssWeiyilishiOption=(data:SuperviseDataModel)=>{
    let legend = ["∆X", "∆Y","∆|XY|","∆H","∑X","∑Y","∑H","∑|XY|"];
    let legendFields = [{legend:"∆X",field:"x"},{legend:"∆Y",field:"y"},{legend:"∆|XY|",field:"lxy"},{legend:"∆H",field:"h"},
        {legend:"∑X",field:"sx"},{legend:"∑Y",field:"sy"},{legend:"∑H",field:"sh"},{legend:"∑|XY|",field:"sxy"}
    ]
    let seriesDatas = getGnssSeriesDatas(data,legendFields,"collectDataTime");
    let timeList = getGnssDateToDay(seriesDatas);
    let option1 = {
        title: {
            text: '位移历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {
                }
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'inside',
                realtime: true,
                // start: 65,
                // end: 85
            }
        ],
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList
        },
        yAxis: {
            type: 'value',
            name:'(mm)',
            boundaryGap: [0, '100%'],
        },
        series: seriesDatas
    };
    console.log("getGnssWeiyilishiOption:",option1)
    return option1;
}
export const getGnssWeiyisudulishiOption=(data:SuperviseDataModel)=>{
    let legend = ['Vx',"Vy",'Vh','Vxy'];
    let legendFields = [{legend:"Vx",field:"vx"},{legend:"Vy",field:"vy"},{legend:"Vh",field:"vh"},{legend:"Vxy",field:"vxy"}]
    let seriesDatas = getGnssSeriesDatas(data,legendFields,"collectDataTime");
    let timeList = getGnssDateToDay(seriesDatas);
    let option3 = {
        title: {
            text: '位移速度历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'inside',
                realtime: true,
                // start: 65,
                // end: 85
            }
        ],
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList
        },
        yAxis: {
            type: 'value',
            name:'(mm/d)',
            boundaryGap: [0, '100%'],
        },
        series: seriesDatas
    };
    
    return option3;
}
export const getGnssWeiyijiasudulishiOption=(data:SuperviseDataModel)=>{
    let legend = ['Ax',"Ay",'Ah','Axy'];
    let legendFields = [{legend:"Ax",field:"accX"},{legend:"Ay",field:"accY"},{legend:"Ah",field:"accH"},{legend:"Axy",field:"accXY"}]
    let seriesDatas = getGnssSeriesDatas(data,legendFields,"collectDataTime");
    let timeList = getGnssDateToDay(seriesDatas);
    let option2 = {
        title: {
            text: '位移加速度历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'inside',
                realtime: true,
                // start: 65,
                // end: 85
            }
        ],
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList
        },
        yAxis: {
            type: 'value',
            name:'(mm/d²)',
            boundaryGap: [0, '100%'],
        },
        series:seriesDatas
    };
    
    return option2;
}

// 位移矢量趋势图
export const getGnssWeiyishiliangOption=(data:SuperviseDataModel)=>{
    let seriesDatas = getGnssWeiyishiliangSeriesDatas(data,"originalX","originalY");
    let {pointModels} = data;
    let subText = pointModels&& pointModels.length?"方向角:"+pointModels[0].azimuth+"°  位移矢量值："+pointModels[0].vectorValue+" mm":"";
    let option4 = {
        title: {
            text: '位移矢量轨迹图',
            subtext: subText,
            subtextStyle:{
                textAlign:'center'
            }
        },
        legend: {
            data: []
        },
        tooltip: {},
        grid: {
            left: '3%',
            right: '5%',
            top:'13%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'slider',
                xAxisIndex: 0,
                // filterMode: 'empty'
            },
            {
                type: 'inside',
                realtime: true,
                xAxisIndex:0,
                // start: 65,
                // end: 85
            },
            {
                type: 'slider',
                yAxisIndex: 0,
                // filterMode: 'empty'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                // filterMode: 'empty'
            }
        ],
        xAxis: {
            name:"Y(m)",
            type : 'category',
            boundaryGap : true,
            // data : axisData
            splitLine:{
                show:true
            },
            nameGap:3
        },
        yAxis: {
            name:"X(m)",
            type : 'category',
            splitLine:{
                show:true
            },
            nameGap:3
        },
        series:seriesDatas
    };
    console.log("getGnssWeiyishiliangOption:",option4)
    return option4;
}

// 位移与降雨量历时曲线
export const getGnssWeiyiAndRainsOption=(data:SuperviseDataModel)=>{
    let legendFields = [{legend:"∆X",field:"x"},{legend:"∆Y",field:"y"},{legend:"∆|XY|",field:"lxy"},{legend:"∆H",field:"h"},
        {legend:"∑X",field:"sx"},{legend:"∑Y",field:"sy"},{legend:"∑H",field:"sh"},{legend:"∑|XY|",field:"sxy"}
    ]
    let {rainList} = data;
    let seriesDatas = getGnssSeriesDatas(data,legendFields,"collectDataTime");
    let rainsDatas = getSeriesData(rainList?rainList:[],"rains","time");

    let rainsData = {
        name: '降雨量数据',
        type: 'bar',
        stack: '总量',
        yAxisIndex: 1,
        data: rainsDatas,
        barMaxWidth:defaultConfigValue.barMaxWidth
    }
    seriesDatas.push(rainsData);

    let timeList = getGnssDateToDay(seriesDatas);
    let rainsTimeList = getDateToDay(rainList?rainList:[],"time");
    rainsTimeList.forEach(time=>{
        if(!timeList.includes(time)){
            timeList.push(time);
        }
    })
    let option5 = {
        title: {
            text: '位移与降雨量历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['∆X', '∆Y','∆|XY|','∆H',"∑X","∑Y","∑H","∑|XY|", '降雨量数据']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'inside',
                realtime: true,
                // start: 65,
                // end: 85
            }
        ],
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList,
            splitLine:{
                    show:false
                } 
        },
        yAxis: [
            {
                name:'位移(mm)',
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine:{
                    show:true
                } 
            },
            {
                name:'降雨量(mm)',
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine:{
                    show:false
                } 
            }
        ],
        series: seriesDatas
    };
    return option5;
}
//位移速度降雨量趋势图
export const getGnssWeiyisuduAndRainsOption=(data:SuperviseDataModel)=>{
    let legendFields = [{legend:"Vx",field:"vx"},{legend:"Vy",field:"vy"},{legend:"Vh",field:"vh"},{legend:"Vxy",field:"vxy"}]
    let {rainList} = data;
    let seriesDatas = getGnssSeriesDatas(data,legendFields,"collectDataTime");
    let rainsDatas = getSeriesData(rainList?rainList:[],"rains","time");

    let rainsData = {
        name: '降雨量数据',
        type: 'bar',
        stack: '总量',
        yAxisIndex: 1,
        data: rainsDatas,
        barMaxWidth:defaultConfigValue.barMaxWidth
    }
    seriesDatas.push(rainsData);

    let timeList = getGnssDateToDay(seriesDatas);
    let rainsTimeList = getDateToDay(rainList?rainList:[],"time");
    rainsTimeList.forEach(time=>{
        if(!timeList.includes(time)){
            timeList.push(time);
        }
    })
    let option6 = {
        title: {
            text: '位移速度降雨量趋势图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Vx',"Vy",'Vh','Vxy','降雨量数据']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'inside',
                realtime: true,
                // start: 65,
                // end: 85
            }
        ],
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList,
            splitLine:{
                    show:false
                } 
        },
        yAxis: [
            {
                name:'位移速度(mm/d)',
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine:{
                    show:true
                } 
            },
            {
                name:'降雨量(mm)',
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine:{
                    show:false
                } 
            }
        ],
        series: seriesDatas
    };
    return option6;
}
//位移与地下水位历时曲线
export const getGnssWeiyiAndWaterLevelOption=(data:SuperviseDataModel)=>{
    let legendFields = [{legend:"∆X",field:"x"},{legend:"∆Y",field:"y"},{legend:"∆|XY|",field:"lxy"},{legend:"∆H",field:"h"},
        {legend:"∑X",field:"sx"},{legend:"∑Y",field:"sy"},{legend:"∑H",field:"sh"},{legend:"∑|XY|",field:"sxy"}
    ]
    let {levelList} = data;
    let seriesDatas = getGnssSeriesDatas(data,legendFields,"collectDataTime");
    let waterLevelDatas = getSeriesData(levelList?levelList:[],"waterLevel","collectDate");

    let waterLevelData = {
        name: '水位',
        type: 'line',
        data: getSeriesData(levelList,"waterLevel","collectDate")
    }
    seriesDatas.push(waterLevelData);

    let timeList = getGnssDateToDay(seriesDatas);
    let waterLevelTimeList = getDateToDay(waterLevelDatas?waterLevelDatas:[],"collectDate");
    waterLevelTimeList.forEach(time=>{
        if(!timeList.includes(time)){
            timeList.push(time);
        }
    })
    let option7 = {
        title: {
            text: '位移与地下水位历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['∆X', '∆Y','∆|XY|','∆H',"∑X","∑Y","∑H","∑|XY|",'水位']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'inside',
                realtime: true,
                // start: 65,
                // end: 85
            }
        ],
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList,
            splitLine:{
                    show:false
                } 
        },
        yAxis: [
            {
                name:'位移(mm)',
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine:{
                    show:true
                } 
            },
            {
                name:"水位(m)",
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine:{
                    show:false
                } 
            }
        ],
        series: seriesDatas
    };
    return option7;
}


export const getRainOption=(dataList:Array<RainGaugeAnalysisRetModel>)=>{
    let option = {
        title: {
            text: '降雨量历时统计图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: getMultipleLegends(dataList)
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: getMultipleDateToDay(dataList,"time","models")
        },
        yAxis: {
            type: 'value',
            name:'(mm)',
            boundaryGap: [0, '100%'],
        },
        series: getMultipleRainSeriesData(dataList,"time","models","rains")
    };
    
    return option;
}

export const getIcpJiasuduOption=(dataList:Array<IntellectualCorePileRetModel>)=>{
    let legendFields = [{legend:"Ax",field:"acceleratedX"},{legend:"Ay",field:"acceleratedY"}];
    let timeList = getMultipleDateToDay(dataList,"collectTime","corePileModels");
    let seriesDatas = getMultipleIcpSeriesData(dataList,legendFields);
    let option = {
        title: {
            text: '加速度历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Ax','Ay']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList
        },
        yAxis: {
            type: 'value',
            name:'(mg)',
            boundaryGap: [0, '100%'],
        },
        series: seriesDatas
    };
    
    return option;
}

export const getIcpQingxieOption=(dataList:Array<IntellectualCorePileRetModel>)=>{
    let legendFields = [{legend:"θx",field:"tiltAngleX"},{legend:"θy",field:"tiltAngleY"},{legend:"θxy",field:"tiltAngleXY"}];
    let timeList = getMultipleDateToDay(dataList,"collectTime","corePileModels");
    let seriesDatas = getMultipleIcpSeriesData(dataList,legendFields);
    let option = {
        title: {
            text: '倾斜角历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['θx','θy','θxy']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList
        },
        yAxis: {
            type: 'value',
            name:'(°)',
            boundaryGap: [0, '100%'],
        },
        series: seriesDatas
    };
    
    return option;
}

export const getIcpBianxingOption=(dataList:Array<IntellectualCorePileRetModel>)=>{
    let legendFields = [{legend:"U",field:"deformation"}];
    let timeList = getMultipleDateToDay(dataList,"collectTime","corePileModels");
    let seriesDatas = getMultipleIcpSeriesData(dataList,legendFields);
    let option = {
        title: {
            text: '相对变形历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['U']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: timeList
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
        },
        series: seriesDatas
    };
    
    return option;
}

export const getWaterLevelOption=(dataList:Array<WaterLevelDataRetModel>)=>{
    let option = {
        title: {
            text: '水位历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:  getMultipleLegends(dataList)
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: getMultipleDateToDay(dataList,"collectDate","waterLevel")
        },
        yAxis: {
            type: 'value',
            name:'(m)',
            boundaryGap: [0, '100%'],
        },
        series:  getMultipleSeriesData(dataList,"collectDate","waterLevel","waterLevel")
        
    };
    
    return option;
}

export const getWaterPresureOption=(dataList:Array<WaterPressureDataRetModel>)=>{
    let option = {
        title: {
            text: '水压历时曲线'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: getMultipleLegends(dataList)
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: getMultipleDateToDay(dataList,"collectDate","waterPressure")
        },
        yAxis: {
            type: 'value',
            name:'(kpa)',
            boundaryGap: [0, '100%'],
        },
        series: getMultipleSeriesData(dataList,"collectDate","waterPressure","waterPressure")
    };
    
    return option;
}

const getFtaTitleByFieldName=(fieldName:string)=>{
    switch(fieldName){
        case "ax":
            return "X向深度位移(mm)";
        case "ay":
            return "Y向深度位移(mm)";
        case "axy":
            return "XY向深度位移(mm)";
        default:
            return "X向深度位移(mm)";
    }
}

const getXValuesBySeriesData=(seriesDatas:Array<any>)=>{
    console.log("getXValuesBySeriesData seriesDatas:",seriesDatas)
    if(seriesDatas && seriesDatas.length){
        let xValues = [] as Array<number>;
        seriesDatas.forEach(data=>{
            if(data && data.data){
                xValues = xValues.concat(data.data);
            }
        })
        console.log("getXValuesBySeriesData xValues:",xValues)
        let maxValue = Math.abs(Math.max(...xValues));
        let minValue = Math.abs(Math.min(...xValues));
        console.log("getXValuesBySeriesData:",maxValue,minValue);
        return maxValue > minValue?maxValue:minValue;
    }
}

export const getFtaOption=(data:FlexiTiltAnalysisModel,fieldName1:string,fieldName2:string)=>{
    let seriesDatas = getFlexSeriesData(data,fieldName1);
    let maxXValue1 = getXValuesBySeriesData(seriesDatas);

    let seriesDatas2 = getFlexSeriesData(data,fieldName2);
    let maxXValue2 = getXValuesBySeriesData(seriesDatas2);

    let maxXValue = maxXValue1 > maxXValue2?maxXValue1:maxXValue2;
    if(maxXValue){
        maxXValue = Math.ceil(maxXValue + maxXValue * 0.3);
    }
    console.log("getFtaOption:",maxXValue);
    let option = {
        title: {
            text: getFtaTitleByFieldName(fieldName1)
        },
        legend: {
            // data: getFtaXOptionLegend(data,fieldName)
            show:false
        },
        tooltip: {
            trigger: 'axis',
            // formatter: '{b}km :<br/> {a}°C'
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '3%',
            containLabel: true
        },
        dataZoom: [
            {
                show: false,
                realtime: true,
                // start: 65,
                // end: 85
            },
            // {
            //     type: 'slider',
            //     yAxisIndex: 0,
            //     // filterMode: 'empty'
            // },
            {
                type: 'inside',
                yAxisIndex: 0,
                // filterMode: 'empty'
            }
        ],
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            name:'位移(mm)',
            position:"top",
            max:maxXValue?maxXValue:100,
            min:maxXValue?-maxXValue:-100
        },
        yAxis: {
            name:"深度(m)",
            type: 'category',
            splitLine:{
                show:true
            },
            axisLine: {onZero: true},
            axisLabel: {
                formatter: '{value}'
            },
            boundaryGap: false,
            data: getFtaXOptionY(data),
            nameGap:25
        },
        series:seriesDatas
    };
    return option;
}

export const getFtaDegreeOption=(degree:number)=>{
    console.log("degree:",degree)
    let option = {
        title: {
            // text:"X方向与变形方向夹角",
            // textAlign:"center"
        },
        tooltip: {
            formatter: "{a} : {c}"
        },
        toolbox: {
    
        },
        series: [{
            name: 'xxx',
            type: 'gauge',
            min: 0,
            max: 360,
            startAngle: 90,
            endAngle: 449.99999,
            radius: '80%',
            splitNumber: 12,
            clockwise: false,
            animation: false,
            title: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 15,
                fontStyle: 'italic',
                color:'white'
            },
            detail: {
                formatter: function(value){
                    console.log("getFtaDegreeOption value:",value);
                    return  value+'度';
                },
                fontSize:17,
                textStyle: {
                    color: '#7DAE40'
                }
            },
            data: [{
                value: degree?degree:0,
                name:"方位角",
                itemStyle:{
                    color:"#7DAE40"
                }
            }],
            axisLine: {
                lineStyle: {
                    color: [
                        [0, '#177ddc'],
                        [1, '#177ddc']
                    ],
                    width: 5
                }
            },
            splitLine: {
                length: 10,
                lineStyle: {
                    color: '#177ddc',
                    width: 2
                }
            },
            itemStyle: {
                normal: {
                    color: '#177DDC',
                    width: 2
                }
            }
        }]
    };
    return option;
}
export const getFtaWeiyilishiOption=(data:FlexiTiltAnalysisModel,pointName:string,number:number,fieldName1:string,fieldName2:string,ftaWeiyishiliangShow:Function)=>{

    let option = {
        title: {
            subtext: "节点："+pointName+" 序号:"+(number?number:" ")+" 变形曲线图",
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [`${fieldName1}变形量`, `${fieldName2}变形量`]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        toolbox: {
            feature: {
                myTool1: {
                    show: true,
                    title: '位移矢量轨迹',
                    icon: 'path://M640.124 767.802h64.013l0.301 191.447-64.314 0.478zM768.149 831.955l64.013-0.234v127.837h-64.013zM896.174 703.883h64.012v255.675h-64.012zM512.099 831.721h64.013v128.006l-64.013-0.169zM496.28 767.603l-45.373-45.155L631.806 541.55l135.791 135.791 135.945-135.946 45.264 45.264-181.143 181.143-135.791-135.791z',
                    onclick: function (){
                        console.log("位移矢量轨迹")
                        ftaWeiyishiliangShow.call(this);
                    }
                },
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'inside',
                realtime: true,
                // start: 65,
                // end: 85
            },
        ],
        xAxis: {
            type: 'time',
            boundaryGap: false,
            data: getFtaXOptionLegend(data,"dataDate")
        },
        yAxis: {
            name:'(mm)',
            type: 'value',
            boundaryGap: [0, '100%'],
            nameGap:15
        },
        series: [
            {
                name: `${fieldName1}变形量`,
                type: 'line',
                data: getFtaWeiyilishiData(data,pointName,fieldName1)
                
            },
           {
                name: `${fieldName2}变形量`,
                type: 'line',
                data: getFtaWeiyilishiData(data,pointName,fieldName2)
            }
        ]
    };
    
    return option;
}

export const getFta3DOption=(data:FlexiTiltAnalysisModel,field:string,titleName:string)=>{
    let option = {
        title:{
            text:titleName
        },
        tooltip: {},
        grid3D: {
            viewControl: {
                projection: 'orthographic'
            }
        },
        xAxis3D: {
            type: 'value',
            name : 'X(mm)',
			max: 800, 
			min:-800
        },
        yAxis3D: {
            type:'value',
            name : 'X(mm)',
			max: 800, 
            min:-800
        },
        zAxis3D: {
            type:'value',
            name : 'Z(m)'
        },
        series: [
            {
                type: 'line3D',
                symbolSize: 2.5,
                lineStyle: {
                    width: 10,
                },
                data:getFta3DData(data,field),
            }
        ]
    };
    return option;
}

export const getFtaShiliangOption=(data:PointDataModel)=>{
    let seriesDatas = getFtaShiliangSeriesDatas(data);
    let subText = "与X正方向夹角:"+(data.azimuth===null?"":data.azimuth)+"°  位移矢量值："+(data.vectorValue!==null?data.vectorValue:"")+" mm";
    let option = {
        title: {
            text: '位移矢量轨迹',
            subtext: subText,
        },
        legend: {
            data: []
        },
        tooltip: {},
        grid: {
            left: '5%',
            right: '5%',
            bottom: '6%',
            top:'13%',
            containLabel: true
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                // start: 65,
                // end: 85
            },
            {
                type: 'inside',
                realtime: true,
                // start: 65,
                // end: 85
            }
        ],
        xAxis: {
            name:"Y(m)",
            type : 'category',
            boundaryGap : true,
            // data : axisData
            splitLine:{
                show:true
            } 
        },
        yAxis: {
            name:"X(m)",
            type : 'category',
            splitLine:{
                show:true
            },
            nameGap:10
        },
        series:seriesDatas
    };
    console.log("getFtaShiliangOption:",option)
    return option;
}

export const getMonitorProjectOption=(realtimeMonitoringModel:RealtimeMonitoringModel)=>{
    console.log("realtimeMonitoringModel:",realtimeMonitoringModel)
    let option = {
        title: {
            text: '监测点状态统计'
        },
        dataset: {
            source: [
                [realtimeMonitoringModel.offLineNums, '掉线'],
                [realtimeMonitoringModel.redWarningNums, '红色预警'],
                [realtimeMonitoringModel.orangeWarningNums, '橙色预警'],
                [realtimeMonitoringModel.yellowWarningNums, '黄色预警'],
                [realtimeMonitoringModel.normalNums, '正常']
               
            ]
        },
        grid: {containLabel: true},
        xAxis: {name: ''},
        yAxis: {type: 'category'},
        series: [
            {
                itemStyle: {
                normal: {
                    // 定制显示（按顺序）
                    color: function(params) { 
                        var colorList = ['#C0C0C0','#C33531','#EB6142','#EFE42A','#64BD3D']; 
                        return colorList[params.dataIndex] 
                    }
                    },
                },
                label: {
                    show: true,
                    position: 'inside'
                },
                type: 'bar',
                encode: {
                    x: '',
                    y: ''
                }
            }
        ]
    };
    console.log("getMonitorProjectOption:",option)
    return option;
}


export const getMonitorProjectWarningOption=(realtimeMonitoringModel:RealtimeMonitoringModel)=>{
    let option  = {
        title: {
            text: '监测状态'
        },
        backgroundColor:'#23262E',
            series: [
              {
                name: "刻度",
                type: "gauge",
                center: ["50%", "65%"],
                radius: '90%',
                min: 0, //最小刻度
                max: 4, //最大刻度
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 1,
                    color: [[1, "rgba(0,0,0,0)"]],
                  },
                }, //仪表盘轴线
                axisLabel: {
                  show: false,
                  color: "#0ab7ff",
                  fontSize: 15,
                  distance: -50,
                  formatter: function (v) {
                    return v ;
                  },
                }, //刻度标签。
                axisTick: {
                  show: false,
                  splitNumber: 1,
                  lineStyle: {
                    color: "#0ab7ff",
                    width: 1,
                  },
                  length: -3,
                }, //刻度样式
                splitLine: {
                  show: false,///,
                  length: -5,
                  lineStyle: {
                    color: "#0ab7ff",
                  },
                }, //分隔线样式
              },
              {
                type: "gauge",
                 radius: '80%',
                center: ["50%", "65%"],
                splitNumber: 0, //刻度数量
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 50,
                    color: [
                      [0.25, "#00a65a"],
                      [0.5, "#E9C855"],
                      [0.75, "#F66543"],
                      [1, "#CD2A2A"],
                    ],
                  },
                },
                //分隔线样式。
                splitLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                pointer: {
                  show: true,
                  length: "80%",
                  width: "2%",
                },
                title: {
                  show: true,
                  offsetCenter: [0, "60%"], // x, y，单位px
                  textStyle: {
                    fontWeight: "bold",
                    color: "#0ab7ff",
                    fontSize: 30,
                  },
                },
                //仪表盘详情，用于显示数据。
                detail: {
                  show: true,
                  offsetCenter: [0, "30%"],
                  color: "#ffffff",
    
                  formatter: function (value) {
                    if (value <= 25) {
                      return "正常";
                    } else if (value <= 50) {
                      return "黄色预警";
                    } else if (value <= 75) {
                      return "橙色预警";
                    } else {
                      return "红色预警";
                    }
                  },
                  textStyle: {
                    fontSize: 30,
                  },
                },
                data: [
                  {
                    // name: "红色预警",
                    value: getMonitorProjectWarning(realtimeMonitoringModel),
                  },
                ],
              },
            ],
          };
          return option;
}

export const getMonitorProjectPieOption=(realtimeMonitoringModel:RealtimeMonitoringModel)=>{
    let isCenter = true;
    let num = 0;
    if(realtimeMonitoringModel.normalNums>0) num += 1;
    if(realtimeMonitoringModel.yellowWarningNums>0) num += 1;
    if(realtimeMonitoringModel.orangeWarningNums>0) num += 1;
    if(realtimeMonitoringModel.redWarningNums>0) num += 1;
    if(realtimeMonitoringModel.offLineNums>0) num += 1;
    if(num >1){
        isCenter = false;
    }
let option = {
        title: {
            text: '监测状态',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        legend: {
            selectedMode:false,
            orient: 'vertical',
            left: 'left',
            data: ['正常', '黄色预警', '橙色预警', '红色预警', '掉线' ]
        },
        series: [
            {
                type: 'pie',
                radius: [0, '80%'],
                hoverAnimation:false,
                minShowLabelAngle:1,
                center: ['50%', '60%'],
                label:{
                    show:true,
                    color:"black",
                    position:isCenter?"center":"inside",
                    formatter: '{b}: {d}%'
                },
                itemStyle:{
                    color:(params)=>{
                        if(params.seriesIndex === 0){
                            switch (params.dataIndex) {
                                case 0:
                                    return '#64BD3D'
                                    break;
                                case 1:
                                    return '#EFE42A'
                                    break;
                                case 2:
                                    return '#EB6142'
                                    break;
                                case 3:
                                    return '#C33531'
                                    break;
                                case 4:
                                    return '#C0C0C0'
                                    break;
                                default:
                            }
                        }
                    }
                },
                data: [
                    {value: realtimeMonitoringModel.normalNums, name: '正常'},
                    {value: realtimeMonitoringModel.yellowWarningNums, name: '黄色预警'},
                    {value: realtimeMonitoringModel.orangeWarningNums, name: '橙色预警'},
                    {value: realtimeMonitoringModel.redWarningNums, name: '红色预警'},
                    {value: realtimeMonitoringModel.offLineNums, name: '掉线'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return option;
}