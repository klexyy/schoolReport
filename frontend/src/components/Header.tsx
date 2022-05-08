import {Col, Layout, Menu, Row} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <Row align='middle' justify='space-between' style={{margin: '0.5em 0 15px 0'}}>
    <Typography.Title style={{margin: 0}}>Телепрограммы</Typography.Title>
    <Link to='/login' style={{padding:'auto'}}>Войти</Link>      
    </Row>
  );
};
export default Header;
