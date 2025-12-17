import React, { useState } from 'react';
import axios from 'axios';

function AuthForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const submit = async () => {
    const url = isRegister ? '/api/auth/register' : '/api/auth/login';
    const res = await axios.post(`http://localhost:5000${url}`, { username, password });
    if (!isRegister) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      onLogin(res.data.role);
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Логин" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Пароль" />
      <button onClick={submit}>{isRegister ? 'Зарегистрироваться' : 'Войти'}</button>
      <button onClick={()=>setIsRegister(!isRegister)}>
        {isRegister ? 'У меня есть аккаунт' : 'Регистрация'}
      </button>
    </div>
  );
}

export default AuthForm;
