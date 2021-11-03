import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="loginBox">
      <h2>Login</h2>
      <br/> <br/>
      <div className="input-group">
        <input className="form-control" type="text" {...username} autoComplete="new-password" placeholder="Username"/>
      </div>
      <br/>
      <div style={{ marginTop: 10 }}>
        <input className="form-control" type="password" {...password} autoComplete="new-password"  placeholder="Password"/>
      </div>
      <br/>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input className="btn btn-primary" type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;