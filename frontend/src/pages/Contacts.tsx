import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

type Props = {};

const Contacts = (props: Props) => {
  return (
    <div style={{border:'1px solid white', padding:'20px 30px', maxWidth:'900px', margin:'auto', boxShadow: '0px 0px 12px 0px #b5b5b5'}}>
      <Typography.Title>Контакты</Typography.Title>
      <Row>
        <Col push={1}>
            <Typography.Text style={{fontSize:'120%'}} >Здравствуйте, я Ключников Андрей Николаевич, связаться со мной можно следующими способами:</Typography.Text>
          <div>
            VK:
            <Button
              type='link'
              onClick={() => window.open('https://vk.com/andrey_id', '_blank')}
            >
              Андрей Ключников
            </Button>
          </div>
          <div>Email:&nbsp;&nbsp;email</div>
          <div>Phone:&nbsp;&nbsp;9820193809321</div>
        </Col>
      </Row>
    </div>
  );
};

export default Contacts;
