import { Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api';

type Props = {
  loginIn: (user: string) => void
};

const Login = ({loginIn}: Props) => {
  const [user, setUser] = useState({ login: '', pass: '' });
  const navigator = useNavigate()
  const submit = () => {
    login(user)
      .then((res) => {
        localStorage.setItem('user','true')
        loginIn('true')
        navigator('/')
      })
      .catch((err) => console.log(err));
  };

  return (
    <Row justify='center'>
      <Col>
        <div className='loginForm'>
          <div className='row'>
            Логин
            <Input
              style={{ marginLeft: '9px' }}
              onChange={(event) =>
                setUser({ ...user, login: event.target.value })
              }
            ></Input>
          </div>
          <div className='row'>
            Пароль
            <Input
              type={'password'}
              onChange={(event) =>
                setUser({ ...user, pass: event.target.value })
              }
            ></Input>
          </div>

          <Button className='btnSubmit' onClick={submit}>
            Войти
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
