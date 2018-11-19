import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import PatientPage from './containers/PatientPage';

import { Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;



export default class Routes extends Component<Props> {
    state = {
        collapsed: false,
    };
    
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <App>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                            </Menu.Item>
                            <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>User</span></span>}
                            >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>Team</span></span>}
                            >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                

                    <Content style={{ padding: '0 50px' }}>

                        <Switch>
                            <Route path={routes.COUNTER} component={CounterPage} />
                            <Route path={routes.HOME} component={HomePage} />
                            <Route path={routes.PATIENT} component={PatientPage} />
                        </Switch>

                    </Content>
                
                {/* <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                </Footer> */}
                </Layout>
            </App>
        );
        
    }
    
};
