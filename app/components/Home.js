// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

// import { Button, Checkbox, Form } from 'semantic-ui-react'

// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

import { DatePicker, Table } from 'antd';
import 'antd/dist/antd.css';


type Props = {};

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

export default class Home extends Component<Props> {
  props: Props;
  
  render() {
    return (
      <div>
         
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        <Table dataSource={dataSource} columns={columns} />
        <DatePicker />
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className={styles.container} data-tid="container">
  //        <DatePicker />
  //       <h2>Home</h2>
  //       <Link to={routes.COUNTER}>to Counter</Link>
  //       <Table dataSource={dataSource} columns={columns} />
  //     </div>
  //   );
  // }
}
