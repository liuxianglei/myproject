import React, { Component } from 'react'
import { Tree, Card } from 'antd'
import MenuVo from '../../../../model/MenuVo';
import MenuConfig from '../../../../config/menu-config';
const { TreeNode } = Tree;

interface iProps {
    width?:number,
    onChange?: Function,
    keys?:string[]
}
export default class TreeForm extends Component<iProps> {
    private menus: Array<MenuVo> = new MenuConfig().getMenu();
    private treeNodes:Array<JSX.Element> = [];

    componentWillMount(){
        console.log(this.props.keys)
        this.menus = new MenuConfig().getMenu();
        this.menus.forEach(menu=>{
            this.treeNodes.push(this.buildTreeNode(menu));
        })
    }
    buildTreeNode = (menu:MenuVo) =>{
        let children:Array<JSX.Element> = [];
        if(menu.children){
            menu.children.forEach(child=>{
                children.push(this.buildTreeNode(child));
            });
        }
        return <TreeNode title={menu.name} key={menu.functionStr}>
            {children}
        </TreeNode>;
    }
    onCheck = (checkedKeys, info) => {
        this.props.onChange(checkedKeys);
    };
    render() {
        return (
            <div>
                <Card style={{width:this.props.width, height:400,overflowY:"auto"}}>
                    <Tree
                        checkable
                        defaultExpandAll
                        checkedKeys={this.props.keys}
                        onCheck={this.onCheck}
                    >
                        {this.treeNodes}
                    </Tree>
                </Card>
            </div>
        )
    }
}
