// @flow
import React, { Component } from 'react';
import { Button, Layout, Menu, Breadcrumb, Icon, Row, Col, Divider, Input,
    Tooltip, Table, Tag, Select, InputNumber, DatePicker, Collapse,
} from 'antd';
import connectComponent from '../utils/connectComponent';

import styles from './PatientPage.css';
import {BaseInfo, TreatRecord, Colposcopy, Treat} from '../constants/Datakey';
import {PatientInfo, PatientBaseInfo} from "../constants/DateTypes";

import moment from 'moment'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
const Panel = Collapse.Panel;


// ////////////////////////////////////////////////
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [] })
  .write()

const result = db.get('posts')
  .push({ title: 123 })
  .write()

console.log(result)

// ////////////////////////////////////////////////




type Props = {
	actions: any,
    patientList: Array<PatientInfo>
};

type State = {
    showDetail: boolean,

    curPatientInfo: PatientInfo
};


const data = [{
    key: '1',
    base: {
        id: '2910ss',
        name: 'Brown',
        age: 32,
        firstDiagnose: '123y22m',
        lastDiagnose: '123y22m',
        cardId: '232993002',
        phone: '239392111111',
        tags: ['nice', 'developer'],
    }
}, {
    key: '2',
    base: {
        id: '2910ss',
        name: 'Brown',
        age: 32,
        firstDiagnose: '123y22m',
        lastDiagnose: '123y22m',
        cardId: '232993002',
        phone: '239392111111',
        tags: ['nice', 'developer'],
    }
}];

const OutPatientPanelStyle = {
    background: '#e0f3ff',
    // borderRadius: 4,
    // marginBottom: 8,
    // overflow: 'hidden'
};

const InnerPanelStyle = {
    background: '#f0f0f0',
    // borderRadius: 4,
    // marginBottom: 8,
    // overflow: 'hidden'
};

const dateFormat = 'YYYY-MM-DD';

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
            { title: BaseInfo.id.show, width: 100, dataIndex: 'base.id', key: 'id', fixed: 'left' },
            { title: BaseInfo.name.show, width: 100, dataIndex: 'base.name', key: 'name', fixed: 'left' },
            { title: BaseInfo.age.show, width: 70, dataIndex: 'base.age', key: 'age', fixed: 'left' },
            { title: BaseInfo.firstDiagnose.show, width: 150, dataIndex: 'base.firstDiagnose', key: 'firstDiagnose'},
            { title: BaseInfo.lastDiagnose.show, width: 150, dataIndex: 'base.lastDiagnose', key: 'lastDiagnose'},
            { title: BaseInfo.cardId.show, width: 200, dataIndex: 'base.cardId', key: 'cardId'},
            { title: BaseInfo.phone.show, dataIndex: 'base.phone', key: 'phone'},
            // {
            //     title: 'Tags',
            //     key: 'tags',
            //     dataIndex: 'tags',
            //     width: 250,
            //     render: tags => (
            //         <span>
            //         {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
            //         </span>
            //     ),
            // },
            {
                title: '操作',
                dataIndex: 'operation',
                width: 50,
                fixed: 'right',
                render: (text, record) => (
                        <a href="javascript:;" onClick={() => {
                            this.onClickShowDetail(record.key);
                        }}>详细</a>
                    ),
            }
        ];

        // tofix: implement in main process
        window.onresize = () => {
            console.log(`h=${  window.innerHeight}`);
            this.setState({
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth,
            })
        }

    }

    render() {
        return (
            <Content>
                <Row type="flex" justify="space-between" style={{height: '100%'}}>
                    <Col span={this.state.showDetail? 10: 24} className={styles.leftMainCtn}>
                        <Row type="flex" justify="end" className={styles.header}>
                            <Tooltip placement="bottomLeft" title="搜索语法提示">
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
        actions.pa_newPatientInfo();
        this.setState({
            showDetail: true,
        });
    }

    renderTable() {
        return (
            <Table columns={this.columns} dataSource={data} 
            scroll={{x: 1000,
            y: this.state.windowHeight - 155}} bordered
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
                    {/* <Button size="small" type="danger" sha`pe="circle" icon="close"
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
                            onClick={() => this.onClickAddRecord()}
                        >
                           添加病历
                        </Button>
                    </Row>
                </Col>
            </Row>

        );
    }

    renderDetail() {
        const {actions, selPatientInfo} = this.props;
        if (selPatientInfo == null) {
            return;
        }
        const {base} = selPatientInfo;
        return (
            <div className={styles.detailContent} style={{height: this.state.windowHeight - 60}}>
                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.name.show} />
                            <Input style={{width: '60%'}} defaultValue="" value={base.name} onChange={(e) => {
                                actions.pa_editSelPatientBase({
                                    name: e.target.value,
                                });
                            }}/>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.birthDate.show} />
                            {/* <Input style={{width: '60%'}} defaultValue="" /> */}
                            <DatePicker style={{width: '60%'}} defaultValue={base.birthDate==''? null: moment(base.birthDate, dateFormat)}
                            onChange={
                                (date, dateString) => {
                                    console.log(date, dateString);
                                    let age = moment().diff(date, 'years');
                                    console.log('age=' + age);
                                    actions.pa_editSelPatientBase({
                                        birthDate: dateString,
                                        age,
                                    });
                                }
                            }/>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.age.show} />
                            <Input disabled style={{width: '60%'}} defaultValue="24" value={base.age}/>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.id.show} />
                            <Input size="small" style={{width: '60%'}} value={base.id} onChange={(e) => {
                                    actions.pa_editSelPatientBase({
                                        id: e.target.value,
                                    });
                                }}/>
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
                            <InputNumber size="small" style={{width: '60%'}} value={base.phone} onChange={(v) => {
                                    actions.pa_editSelPatientBase({
                                        phone: v,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.nation.show} />
                            <Input style={{width: '60%'}} defaultValue="" 
                                value={base.nation} onChange={(e) => {
                                    actions.pa_editSelPatientBase({
                                        nation: e.target.value,
                                    });
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.occupation.show} />
                            <Input style={{width: '60%'}} defaultValue={base.occupation} 
                                value={base.occupation} onChange={(e) => {
                                    actions.pa_editSelPatientBase({
                                        occupation: e.target.value,
                                    });
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.smoking.show} />
                            {/* <Input style={{width: '60%'}} defaultValue="" /> */}
                            <Select size="small" style={{width: '60%'}} defaultValue={base.smoking} onChange={(value) => {
                                actions.pa_editSelPatientBase({
                                    smoking: value,
                                });
                            }}>
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
                            <InputNumber size="small" style={{width: '40%'}} value={base.firstMlAge} onChange={(value) => {
                                    actions.pa_editSelPatientBase({
                                        firstMlAge: value,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                    <Col span={6}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '60%'}} defaultValue={BaseInfo.pregnantTimes.show} />
                            <InputNumber size="small" style={{width: '40%'}} value={base.pregnantTimes} onChange={(value) => {
                                    actions.pa_editSelPatientBase({
                                        pregnantTimes: value,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                    <Col span={6}>
                        <InputGroup compact >
                            <Input disabled style={{width: '60%'}} defaultValue={BaseInfo.produceChildTimes.show} />
                            <InputNumber size="small" style={{width: '40%'}} value={base.produceChildTimes} onChange={(value) => {
                                    actions.pa_editSelPatientBase({
                                        produceChildTimes: value,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                    <Col span={6}>
                        <InputGroup compact >
                            <Input disabled style={{width: '60%'}} defaultValue={BaseInfo.abortionTimes.show} />
                            <InputNumber size="small" style={{width: '40%'}} value={base.abortionTimes} onChange={(value) => {
                                    actions.pa_editSelPatientBase({
                                        abortionTimes: value,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.familyHistory.show} />
                            <Input style={{width: '60%'}} defaultValue="" value={base.familyHistory} onChange={(e) => {
                                    actions.pa_editSelPatientBase({
                                        familyHistory: e.target.value,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.mlBleeding.show} />
                            <Select size="small" style={{width: '60%'}} defaultValue={base.mlBleeding} onChange={(value) => {
                                actions.pa_editSelPatientBase({
                                    mlBleeding: value,
                                });
                            }}>
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={BaseInfo.contraceptionWay.show} />
                            <Input style={{width: '60%'}} defaultValue="" value={base.contraceptionWay} onChange={(e) => {
                                    actions.pa_editSelPatientBase({
                                        contraceptionWay: e.target.value,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={12}>
                        <InputGroup compact >
                            <Input disabled style={{width: '20%'}} defaultValue={BaseInfo.diagnose.show} />
                            <Input style={{width: '80%'}} defaultValue="" value={base.diagnose} onChange={(e) => {
                                    actions.pa_editSelPatientBase({
                                        diagnose: e.target.value,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                    <Col span={12}>
                        <InputGroup compact >
                            <Input disabled style={{width: '20%'}} defaultValue={BaseInfo.other.show} />
                            <Input style={{width: '80%'}} defaultValue="" value={base.other} onChange={(e) => {
                                    actions.pa_editSelPatientBase({
                                        other: e.target.value,
                                    });
                                }}/>
                        </InputGroup>
                    </Col>
                </InputGroup>
                {/* <br /> */}
                {this.renderDetailTreatHistory()}
            </div>
        )
    }

    renderDetailTreatHistory() {
        const {selPatientInfo, actions} = this.props;
        return (
            <div className={styles.infoRow} style={{marginTop: 8}}>
                <Collapse defaultActiveKey={[]} onChange={this.cb_TreatCollapse}> 
                    {
                        selPatientInfo.treatRecordList.map((data, index) => {
                            return (
                                <Panel key={index} style={OutPatientPanelStyle} header={"病历 " + data.date}>

                                    <InputGroup size="small" className={styles.infoRow}>
                                        <DatePicker style={{width: '20%'}} defaultValue={data.date==''? null: moment(data.date, dateFormat)}
                                            onChange={
                                                (date, dateString) => {
                                                    console.log('date=' + dateString);
                                                    actions.pa_editSelPatientTreatRecord({
                                                        modify: {
                                                            date: dateString,
                                                        },
                                                        index: index,
                                                    });
                                                }
                                            }
                                        />
                                    </InputGroup>

                                    <Row>
                                        <Col span={2} style={{marginTop: 5}}>
                                            {TreatRecord.cytology.show}
                                        </Col>
                                        <Col span={22}>
                                            <InputGroup size="small" className={styles.infoRow}>
                                                <Col span={6}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.cytology_date.show} />
                                                        <DatePicker style={{width: '70%'}}
                                                            defaultValue={data.date==''? null: moment(data.cytology_date, dateFormat)}
                                                            onChange={
                                                                (date, dateString) => {
                                                                    actions.pa_editSelPatientTreatRecord({
                                                                        modify: {
                                                                            cytology_date: dateString,
                                                                        },
                                                                        index: index,
                                                                    });
                                                                }
                                                            }
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col span={5}>
                                                    <InputGroup compacts>
                                                        <Input disabled style={{width: '50%'}} defaultValue={TreatRecord.cytology_from.show} />
                                                        <Select size="small" style={{width: '50%'}} defaultValue={data.cytology_from} onChange={(value) => {
                                                            actions.pa_editSelPatientTreatRecord({
                                                                modify: {
                                                                    cytology_from: value,
                                                                        },
                                                                index: index,
                                                            });
                                                        }}>
                                                            <Option value="本院">本院</Option>
                                                            <Option value="外院">外院</Option>
                                                        </Select>
                                                    </InputGroup>
                                                </Col>
                                                <Col span={13}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '15%'}} defaultValue={TreatRecord.cytology_report.show} />
                                                        <Input style={{width: '85%'}} defaultValue="" 
                                                            value={data.cytology_report} onChange={(e) => {
                                                                actions.pa_editSelPatientTreatRecord({
                                                                    modify: {
                                                                        cytology_report: e.target.value,
                                                                            },
                                                                    index: index,   
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={2} style={{marginTop: 5}}>
                                            {TreatRecord.HPV.show}
                                        </Col>
                                        <Col span={22}>
                                            <InputGroup size="small" className={styles.infoRow}>
                                                <Col span={6}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.HPV_date.show} />
                                                        <DatePicker style={{width: '70%'}}
                                                            defaultValue={data.date==''? null: moment(data.HPV_date, dateFormat)}
                                                            onChange={
                                                                (date, dateString) => {
                                                                    actions.pa_editSelPatientTreatRecord({
                                                                        modify: {
                                                                            HPV_date: dateString,
                                                                        },
                                                                        index: index,
                                                                    });
                                                                }
                                                            }
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col span={5}>
                                                    <InputGroup compacts>
                                                        <Input disabled style={{width: '50%'}} defaultValue={TreatRecord.HPV_from.show} />
                                                        <Select size="small" style={{width: '50%'}} defaultValue={data.HPV_from} onChange={(value) => {
                                                            actions.pa_editSelPatientTreatRecord({
                                                                modify: {
                                                                    HPV_from: value,
                                                                        },
                                                                index: index,
                                                            });
                                                        }}>
                                                            <Option value="本院">本院</Option>
                                                            <Option value="外院">外院</Option>
                                                        </Select>
                                                    </InputGroup>
                                                </Col>
                                                <Col span={13}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '15%'}} defaultValue={TreatRecord.HPV_report.show} />
                                                        <Input style={{width: '85%'}} defaultValue="" 
                                                            value={data.HPV_report} onChange={(e) => {
                                                                actions.pa_editSelPatientTreatRecord({
                                                                    modify: {
                                                                        HPV_report: e.target.value,
                                                                            },
                                                                    index: index,   
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={2} style={{marginTop: 5}}>
                                            {TreatRecord.imaging.show}
                                        </Col>
                                        <Col span={22}>
                                            <InputGroup size="small" className={styles.infoRow}>
                                                <Col span={6}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.imaging_date.show} />
                                                        <DatePicker style={{width: '70%'}}
                                                            defaultValue={data.imaging_date==''? null: moment(data.imaging_date, dateFormat)}
                                                            onChange={
                                                                (date, dateString) => {
                                                                    actions.pa_editSelPatientTreatRecord({
                                                                        modify: {
                                                                            imaging_date: dateString,
                                                                        },
                                                                        index: index,
                                                                    });
                                                                }
                                                            }
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col span={5}>
                                                    <InputGroup compacts>
                                                        <Input disabled style={{width: '50%'}} defaultValue={TreatRecord.imaging_from.show} />
                                                        <Select size="small" style={{width: '50%'}} defaultValue={data.imaging_from} onChange={(value) => {
                                                            actions.pa_editSelPatientTreatRecord({
                                                                modify: {
                                                                    imaging_from: value,
                                                                        },
                                                                index: index,
                                                            });
                                                        }}>
                                                            <Option value="本院">本院</Option>
                                                            <Option value="外院">外院</Option>
                                                        </Select>
                                                    </InputGroup>
                                                </Col>
                                                <Col span={5}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.imaging_id.show} />
                                                        <Input style={{width: '70%'}} defaultValue="" 
                                                            value={data.imaging_id} onChange={(e) => {
                                                                actions.pa_editSelPatientTreatRecord({
                                                                    modify: {
                                                                        imaging_id: e.target.value,
                                                                            },
                                                                    index: index,   
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col span={8}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '20%'}} defaultValue={TreatRecord.imaging_report.show} />
                                                        <Input style={{width: '80%'}} defaultValue="" 
                                                            value={data.imaging_report} onChange={(e) => {
                                                                actions.pa_editSelPatientTreatRecord({
                                                                    modify: {
                                                                        imaging_report: e.target.value,
                                                                            },
                                                                    index: index,   
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={2} style={{marginTop: 5}}>
                                            {TreatRecord.histology.show}
                                        </Col>
                                        <Col span={22}>
                                            <InputGroup size="small" className={styles.infoRow}>
                                                <Col span={6}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.histology_date.show} />
                                                        <DatePicker style={{width: '70%'}}
                                                            defaultValue={data.histology_date==''? null: moment(data.histology_date, dateFormat)}
                                                            onChange={
                                                                (date, dateString) => {
                                                                    actions.pa_editSelPatientTreatRecord({
                                                                        modify: {
                                                                            histology_date: dateString,
                                                                        },
                                                                        index: index,
                                                                    });
                                                                }
                                                            }
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col span={5}>
                                                    <InputGroup compacts>
                                                        <Input disabled style={{width: '50%'}} defaultValue={TreatRecord.histology_from.show} />
                                                        <Select size="small" style={{width: '50%'}} defaultValue={data.histology_from} onChange={(value) => {
                                                            actions.pa_editSelPatientTreatRecord({
                                                                modify: {
                                                                    histology_from: value,
                                                                        },
                                                                index: index,
                                                            });
                                                        }}>
                                                            <Option value="本院">本院</Option>
                                                            <Option value="外院">外院</Option>
                                                        </Select>
                                                    </InputGroup>
                                                </Col>
                                                <Col span={5}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.histology_id.show} />
                                                        <Input style={{width: '70%'}} defaultValue="" 
                                                            value={data.histology_id} onChange={(e) => {
                                                                actions.pa_editSelPatientTreatRecord({
                                                                    modify: {
                                                                        histology_id: e.target.value,
                                                                            },
                                                                    index: index,   
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col span={8}>
                                                    <InputGroup compact >
                                                        <Input disabled style={{width: '20%'}} defaultValue={TreatRecord.histology_report.show} />
                                                        <Input style={{width: '80%'}} defaultValue="" 
                                                            value={data.histology_report} onChange={(e) => {
                                                                actions.pa_editSelPatientTreatRecord({
                                                                    modify: {
                                                                        histology_report: e.target.value,
                                                                            },
                                                                    index: index,   
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <Collapse defaultActiveKey={[]} onChange={this.cb_TreatCollapse}style={{marginTop: 16}}>
                                        {this.renderColposcopy(data.colposcopy, index)}
                                        {this.renderTreat(data.treat, index)}
                                    </Collapse>
                                </Panel>
                            )
                        })
                    }
                    {/* {this.renderTreatRecord()} */}
                    {/* {this.renderTreatRecord()} */}
                </Collapse>
            </div>
        );
    }

    cb_TreatCollapse = () => {

    }

    onClickAddRecord() {
        const {actions, selPatientInfo} = this.props;
        actions.pa_addSelPatientRecord();
    }

    // renderTreatRecord(treatRecord: PatientTreatRecord) {
    //     return (
    //         <Panel style={OutPatientPanelStyle} header="病历 2018-11-05">

    //             <InputGroup size="small" className={styles.infoRow}>
    //                 <DatePicker style={{width: '20%'}}/>
    //             </InputGroup>

    //             <Row>
    //                 <Col span={2} style={{marginTop: 5}}>
    //                     {TreatRecord.cytology.show}
    //                 </Col>
    //                 <Col span={22}>
    //                     <InputGroup size="small" className={styles.infoRow}>
    //                         <Col span={6}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.cytology_date.show} />
    //                                 <DatePicker style={{width: '70%'}}/>
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={5}>
    //                             <InputGroup compacts>
    //                                 <Input disabled style={{width: '50%'}} defaultValue={TreatRecord.cytology_from.show} />
    //                                 <Select size="small" style={{width: '50%'}} defaultValue="">
    //                                     <Option value="本院">本院</Option>
    //                                     <Option value="外院">外院</Option>
    //                                 </Select>
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={13}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '15%'}} defaultValue={TreatRecord.cytology_report.show} />
    //                                 <Input style={{width: '85%'}} defaultValue="" />
    //                             </InputGroup>
    //                         </Col>
    //                     </InputGroup>
    //                 </Col>
    //             </Row>

    //             <Row>
    //                 <Col span={2} style={{marginTop: 5}}>
    //                     {TreatRecord.HPV.show}
    //                 </Col>
    //                 <Col span={22}>
    //                     <InputGroup size="small" className={styles.infoRow}>
    //                         <Col span={6}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.HPV_date.show} />
    //                                 <DatePicker style={{width: '70%'}}/>
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={5}>
    //                             <InputGroup compacts>
    //                                 <Input disabled style={{width: '50%'}} defaultValue={TreatRecord.HPV_from.show} />
    //                                 <Select size="small" style={{width: '50%'}} defaultValue="">
    //                                     <Option value="本院">本院</Option>
    //                                     <Option value="外院">外院</Option>
    //                                 </Select>
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={13}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '15%'}} defaultValue={TreatRecord.HPV_report.show} />
    //                                 <Input style={{width: '85%'}} defaultValue="" />
    //                             </InputGroup>
    //                         </Col>
    //                     </InputGroup>
    //                 </Col>
    //             </Row>

    //             <Row>
    //                 <Col span={2} style={{marginTop: 5}}>
    //                     {TreatRecord.imaging.show}
    //                 </Col>
    //                 <Col span={22}>
    //                     <InputGroup size="small" className={styles.infoRow}>
    //                         <Col span={6}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.imaging_date.show} />
    //                                 <DatePicker style={{width: '70%'}}/>
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={5}>
    //                             <InputGroup compacts>
    //                                 <Input disabled style={{width: '50%'}} defaultValue={TreatRecord.imaging_from.show} />
    //                                 <Select size="small" style={{width: '50%'}} defaultValue="">
    //                                     <Option value="本院">本院</Option>
    //                                     <Option value="外院">外院</Option>
    //                                 </Select>
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={5}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.imaging_id.show} />
    //                                 <Input style={{width: '70%'}} defaultValue="" />
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={8}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '20%'}} defaultValue={TreatRecord.imaging_report.show} />
    //                                 <Input style={{width: '80%'}} defaultValue="" />
    //                             </InputGroup>
    //                         </Col>
    //                     </InputGroup>
    //                 </Col>
    //             </Row>

    //             <Row>
    //                 <Col span={2} style={{marginTop: 5}}>
    //                     {TreatRecord.histology.show}
    //                 </Col>
    //                 <Col span={22}>
    //                     <InputGroup size="small" className={styles.infoRow}>
    //                         <Col span={6}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.histology_date.show} />
    //                                 <DatePicker style={{width: '70%'}}/>
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={5}>
    //                             <InputGroup compacts>
    //                                 <Input disabled style={{width: '50%'}} defaultValue={TreatRecord.histology_from.show} />
    //                                 <Select size="small" style={{width: '50%'}} defaultValue="">
    //                                     <Option value="本院">本院</Option>
    //                                     <Option value="外院">外院</Option>
    //                                 </Select>
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={5}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '30%'}} defaultValue={TreatRecord.histology_id.show} />
    //                                 <Input style={{width: '70%'}} defaultValue="" />
    //                             </InputGroup>
    //                         </Col>
    //                         <Col span={8}>
    //                             <InputGroup compact >
    //                                 <Input disabled style={{width: '20%'}} defaultValue={TreatRecord.histology_report.show} />
    //                                 <Input style={{width: '80%'}} defaultValue="" />
    //                             </InputGroup>
    //                         </Col>
    //                     </InputGroup>
    //                 </Col>
    //             </Row>

    //             <Collapse defaultActiveKey={[]} onChange={this.cb_TreatCollapse}style={{marginTop: 16}}>
    //                 {this.renderColposcopy()}
    //                 {this.renderTreat()}
    //             </Collapse>
    //         </Panel>
    //     );
    // }


    renderColposcopy(data, index) {
        const {actions} = this.props;
        return (
            <Panel style={InnerPanelStyle} header="阴道镜">

                <InputGroup size="small" className={styles.infoRow}>
                    <DatePicker style={{width: '20%'}}
                        defaultValue={data.date==''? null: moment(data.date, dateFormat)}
                        onChange={
                            (date, dateString) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        date: dateString,
                                    },
                                    index: index,
                                });
                            }
                        }
                    />
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    {/* <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '40%'}} defaultValue={Colposcocy.date.show} />
                            <DatePicker style={{width: '60%'}}/>
                        </InputGroup>
                    </Col> */}
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '50%'}} defaultValue={Colposcopy.cervixExpose.show} />
                            <Select size="small" style={{width: '50%'}} defaultValue={data.cervixExpose} onChange={(value) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        cervixExpose: value,
                                            },
                                    index: index,
                                });
                            }}>
                                <Option value="充分">充分</Option>
                                <Option value="不充分">不充分</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '50%'}} defaultValue={Colposcopy.conversionAreaType.show} />
                            <Select size="small" style={{width: '50%'}} defaultValue={data.conversionAreaType} onChange={(value) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        conversionAreaType: value,
                                            },
                                    index: index,
                                });
                            }}>
                                <Option value="Ⅰ型">Ⅰ型</Option>
                                <Option value="Ⅱ型">Ⅱ型</Option>
                                <Option value="Ⅲ型">Ⅲ型</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '50%'}} defaultValue={Colposcopy.vinegarWhite.show} />
                            <Select size="small" style={{width: '50%'}} defaultValue={data.vinegarWhite} onChange={(value) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        vinegarWhite: value,
                                            },
                                    index: index,
                                });
                            }}>
                                <Option value="厚">厚</Option>
                                <Option value="薄">薄</Option>
                                <Option value="无">无</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '50%'}} defaultValue={Colposcopy.glandCleft.show} />
                            <Select size="small" style={{width: '50%'}} defaultValue={data.glandCleft} onChange={(value) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        glandCleft: value,
                                            },
                                    index: index,
                                });
                            }}>
                                <Option value="低级别">低级别</Option>
                                <Option value="高级别">高级别</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '50%'}} defaultValue={Colposcopy.vessel.show} />
                            <Select size="small" style={{width: '50%'}} defaultValue={data.vessel} onChange={(value) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        vessel: value,
                                            },
                                    index: index,
                                });
                            }}>
                                <Option value="细点状">细点状</Option>
                                <Option value="粗点状">粗点状</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '50%'}} defaultValue={Colposcopy.inlay.show} />
                            <Select size="small" style={{width: '50%'}} defaultValue={data.inlay} onChange={(value) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        inlay: value,
                                            },
                                    index: index,
                                });
                            }}>
                                <Option value="粗">粗</Option>
                                <Option value="细">细</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '50%'}} defaultValue={Colposcopy.unusualVessel.show} />
                            <Select size="small" style={{width: '50%'}} defaultValue={data.unusualVessel} onChange={(value) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        unusualVessel: value,
                                            },
                                    index: index,
                                });
                            }}>
                                <Option value="有">有</Option>
                                <Option value="无">无</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '50%'}} defaultValue={Colposcopy.iodine.show} />
                            <Select size="small" style={{width: '50%'}} defaultValue={data.iodine} onChange={(value) => {
                                actions.pa_editSelPatientColposcopy({
                                    modify: {
                                        iodine: value,
                                            },
                                    index: index,
                                });
                            }}>
                                <Option value="着色">着色</Option>
                                <Option value="不着色">不着色</Option>
                            </Select>
                        </InputGroup>
                    </Col>
                </InputGroup>

                <InputGroup size="small" className={styles.infoRow}>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '20%'}} defaultValue={Colposcopy.vagina.show} />
                            <Input style={{width: '80%'}} defaultValue="" value={data.vagina} onChange={(e) => {
                                    actions.pa_editSelPatientColposcopy({
                                        modify: {
                                            vagina: e.target.value,
                                                },
                                        index: index,   
                                        }
                                    );
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compacts>
                            <Input disabled style={{width: '20%'}} defaultValue={Colposcopy.vulva.show} />
                            <Input style={{width: '80%'}} defaultValue="" value={data.vulva} onChange={(e) => {
                                    actions.pa_editSelPatientColposcopy({
                                        modify: {
                                            vulva: e.target.value,
                                                },
                                        index: index,   
                                        }
                                    );
                                }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact >
                            <Input disabled style={{width: '30%'}} defaultValue={Colposcopy.microscopicImage.show} />
                            <Input style={{width: '70%'}} defaultValue="" value={data.microscopicImage} onChange={(e) => {
                                    actions.pa_editSelPatientColposcopy({
                                        modify: {
                                            microscopicImage: e.target.value,
                                                },
                                        index: index,   
                                        }
                                    );
                                }}
                            />
                        </InputGroup>
                    </Col>
                </InputGroup>
            </Panel>
        );
    }

    renderTreat(data, index) {
        const {actions} = this.props;
        return (
            <Panel style={InnerPanelStyle} header="治疗">
                <InputGroup size="small" className={styles.infoRow}>
                    <DatePicker style={{width: '20%'}} 
                    defaultValue={data.date==''? null: moment(data.date, dateFormat)}
                        onChange={
                            (date, dateString) => {
                                actions.pa_editSelPatientTreat({
                                    modify: {
                                        date: dateString,
                                    },
                                    index: index,
                                });
                            }
                        }
                    />
                </InputGroup>

                <Row>
                    <Col span={2} style={{paddingTop: 5}}>
                        {Treat.laser.show}
                    </Col>
                    <Col span={22}>
                        <InputGroup size="small" className={styles.infoRow}>
                            <Col span={8}>
                                <InputGroup compact >
                                    <Input disabled style={{width: '30%'}} defaultValue={Treat.laser_place.show} />
                                    <Input style={{width: '70%'}} defaultValue="" value={data.laser_place} 
                                        onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    laser_place: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                                </InputGroup>
                            </Col>
                            <Col span={8}>
                                <InputGroup compacts>
                                    <Input disabled style={{width: '30%'}} defaultValue={Treat.laser_area.show} />
                                    <Input style={{width: '70%'}} defaultValue="" value={data.laser_area} onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    laser_area: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                                </InputGroup>
                            </Col>
                            <Col span={8}>
                                <InputGroup compact >
                                    <Input disabled style={{width: '30%'}} defaultValue={Treat.laser_other.show} />
                                    <Input style={{width: '70%'}} defaultValue="" value={data.laser_other} 
                                        onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    laser_other: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                                </InputGroup>
                            </Col>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col span={2} style={{marginTop: 5}}>
                        {Treat.LEEP.show}
                    </Col>
                    <Col span={22}>
                        <InputGroup size="small" className={styles.infoRow}>
                            <Col span={8}>
                                <InputGroup compact >
                                    <Input disabled style={{width: '30%'}} defaultValue={Treat.LEEP_1_length.show} />
                                    <Input style={{width: '70%'}} defaultValue="" addonAfter="cm" value={data.LEEP_1_length} 
                                        onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    LEEP_1_length: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                                </InputGroup>
                            </Col>
                            <Col span={8}>
                                <InputGroup compacts>
                                    <Input disabled style={{width: '30%'}} defaultValue={Treat.LEEP_1_diameter.show} />
                                    <Input style={{width: '70%'}} defaultValue="" addonAfter="cm" value={data.LEEP_1_diameter} 
                                        onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    LEEP_1_diameter: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                                </InputGroup>
                            </Col>
                            <Col span={8}>
                                <InputGroup compact >
                                    <Input disabled style={{width: '30%'}} defaultValue={Treat.LEEP_1_thickness.show} />
                                    <Input style={{width: '70%'}} defaultValue="" addonAfter="cm" value={data.LEEP_1_thickness} 
                                        onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    LEEP_1_thickness: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                                </InputGroup>
                            </Col>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col span={2}  />
                    <Col span={22}>
                        <InputGroup size="small" className={styles.infoRow}>
                            <Col span={24}>
                                <InputGroup compact >
                                    <Input disabled style={{width: '20%'}} defaultValue={Treat.LEEP_2.show} />
                                    <Input style={{width: '80%'}} defaultValue="" value={data.LEEP_2} 
                                        onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    LEEP_2: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                                </InputGroup>
                            </Col>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col span={2}  />
                    <Col span={22}>
                        <InputGroup size="small" className={styles.infoRow}>
                            <Col span={24}>
                                <InputGroup compact >
                                    <Input disabled style={{width: '20%'}} defaultValue={Treat.LEEP_other.show} />
                                    <Input style={{width: '80%'}} defaultValue="" value={data.LEEP_other} 
                                        onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    LEEP_other: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                                </InputGroup>
                            </Col>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col span={2} >{Treat.other.show}
                    </Col>
                    <Col span={22}>
                        <InputGroup size="small" className={styles.infoRow}>
                            <Col span={24}>
                                    <Input style={{width: '100%'}} defaultValue="" value={data.other} 
                                        onChange={(e) => {
                                            actions.pa_editSelPatientTreat({
                                                modify: {
                                                    other: e.target.value,
                                                        },
                                                index: index,   
                                                }
                                            );
                                        }}
                                    />  
                            </Col>
                        </InputGroup>
                    </Col>
                </Row>

            </Panel>
        );
    }
}

function mapStateToProps(state) {
    const {patient} = state;
    const {patientInfoList, selPatientInfo} = patient;
    return {
        patientInfoList,
        selPatientInfo,
    };
}

export default connectComponent({
    mapStateToProps,
    LayoutComponent: PatientPage,
});
