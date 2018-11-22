// @flow
import React, { Component } from 'react';
import connectComponent from '../utils/connectComponent';
import { Button, Layout, Menu, Breadcrumb, Icon, Row, Col, Divider, Input,
    Tooltip, Table, Tag, Select,
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

import styles from './PatientPage.css';
import dk from '../constants/Datakey';


type Props = {};

type State = {
    showDetail: boolean;
};



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
            showDetail: false,
        };

        this.columns = [
            { title: dk.id.show, width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: dk.name.show, width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
            { title: dk.age.show, dataIndex: 'address', key: '1', width: 250 },
            { title: dk.firstDiagnose.show, dataIndex: 'address', key: '3', width: 250 },
            { title: dk.lastDiagnose.show, dataIndex: 'address', key: '4', width: 250 },
            { title: dk.cardId.show, dataIndex: 'address', key: '5', width: 250 },
            {
                title: dk.phone.show,
                key: 'tags',
                dataIndex: 'tags',
                width: 250,
                render: tags => (
                    <span>
                    {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
                    </span>
                ),
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: 50,
                fixed: 'right',
                render: (text, record) => {
                    return (
                        <a href="javascript:;" onClick={() => {
                            this.onClickShowDetail(record.key);
                        }}>详细</a>
                    ); 
                },
            }
        ];
    
    }

    render() {
        return (
            <Content>
                <Row type="flex" justify="space-between" style={{height: '100%'}}>
                    <Col span={this.state.showDetail? 12: 24} className={styles.leftMainCtn}>
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
                                onClick={this.newPatient.bind(this)} icon="file"
                            >
                                新建
                            </Button>
                        </Row>
                        <div style={{padding: '10px 8px 10px 8px'}}>
                            {this.renderTable()}
                        </div>
                    </Col>
                    {/* <Divider type="vertical"></Divider> */}
                    {this.state.showDetail && (
                        <Col span={12} className={styles.rightMainCtn}>
                            {this.renderDetailHeader()}
                            {this.renderDetailBasic()}
                            {this.renderDetailTreatHistory()}
                        </Col>
                    )}
                    
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
            <Table columns={this.columns} dataSource={data} scroll={{ x: 1500, y: 300 }} size="small" onSelect={this.onClickShowDetail.bind(this)}
            />
        )
    }

    onClickShowDetail(item) {
        this.setState({
            showDetail: true,
        });
        console.log('click item');
    }

    onClickHideDetail() {
        this.setState({
            showDetail: false,
        });
    }

    renderDetailHeader() {
        console.log('ssss');
        return (
            <Row className={styles.header}>
                <Col span={8}>
                    {/* <Button size="small" type="danger" shape="circle" icon="close" 
                        onClick={() => this.onClickHideDetail()}
                    /> */}
                    <Button style={{marginRight: 8}} size="small" icon="menu-fold"
                        onClick={() => this.onClickHideDetail()}
                    >关闭</Button>
                    <Button type="primary" style={{marginRight: 8}} size="small" icon="save"
                        onClick={() => this.onClickHideDetail()} 
                    >保存</Button>
                </Col>
                <Col span={16}>
                    <Row type="flex" justify="end" >
                        {/* <Tooltip placement="bottomLeft" title={'搜索语法提示'}>
                            <Search
                                style={{marginRight: 16, width: 200}}
                                placeholder="id搜索"
                                onSearch={value => console.log(value)}
                                enterButton
                                size="small"
                            />
                        </Tooltip> */}
                        <Button type="primary" style={{marginRight: 8}} size="small"
                            onClick={() => this.onClickHideDetail()}
                        >
                            ???
                        </Button>
                    </Row>
                </Col>
            </Row>
            
        );
    }

    renderDetailBasic() {
        return (
            <div className={styles.detailContent} style={{height: 400}}>
                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '20%'}} defaultValue={dk.id.show} />
                            <Input style={{width: '80%'}} defaultValue="26888888" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '20%'}} defaultValue={dk.name.show} />
                            <Input style={{width: '80%'}} defaultValue="26888888" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '30%'}} defaultValue={dk.birthDate.show} />
                            <Input style={{width: '70%'}} defaultValue="26888888" />
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '20%'}} defaultValue={dk.id.show} />
                            <Input style={{width: '80%'}} defaultValue="26888888" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '20%'}} defaultValue={dk.name.show} />
                            <Input style={{width: '80%'}} defaultValue="26888888" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '30%'}} defaultValue={dk.birthDate.show} />
                            <Input style={{width: '70%'}} defaultValue="26888888" />
                        </InputGroup>
                    </Col>
                </InputGroup>
                {/* <Row >
                    <InputGroup compact className={styles.infoRow}>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row className={styles.infoRow}>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row className={styles.infoRow}>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                    </InputGroup>
                </Row> */}
            </div>
        )
    }

    renderDetailTreatHistory() {
        return (
            <div></div>
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