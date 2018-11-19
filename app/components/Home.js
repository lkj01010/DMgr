// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

// import { Button, Checkbox, Form } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;
  
  render() {
    return (
      <div className={styles.container} data-tid="container">
         <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Photos
            </Typography>
          </Toolbar>
        </AppBar> 
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        <Button variant="contained" color="primary">Submit</Button>
      </div>
    );
  }
}
