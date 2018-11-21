// @flow
import React, { Component } from 'react';
import connectComponent from '../utils/connectComponent';
import { Button, Layout, Menu, Breadcrumb, Icon, Row, Col, Divider, Input,
    Tooltip, Table, Tag,
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Search = Input.Search;

import styles from './PatientPage.css';
import dk from '../constants/Datakey';


type Props = {};

type State = {
    
};

const columns = [
    { title: dk.id.show, width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: dk.name.show, width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: dk.age.show, dataIndex: 'address', key: '1', width: 250 },
    { title: dk.firstDiagnose.show, dataIndex: 'address', key: '3', width: 250 },
    { title: dk.lastDiagnose.show, dataIndex: 'address', key: '4', width: 250 },
    { title: dk.cardId.show, dataIndex: 'address', key: '5', width: 250 },
    { title: dk.phone.show, dataIndex: 'address', key: '6', width: 250 },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        width: 250,
        render: tags => (
            <span>
            {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
            </span>
        ),
    },
];

const data = [{
    key: '1',
    name: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    firstName: 'Jim',
    name: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '3',
    firstName: 'Joe',
    name: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
},{
    key: '4',
    name: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '5',
    firstName: 'Jim',
    name: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '6',
    firstName: 'Joe',
    name: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
},{
    key: '7',
    name: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '8',
    firstName: 'Jim',
    name: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '9',
    firstName: 'Joe',
    name: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}];

class PatientPage extends Component<Props> {
    props: Props;
    state: State;

    

    constructor(props: Props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Content>
                <Row type="flex" justify="space-between" style={{height: '100%'}}>
                
                    <Col span={12} className={styles.leftMainCtn}>
                        <Row type="flex" justify="end" className={styles.header}>
                            <Tooltip placement="bottomLeft" title={'搜索语法提示'}>
                                <Search
                                    style={{marginRight: 16, width: 200}}
                                    placeholder="id搜索"
                                    onSearch={value => console.log(value)}
                                    enterButton
                                    size="small"
                                    
                                />
                            </Tooltip>
                            <Button type="primary" style={{marginRight: 8}} size="small"
                                onClick={this.newPatient.bind(this)}
                            >
                                新建档案
                            </Button>
                        </Row>
                        <Row style={{padding: 8}}>
                            {this.renderTable()}
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

    newPatient() {
        console.log('haha');
        const {actions} = this.props;
        actions.pa_getPatientList();
    }

    renderTable() {
        return (
            <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} size="small"/>
        )
    }
}

function mapStateToProps(state) {
    return {
        
    };
}
  
export default connectComponent({
    mapStateToProps, 
    LayoutComponent: PatientPage,
});