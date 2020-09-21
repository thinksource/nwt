import React, {useState, FormEvent} from 'react';
import Router from 'next/router';
import fetcher from '../libs/fetcher'
import * as Yup from 'yup';
import { Typography } from '@material-ui/core';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'To Long')
})
const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const json = JSON.stringify({email,password,passwordConfirmation});
    const myfetcher = fetcher('post', json)
    myfetcher('/api/user/signup')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.id) {
          console.log()
          setSignupError("Sign Up successful")
          Router.push('/login');
        }
      });
  }
  return (
    
    <form onSubmit={handleSubmit}>
        <Typography variant="h3">Sign Up</Typography>
      <label>{signupError}</label>
      <label htmlFor="email">
        email
      </label>
      <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
        />

      <br />

      <label>
        password
      </label>
      <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
        />
      <br />
      <label>
        password again:
        <input
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          name="password"
          type="password"
        />
      </label>

      <br />

      <input type="submit" value="SignUp" />
      {signupError && <p style={{color: 'red'}}>{signupError}</p>}
    </form>
  );
};

export default Signup;