// @flow
import React, { Component } from 'react';
import connectComponent from '../utils/connectComponent';
import { Button, Layout, Menu, Breadcrumb, Icon, Row, Col, Divider, Input,
    Tooltip, Table, Tag, Select, InputNumber, DatePicker, Collapse,
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
const Panel = Collapse.Panel;

import styles from './PatientPage.css';
import {BaseInfo} from '../constants/Datakey';


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

const customPanelStyle = {
    background: '#ebf4fa',
    // borderRadius: 4,
    // marginBottom: 8,
    // overflow: 'hidden'
};

class PatientPage extends Component<Props> {
    props: Props;
    state: State;

    
    constructor(props: Props) {
        super(props);

        this.state = {
            showDetail: false,
            windowHeight: window.innerHeight,
        };

        this.columns = [
            { title: BaseInfo.id.show, width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: BaseInfo.name.show, width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
            { title: BaseInfo.age.show, dataIndex: 'address', key: '1', width: 250 },
            { title: BaseInfo.firstDiagnose.show, dataIndex: 'address', key: '3', width: 250 },
            { title: BaseInfo.lastDiagnose.show, dataIndex: 'address', key: '4', width: 250 },
            { title: BaseInfo.cardId.show, dataIndex: 'address', key: '5', width: 250 },
            {
                title: BaseInfo.phone.show,
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

        // tofix: implement in main process
        window.onresize = () => {
            console.log('h=' + window.innerHeight);
            this.setState({
                windowHeight: window.innerHeight,
            })
        }
    
    }

    render() {
        return (
            <Content>
                <Row type="flex" justify="space-between" style={{height: '100%'}}>
                    <Col span={this.state.showDetail? 10: 24} className={styles.leftMainCtn}>
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
                        <div style={{padding: '10px 8px 0 8px'}}>
                            {this.renderTable()}
                        </div>
                    </Col>
                    {/* <Divider type="vertical"></Divider> */}
                    {this.state.showDetail && (
                        <Col span={14} className={styles.rightMainCtn}>
                            {this.renderDetailHeader()}
                            {this.renderDetail()}
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
            <Table columns={this.columns} dataSource={data} scroll={{ x: 1500, y: this.state.windowHeight - 155}}
             size="small" onSelect={this.onClickShowDetail.bind(this)}
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
                <Col span={16}>
                    {/* <Button size="small" type="danger" shape="circle" icon="close" 
                        onClick={() => this.onClickHideDetail()}
                    /> */}
                    <Button style={{marginRight: 8}} size="small" icon="menu-fold"
                        onClick={() => this.onClickHideDetail()}
                    >关闭</Button>
                    <Button type="primary" style={{marginRight: 8}} size="small" icon="save"
                        onClick={() => this.onClickHideDetail()} 
                    >保存</Button>
                    <Button type="danger" style={{marginRight: 8}} size="small" icon="delete"
                        onClick={() => this.onClickHideDetail()} 
                    >删除</Button>
                </Col>
                <Col span={8}>
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
                           添加病历 
                        </Button>
                    </Row>
                </Col>
            </Row>
            
        );
    }

    renderDetail() {
        return (
            <div className={styles.detailContent} style={{height: this.state.windowHeight - 60}}>
                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.name.show} />
                            <Input style={{width: '60%'}} defaultValue="" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.birthDate.show} />
                            {/* <Input style={{width: '60%'}} defaultValue="" /> */}
                            <DatePicker style={{width: '60%'}}/>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.age.show} />
                            <Input disabled style={{width: '60%'}} defaultValue="24" />
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.id.show} />
                            <InputNumber size="small" style={{width: '60%'}}/>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.cardId.show} />
                            <Input style={{width: '60%'}} defaultValue="" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.phone.show} />
                            <InputNumber size="small" style={{width: '60%'}}/>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.nation.show} />
                            <Input style={{width: '60%'}} defaultValue="" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.occupation.show} />
                            <Input style={{width: '60%'}} defaultValue="" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.smoking.show} />
                            {/* <Input style={{width: '60%'}} defaultValue="" /> */}
                            <Select size="small" style={{width: '60%'}} defaultValue="是">
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={6}>
                        <InputGroup compact >
                            <Input disabled style={{width: '60%'}} defaultValue={BaseInfo.firstMlAge.show} />
                            <InputNumber size="small" style={{width: '40%'}}/>
                        </InputGroup>
                    </Col>
                    <Col span={6}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '60%'}} defaultValue={BaseInfo.pregnantTimes.show} />
                            <InputNumber size="small" style={{width: '40%'}}/>
                        </InputGroup>
                    </Col>
                    <Col span={6}>
                        <InputGroup compact >
                            <Input disabled style={{width: '60%'}} defaultValue={BaseInfo.produceChildTimes.show} />
                            <InputNumber size="small" style={{width: '40%'}}/>
                        </InputGroup>
                    </Col>
                    <Col span={6}>
                        <InputGroup compact >
                            <Input disabled style={{width: '60%'}} defaultValue={BaseInfo.abortionTimes.show} />
                            <InputNumber size="small" style={{width: '40%'}}/>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.familyHistory.show} />
                            <Input style={{width: '60%'}} defaultValue="" />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.mlBleeding.show} />
                            <Select size="small" style={{width: '60%'}} defaultValue="是">
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.contraceptionWay.show} />
                            <Input style={{width: '60%'}} defaultValue="" />
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={12}>
                        <InputGroup compact >
                            <Input disabled style={{width: '20%'}} defaultValue={BaseInfo.diagnose.show} />
                            <Input style={{width: '80%'}} defaultValue="" />
                        </InputGroup>
                    </Col>
                    <Col span={12}>
                        <InputGroup compact >
                            <Input disabled style={{width: '20%'}} defaultValue={BaseInfo.other.show} />
                            <Input style={{width: '80%'}} defaultValue="" />
                        </InputGroup>
                    </Col>
                </InputGroup>       
                {/* <br /> */}
                {this.renderDetailTreatHistory()}
            </div>
        )
    }

    renderDetailTreatHistory() {
        return (
            <div className={styles.infoRow} style={{marginTop: 8}}>
                <Collapse defaultActiveKey={[]} onChange={this.cb_TreatCollapse}>
                    {this.renderTreat()}
                    {this.renderTreat()}
                </Collapse>
            </div>
        );
    }

    cb_TreatCollapse = () => {

    }

    

    renderTreat() {
        var text = "12121212";
        return (
            <Panel style={customPanelStyle} header="病历 2018-11-05">
                <p>{text}</p>
            </Panel>
        );
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