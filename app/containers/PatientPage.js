// @flow
import React, { Component } from 'react';

import { Button, Layout, Menu, Breadcrumb, Icon, Row, Col, Divider, Input,
    Tooltip
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import styles from './PatientPage.css';

type Props = {};
const Search = Input.Search;


const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }];



export default class PatientPage extends Component<Props> {
    props: Props;

    render() {
        return (
            <Content>
                <Row type="flex" justify="space-between" style={{height: '100%'}}>
                
                    <Col span={12} className={styles.leftMainCtn}>
                        <Row type="flex" justify="end" style={{background: '#ddd', padding: 16}}>
                        <Tooltip placement="bottomLeft" title={'搜索语法提示'}>
                            <Search
                                style={{marginRight: 16, width: 200}}
                                placeholder="id搜索"
                                onSearch={value => console.log(value)}
                                enterButton
                            />
                        </Tooltip>
                            <Button type="primary" style={{marginRight: 8}}>新建档案</Button>
                        </Row>
                    </Col>
                    {/* <Divider type="vertical"></Divider> */}
                    <Col span={12} className={styles.rightMainCtn}>
                        hello
                    </Col>
                </Row>
            </Content>
            
        )
    }
}

// #components-layout-demo-top-side .logo {
//     width: 120px;
//     height: 31px;
//     background: rgba(255,255,255,.2);
//     margin: 16px 28px 16px 0;
//     float: left;
//   }