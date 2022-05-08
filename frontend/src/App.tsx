import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { Layout } from 'antd';
import Header from './components/Header';
import Contacts from './pages/Contacts';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Layout.Content
            style={{ padding: '10px 160px' }}
          >
            <Header />
            <Routes>
              <Route path='/' element={<Main />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
