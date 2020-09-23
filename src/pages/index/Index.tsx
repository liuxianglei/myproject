/* eslint-disable jsx-a11y/anchor-is-valid */
import './index.less'
import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Dropdown } from 'antd';
import { RouteComponentProps, Switch, Route } from 'react-router-dom'
// import Loadable from '../../route'
import logo from '../../assets/images/logo.png'
import MenuConfig from "../../config/menu-config"
import MenuVo from '../../model/MenuVo';
// const Error = Loadable(() => import("../error/Error"))
// const Blocked = Loadable(() => import("../blocked/Blocked"))
// const Home = Loadable(() => import("../m-home/Home"))
// const Account = Loadable(() => import('../m-authority/account/Account'))
// const Role = Loadable(() => import('../m-authority/role/Role'))
// const GnssData = Loadable(() => import("../m-data/gnss-data"))
// const Project = Loadable(() => import("../m-project/project/Project"));
// const Group = Loadable(() => import("../m-project/group/Group"));
// const Partition = Loadable(() => import("../m-project/partition/Partition"));
// const Station = Loadable(() => import("../m-project/station/Station"));
// const Password = Loadable(() => import("../m-user/password/Password"));
// const WarningSetting = Loadable(() => import("../m-warning/Warning-setting"));
// const WarningRecord = Loadable(() => import('../m-warning/Warning-record'));
// const Gnss = Loadable(() => import('../m-dataManage/gnss/Gnss'));
// const Flexitilt = Loadable(() => import('../m-dataManage/flexitilt/Flexitilt'));
// const Intellectualcorepile = Loadable(() => import('../m-dataManage/intellectualcorepile/Intellectualcorepile'));
// const Waterpressure = Loadable(() => import('../m-dataManage/waterpressure/Waterpressure'));
// const Waterlevel = Loadable(() => import('../m-dataManage/waterlevel/Waterlevel'));
// const Raingauge = Loadable(() => import('../m-dataManage/raingauge/Raingauge'));
// const ftaData = Loadable(() => import('../m-data/fta-data'));
// const rainData = Loadable(() => import('../m-data/rain-data'));
// const icpData = Loadable(() => import('../m-data/icp-data'));
// const waterLevelData = Loadable(() => import('../m-data/water-level-data'));
// const waterPressureData = Loadable(() => import('../m-data/water-pressure-data'));
// const MonitorProjectCount = Loadable(() => import('../m-monitor/monitor-project-count'));
// const MonitorStation = Loadable(() => import('../m-monitor/monitor-station'));
import Error from "../error/Error";
import Blocked from "../blocked/Blocked";
import Home from "../m-home/Home";
import Account from '../m-authority/account/Account';
import Role from '../m-authority/role/Role';
import GnssData from "../m-data/gnss-data";
import Project from "../m-project/project/Project";
import Group from "../m-project/group/Group";
import Partition from "../m-project/partition/Partition";
import Station from "../m-project/station/Station";
import Password from "../m-user/password/Password";
import WarningSetting from "../m-warning/Warning-setting";
import WarningRecord from '../m-warning/Warning-record';
import Gnss from '../m-dataManage/gnss/Gnss';
import Flexitilt from '../m-dataManage/flexitilt/Flexitilt';
import Intellectualcorepile from '../m-dataManage/intellectualcorepile/Intellectualcorepile';
import Waterpressure from '../m-dataManage/waterpressure/Waterpressure';
import Waterlevel from '../m-dataManage/waterlevel/Waterlevel';
import Raingauge from '../m-dataManage/raingauge/Raingauge';
import ftaData from '../m-data/fta-data';
import rainData from '../m-data/rain-data';
import icpData from '../m-data/icp-data';
import waterLevelData from '../m-data/water-level-data';
import waterPressureData from '../m-data/water-pressure-data';
import MonitorProjectCount from '../m-monitor/monitor-project-count';
import MonitorStation from '../m-monitor/monitor-station';
const headermenu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={()=>{window.sessionStorage.clear(); window.location.href="/login"}}><Icon style={{float:"left",paddingTop:4,marginRight:4}} type="poweroff" />退出登录</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/index/user/password"><Icon style={{float:"left",paddingTop:4,marginRight:4}} type="key" />修改密码</a>
      </Menu.Item>
    </Menu>
  );
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
interface iState {
    collapsed: boolean;
    defaultOpenKeys: Array<string>;
    selectedKeys: Array<string>;
    currentMenu: MenuVo;
    openKeys:Array<string>
  }
export default class Index extends Component<RouteComponentProps> {
    private menus = new Array<MenuVo>();
    private menuMap = new Map<string,MenuVo>();
    private userName = null;
    private functionList = new Array<string>();
    constructor(props){
        super(props);
        let functions = window.sessionStorage.getItem("functions");
        if(functions && functions.length>0){
            this.functionList = functions.split(",");
        }
        this.menus = new MenuConfig().getMenuByFun(this.functionList);
        this.initMenuMap(this.menus);
        this.state.currentMenu = this.menuMap.get(props.location.pathname);
        this.userName = window.sessionStorage.getItem("userName");
    }

    state: iState = {
        collapsed: false,
        defaultOpenKeys: [],
        selectedKeys: [],
        currentMenu:null,
        openKeys:[]
    };

    componentWillMount(){
        let menu = this.menuMap.get(this.props.location.pathname);
        if(menu){
            if(menu.parentKey){
                this.setState({
                    openKeys:[menu.parentKey]
                })
            }
            this.setState({
                selectedKeys:[menu.key]
            })
        }
    }
    async componentWillReceiveProps(nextProps){
        if(this.props.location.pathname !== nextProps.location.pathname){
            let menu = this.menuMap.get(nextProps.location.pathname);
            if(menu){
                let _openKeys = this.state.openKeys;
                _openKeys.push(menu.parentKey);
                this.onOpenChange(_openKeys)
                await this.setState({
                    selectedKeys:[menu.key],
                    currentMenu:menu
                })
            }
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
        }
    }
    componentDidMount() {
        window["aaa"] = this;
        this.isLogin();
        this.checkPermition();
    }

    initMenuMap = (menus:Array<MenuVo>) =>{
        menus.forEach(menu=>{
            this.menuMap.set(menu.key,menu);
            if(menu.children != null){
                this.initMenuMap(menu.children);
            }
        })
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    //跟路由以下跳转，检测登录状态
    isLogin = () => {
        console.log("check login")
        let token = window.sessionStorage.getItem("token");
        if (!token) {
            this.props.history.push("/login", this.props.location);
        }
    }

    //根路由以下跳转，检测权限
    checkPermition = () => {
        if(!this.menuMap.get(this.props.location.pathname)){
            this.props.history.push("/index/blocked");
        }
    }

    renderMenu = (menus:Array<MenuVo>): Array<JSX.Element> => {
        let self = this;
        let menuDoms = [];
        menus.forEach(menu => {
            if (menu.children != null) {
                let dom = <SubMenu
                    key={menu.key}
                    title={
                        <span>
                            {menu.icon?<Icon type={menu.icon} theme="filled"/>:null}
                            <span>{menu.name}</span>
                        </span>
                    }>
                        {self.renderMenu(menu.children)}
                    </SubMenu>;
                menuDoms.push(dom);
            }else{
                let dom = <Menu.Item key={menu.key}>
                              {menu.icon?<Icon type={menu.icon} theme="filled"/>:null}
                              <span>{menu.name}</span>
                          </Menu.Item>;
                menuDoms.push(dom);
            }
        })
        return menuDoms;
    }

    onSelectMenu = async (param) =>{
        await this.props.history.push(param.key);
        this.isLogin();
        this.checkPermition();
        this.setState({
            currentMenu:this.menuMap.get(this.props.location.pathname)
        })
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        })
    }
    onOpenChange = async (openKeys) =>{
        let _openKeys = [];
        if(openKeys.length > 1){
            _openKeys.push(openKeys[openKeys.length -1])
            this.setState({openKeys:_openKeys});
        }else{
            this.setState({openKeys});
        }
    }
    render() {
        let {currentMenu,defaultOpenKeys,selectedKeys: selectedKeys,openKeys} = this.state;
        let parentMenu:MenuVo = null;
        if(currentMenu){
            parentMenu = this.menuMap.get(currentMenu.parentKey);
        }
        console.log("render:",defaultOpenKeys,selectedKeys)
        return (
            <div>
                <div>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <div className="logo">
                                <img src={logo} alt="logo"/>
                            </div>
                            <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys} openKeys={openKeys} selectedKeys={selectedKeys} onOpenChange={this.onOpenChange} onSelect={this.onSelectMenu}>
                                {this.renderMenu(this.menus)}
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{  padding: 0 }} >
                                <div style={{textAlign: "right" ,margin: '0 30px'}}>
                                    <div style={{display: "inline", marginRight: '10px'}}>
                                        <Avatar size="large" icon="user" />
                                    </div>
                                    <div style={{display: "inline"}}>
                                        <Dropdown overlay={headermenu}>
                                            <a style={{ color:"white" }} onClick={e => e.preventDefault()}>
                                                {this.userName} <Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                            </Header>
                            <Content style={{ margin: '10px 30px 0 30px' }}>
                                <div style={{ margin: '0 16px' }}>
                                    <span style={{fontSize: "20px", fontWeight: "bolder"}}>{currentMenu?currentMenu.name:"错误"}</span>
                                    <Breadcrumb >
                                        <Breadcrumb.Item href="/index/home"><Icon type="home" /></Breadcrumb.Item>
                                        {parentMenu?<Breadcrumb.Item>{parentMenu.name}</Breadcrumb.Item>:null}
                                        <Breadcrumb.Item>{currentMenu?currentMenu.name:"错误"}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                <div style={{ margin: '10px 0 0 0' }}>
                                    <Switch>
                                        <Route exact path="/index/home" component={Home} />
                                        <Route exact path="/index/authority/account" component={Account} />
                                        <Route exact path="/index/authority/role" component={Role} />
                                        <Route exact path="/index/data/gnss" component={GnssData} />
                                        <Route exact path="/index/data/flexitilt" component={ftaData} />
                                        <Route exact path="/index/data/raingauge" component={rainData} />
                                        <Route exact path="/index/data/intellectualcorepile" component={icpData} />
                                        <Route exact path="/index/data/waterlevel" component={waterLevelData} />
                                        <Route exact path="/index/data/waterpressure" component={waterPressureData} />
                                        <Route exact path="/index/dataManage/gnss" component={Gnss} />
                                        <Route exact path="/index/dataManage/flexitilt" component={Flexitilt} />
                                        <Route exact path="/index/dataManage/raingauge" component={Raingauge} />
                                        <Route exact path="/index/dataManage/intellectualcorepile" component={Intellectualcorepile} />
                                        <Route exact path="/index/dataManage/waterlevel" component={Waterlevel} />
                                        <Route exact path="/index/dataManage/waterpressure" component={Waterpressure} />
                                        <Route exact path="/index/monitor/count" component={MonitorProjectCount} />
                                        <Route exact path="/index/monitor/spread" component={MonitorStation} />
                                        <Route exact path="/index/project/manage" component={Project} />
                                        <Route exact path="/index/project/group" component={Group} />
                                        <Route exact path="/index/project/station" component={Station} />
                                        <Route exact path="/index/project/partition" component={Partition} />
                                        <Route exact path="/index/user/password" component={Password} />
                                        <Route exact path="/index/warning/setting" component={WarningSetting} />
                                        <Route exact path="/index/warning/record" component={WarningRecord} />
                                        <Route exact path="/index/blocked" component={Blocked} />
                                        <Route component={Error} />
                                    </Switch>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}></Footer>
                        </Layout>
                    </Layout>
                </div>

            </div>
        )
    }
}
