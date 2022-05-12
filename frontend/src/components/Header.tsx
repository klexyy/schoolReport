import { Button, Col, Layout, Menu, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

type Props ={ 
  user: string
  logout: () => void
}

const Header = ({user, logout}: Props) => {
  // const [user, setUser] = useState(localStorage.getItem('user'));

  return (
    <Row
      align='middle'
      justify='space-between'
      style={{ margin: '0.5em 0 15px 0' }}
    >
      <Link to='/'>
        <Typography.Title style={{ margin: 0 }}>Телепрограммы</Typography.Title>
      </Link>
      {!user ? (
        <Link to='/login' style={{ padding: 'auto' }}>
          Войти
        </Link>
      ) : (
        <Button
          style={{ padding: 'auto' }}
          onClick={logout}
        >
          Выйти
        </Button>
      )}
    </Row>
  );
};
export default Header;
