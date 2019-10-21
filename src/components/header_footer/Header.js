import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './header.css'
export default class Header extends Component {
  

 render() {
    return (
      <div className='root'>
      <AppBar position="static" style = {{padding: '5px 0px', backgroundColor: '#1890FF'}}>
        <Toolbar>
          <Typography variant="h6" className='title'>
            Jude's Challenge One
          </Typography>          
        </Toolbar>
      </AppBar>
    </div>
    );
 }
}
