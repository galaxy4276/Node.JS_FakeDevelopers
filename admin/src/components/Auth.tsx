import React, {useCallback, useState} from 'react';
import { Card, Input, Button } from 'antd';
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import '../scss/auth.scss';

const AuthComp = (): any => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const CardCSS = {
    margin: 'auto',
    marginTop: 300,
  };

  const changeUserId = useCallback((e) => {
    setUserId(e.target.value);
  }, [userId, setUserId]);

  const changeUserPw = useCallback((e) => {
    setUserPw(e.target.value);
  }, [userPw, setUserPw]);

  return (
    <Card title="관리자 페이지" style={CardCSS}>
      <Input
        size="large"
        placeholder="아이디"
        prefix={<UserOutlined/>}
        onChange={changeUserId}
      />
      <Input.Password
        size="large"
        placeholder="비밀번호"
        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
        prefix={<LockOutlined/>}
        onChange={changeUserPw}
      />
      <Button
        type="primary"
        icon={<PoweroffOutlined/>}
        style={{float: "right"}}
      > 로그인하기 </Button>
    </Card>
  );
}

export default AuthComp;