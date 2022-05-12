import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { Layout } from 'antd';
import Header from './components/Header';
import Login from './pages/Login';
import { useLocalStorage } from 'usehooks-ts';

function App() {
  const [user,setUser] = useState<string>(localStorage.getItem('user') as string)
  const logout = () => {
    setUser('')
    localStorage.removeItem('user')
  }
  return (
    <BrowserRouter>
      <Layout>
        <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Layout.Content
            style={{ padding: '10px 160px' }}
          >
            
            <Header user={user} logout={logout}/>
            <Routes>
              <Route path='/' element={<Main isLogin={user}/>} />
              <Route path='/login' element={<Login loginIn={setUser}/>} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
