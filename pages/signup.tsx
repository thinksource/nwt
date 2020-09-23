import React, {useState} from 'react';
import Router from 'next/router';
import fetcher from '../libs/fetcher'
import * as Yup from 'yup';
import { Button, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import Captcha from "../components/Captcha";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { red, green} from '@material-ui/core/colors';
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'To Long'),
  passwordConfirmation: Yup.string().min(6, 'Too Short!').max(50, 'To Long')
})
const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [captcha, setCaptcha] = useState("");
  const [correct, setCorrect] = useState("")
  const handleFocusOut=(e:React.MouseEvent<HTMLInputElement>)=>{
    console.log(e.currentTarget.value)
    console.log(captcha)
    if(e.currentTarget.value==captcha){
      setCorrect("Yes")
    }else{
      setCorrect("No")
    }
  }
  return (
    <Formik initialValues={{
      email:'',
      password:'',
      passwordConfirmation:'',
      reCap:''
    }}
    validationSchema={SignupSchema}
    validate = {function (values) {
      const errors: { [id: string]: string; } = {};
      if (values.password !== values.passwordConfirmation) {
        errors['form'] = 'password confirmation must be same';
        return errors;
      }
      return errors;
    }}
    onSubmit = {async (values)=>{
      if(captcha==values.reCap){
        const fetchbuild = fetcher('post', JSON.stringify(values))
        const result = await fetchbuild('/api/user/signup')
        if(result.ok){
          // const rjson = await result.json()
          setSignupError("Sign Up Successful")
          Router.push('/login')
        }else if(result.status >= 400){
          const error = await result.json()
          return error
        }
      }else{
        setSignupError("Must input correct Captcha!")
      }

    }}
    >
    {({errors})=>(
    <Form>
        <Typography variant="h3" gutterBottom>Sign Up</Typography>
      <ul>
      <li>
      <label>{signupError}</label>
      </li>
      <li>
      <label htmlFor="email">
        email:
      </label>
      <Field name="email" type="email"/>
      </li>
      
      {errors.email?(<li>{errors.email}</li>):null}
      <li>
      <label>
        password:
      </label>
      <Field name="password" type="password"></Field>
      </li>
      {errors.password?(<li>{errors.password}</li>):null}
      <li>
      <label>
        password again:
        <Field name="passwordConfirmation" type="password"></Field>
      </label>
      </li>
      {errors.passwordConfirmation?(<li>{errors.passwordConfirmation}</li>):null}
      <li>
        <Captcha charNum={4} height={30} onChange={(e)=>setCaptcha(e)}/>
      </li>
      <li>
      <Field name="reCap" type="input" size='4' maxLength="4" onBlur={handleFocusOut}/>
      {correct=="Yes"?<CheckCircleIcon  style={{ color: green[500] }}/>: null}
      {correct=="No"?<CancelIcon  style={{ color: red[500] }}/>: null}
      {/* <input type="submit" value="SignUp" /> */}
      </li>
      <li>
      <Button variant="contained" type="submit">SignUp</Button>
      </li>
      {signupError && <p style={{color: 'red'}}>{signupError}</p>}
      </ul>
    </Form>
    )}
    </Formik>
  );
};

export default Signup;