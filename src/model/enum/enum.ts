import { apiUrl } from '../../config/config'

/*
 * @Author: your name
 * @Date: 2020-08-05 20:45:55
 * @LastEditTime: 2020-09-04 11:05:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\enum\enum.ts
 */
enum MarkerTypeEnum {
    PROJECT = "Project",
    BIAOMIAN = "BiaoMian",
    CEXIE = "CeXie"
}
enum DeviceIdEnum {
    BIAOMIAN = "402881e57303eb7f017303f75f130001",
    CEXIE = "402881e57303eb7f017303f75f130002",
    JIANGYU = "402881e57303eb7f017303f75f130003",
    ZHIXINZHUANG = "402881e57303eb7f017303f75f130016",
    SHUIWEI = "402881e57303eb7f017303f75f130015",
    SHUIYA = "402881e57303eb7f017303f75f130005",
    LIEFENG = "402881e57303eb7f017303f75f130006",
}
enum UsableDeviceIdEnum {
    BIAOMIAN = "402881e57303eb7f017303f75f130001",
    CEXIE = "402881e57303eb7f017303f75f130002",
    JIANGYU = "402881e57303eb7f017303f75f130003",
    ZHIXINZHUANG = "402881e57303eb7f017303f75f130016",
    SHUIWEI = "402881e57303eb7f017303f75f130015",
    SHUIYA = "402881e57303eb7f017303f75f130005",
}

enum DataPathEnum {
    "402881e57303eb7f017303f75f130001" = "/index/data/gnss",
    "402881e57303eb7f017303f75f130002" = "/index/data/flexitilt",
    "402881e57303eb7f017303f75f130003" = "/index/data/raingauge",
    "402881e57303eb7f017303f75f130016" = "/index/data/intellectualcorepile",
    "402881e57303eb7f017303f75f130015" = "/index/data/waterlevel",
    "402881e57303eb7f017303f75f130005" = "/index/data/waterpressure",
}

enum DataTypeEnum{
    WEIYILISHI = "1",
    WEIYISUDU = "2",
    WEIYISHILIANG = "3",
    WEIYIANDRAINS = "4",
    WEIYISUDUANDRAINS = "5",
    WEIYIANDWATERLEVEL = "6",
    WEIYIJIASUDU = "7",
    WEIYI_TOTAL = "8",

    SHENDUWEIYI = "6",
    JIEDIANWEIYILISHI = "4",
    ROUXING_TOTAL = "5",
    ROUXING_SHENDUWEIYI_X = "1",
    ROUXING_SHENDUWEIYI_Y = "2",
    ROUXING_SHENDUWEIYI_XY = "3",


    JIASUDULISHI = "1",
    QINGXIEJIAOLISHI = "2",
    XIANGDUIBIANXINGLISHI = "3",

    SHUIWEILISHI = "1",
    SHUIYALISHI = "1",

    RAINS = "1",

}


export { MarkerTypeEnum,DeviceIdEnum,UsableDeviceIdEnum,DataTypeEnum,DataPathEnum }