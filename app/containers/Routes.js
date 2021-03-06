import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes from '../constants/routes';
import App from './App';
import HomePage from './HomePage';
import CounterPage from './CounterPage';
import PatientPage from './PatientPage';

import styles from './Routes.css';
import { Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;




export default class Routes extends Component<Props> {
    state = {
        collapsed: true,
    };
    
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <App>
                <Layout style={{ minHeight: '100vh' }}>
                    {/* <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header> */}
                    <Sider
                        collapsible={false}
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className={styles.logo} />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                            <Icon type="profile" />
                            {/* <span>随访表</span> */}
                            <Link to={routes.PATIENT}>随访表</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                            <Icon type="dashboard" />
                            <Link to={routes.COUNTER}>待扩展</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Switch>
                        <Route path={routes.COUNTER} component={CounterPage} />
                        <Route path={routes.HOME} component={HomePage} />
                        <Route path={routes.PATIENT} component={PatientPage} />
                    </Switch>

                {/* <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                </Footer> */}
                </Layout>
            </App>
        );
        
    }
    
};
