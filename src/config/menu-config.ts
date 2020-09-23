import MenuVo from "../model/MenuVo"

const menuList = [
    {
        parentKey: null,
        functionStr:"index",
        key: "/index/home",
        name: "主页",
        icon: "home",
        path: "/index/home",
        children: null
    },
    {
        parentKey: null,
        functionStr:"monitor",
        key: "/index/monitor",
        name: "实时检测",
        icon: "fund",
        path: "/index/monitor",
        children: [
            {
                parentKey: "/index/monitor",
                functionStr:"monitor-count",
                key: "/index/monitor/count",
                name: "项目状态统计",
                icon: null,
                path: "/index/monitor/count",
                children: null
            },
            {
                parentKey: "/index/monitor",
                functionStr:"monitor-spread",
                key: "/index/monitor/spread",
                name: "监测点分布",
                icon: null,
                path: "/index/monitor/spread",
                children: null
            }
        ]
    },
    {
        parentKey: null,
        key: "/index/data",
        functionStr:"data",
        name: "数据分析",
        icon: "project",
        path: "/index/data",
        children: [
            {
                parentKey: "/index/data",
                functionStr:"data-gnss",
                key: "/index/data/gnss",
                name: "地表位移监测",
                icon: null,
                path: "/index/data/gnss",
                children: null
            },
            {
                parentKey: "/index/data",
                functionStr:"data-flexitilt",
                key: "/index/data/flexitilt",
                name: "柔性测斜仪监测",
                icon: null,
                path: "/index/data/flexitilt",
                children: null
            },
            {
                parentKey: "/index/data",
                functionStr:"data-raingauge",
                key: "/index/data/raingauge",
                name: "降雨量监测",
                icon: null,
                path: "/index/data/raingauge",
                children: null
            },
            {
                parentKey: "/index/data",
                functionStr:"data-intellectualcorepile",
                key: "/index/data/intellectualcorepile",
                name: "智芯桩监测",
                icon: null,
                path: "/index/data/intellectualcorepile",
                children: null
            },
            {
                parentKey: "/index/data",
                functionStr:"data-waterlevel",
                key: "/index/data/waterlevel",
                name: "地下水位监测",
                icon: null,
                path: "/index/data/waterlevel",
                children: null
            },
            {
                parentKey: "/index/data",
                functionStr:"data-waterpressure",
                key: "/index/data/waterpressure",
                name: "地下水压监测",
                icon: null,
                path: "/index/data/waterpressure",
                children: null
            }
        ]
    },
    {
        parentKey: null,
        key: "/index/dataManage",
        functionStr:"dataManage",
        name: "数据管理",
        icon: "project",
        path: "/index/dataManage",
        children: [
            {
                parentKey: "/index/dataManage",
                functionStr:"dataManage-gnss",
                key: "/index/dataManage/gnss",
                name: "地表位移原始数据",
                icon: null,
                path: "/index/dataManage/gnss",
                children: null
            },
            {
                parentKey: "/index/dataManage",
                functionStr:"dataManage-flexitilt",
                key: "/index/dataManage/flexitilt",
                name: "柔性测斜仪原始数据",
                icon: null,
                path: "/index/dataManage/flexitilt",
                children: null
            },
            {
                parentKey: "/index/dataManage",
                functionStr:"dataManage-raingauge",
                key: "/index/dataManage/raingauge",
                name: "降雨量原始数据",
                icon: null,
                path: "/index/dataManage/raingauge",
                children: null
            },
            {
                parentKey: "/index/dataManage",
                functionStr:"dataManage-intellectualcorepile",
                key: "/index/dataManage/intellectualcorepile",
                name: "智芯桩原始数据",
                icon: null,
                path: "/index/dataManage/intellectualcorepile",
                children: null
            },
            {
                parentKey: "/index/dataManage",
                functionStr:"dataManage-waterlevel",
                key: "/index/dataManage/waterlevel",
                name: "地下水位原始数据",
                icon: null,
                path: "/index/dataManage/waterlevel",
                children: null
            },
            {
                parentKey: "/index/dataManage",
                functionStr:"dataManage-waterpressure",
                key: "/index/dataManage/waterpressure",
                name: "地下水压原始数据",
                icon: null,
                path: "/index/dataManage/waterpressure",
                children: null
            }
        ]
    },
    {
        parentKey: null,
        functionStr:"warning",
        key: "/index/warning",
        name: "报警管理",
        icon: "alert",
        path: "/index/warning",
        children: [
            {
                parentKey: "/index/warning",
                functionStr:"warning-record",
                key: "/index/warning/record",
                name: "报警记录",
                icon: null,
                path: "/index/warning/record",
                children: null
            },
            {
                parentKey: "/index/warning",
                functionStr:"warning-setting",
                key: "/index/warning/setting",
                name: "报警参数设置",
                icon: null,
                path: "/index/warning/setting",
                children: null
            }
        ]
    },
    {
        parentKey: null,
        functionStr:"project",
        key: "/index/project",
        name: "项目管理",
        icon: "profile",
        path: "/index/project",
        children: [
            {
                parentKey: "/index/project",
                functionStr:"project-manage",
                key: "/index/project/manage",
                name: "项目管理",
                icon: null,
                path: "/index/project/manage",
                children: null
            },
            {
                parentKey: "/index/project",
                functionStr:"project-partition",
                key: "/index/project/partition",
                name: "分区管理",
                icon: null,
                path: "/index/project/partition",
                children: null
            },
            {
                parentKey: "/index/project",
                functionStr:"project-group",
                key: "/index/project/group",
                name: "分组管理",
                icon: null,
                path: "/index/project/group",
                children: null
            },
            {
                parentKey: "/index/project",
                functionStr:"project-station",
                key: "/index/project/station",
                name: "监测点管理",
                icon: null,
                path: "/index/project/station",
                children: null
            },
            {
                parentKey: "/index/project",
                functionStr:"project-device",
                key: "/index/project/device",
                name: "设备管理",
                icon: null,
                path: "/index/project/device",
                children: null
            }
        ]
    },
    {
        parentKey: null,
        functionStr:"authority",
        key: "/index/authority",
        name: "系统管理",
        icon: "setting",
        path: "/index/authority",
        children: [
            {
                parentKey: "/index/authority",
                functionStr:"authority-account",
                key: "/index/authority/account",
                name: "账号管理",
                icon: null,
                path: "/index/authority/account",
                children: null
            },
            {
                parentKey: "/index/authority",
                functionStr:"authority-role",
                key: "/index/authority/role",
                name: "角色管理",
                icon: null,
                path: "/index/authority/role",
                children: null
            }
        ]
    },
    {
        parentKey: null,
        functionStr:"user",
        key: "/index/user",
        name: "用户管理",
        icon: "idcard",
        path: "/index/user",
        children: [
            {
                parentKey: "/index/user",
                functionStr:"user-password",
                key: "/index/user/password",
                name: "修改密码",
                icon: null,
                path: "/index/user/password",
                children: null
            }
        ]
    }
]

export default class MenuConfig {
    public getMenu = ():Array<MenuVo> => {
        let menus = new Array<MenuVo>();
        menuList.forEach(menu=>{
            menus.push(new MenuVo({...menu}));
        })
        return menus;
    }
    public getMenuByFun = (functionList:Array<String>):Array<MenuVo> => {
        let menus = new Array<MenuVo>();
        menuList.forEach(menu=>{
            if(functionList.some(f=>f===menu.functionStr)){
                let children = [];
                if(menu.children){
                    menu.children.forEach(cld=>{
                        if(functionList.some(f=>f===cld.functionStr)){
                            children.push(new MenuVo({...cld}));
                        }
                    })
                }
                if(children.length === 0){
                    children = null;
                }
                menus.push(new MenuVo({...menu,children}));
            }
        })
        return menus;
    }
}