import { HStack, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { Field } from 'src/components/ui/field';
import { toaster } from 'src/components/ui/toaster';
import useAPIFetch from 'src/hooks/useAPIFetch';
import { login } from 'src/state/slices/auth';


const initialFormData = {

  "email": "",
  "password": "",
}


function Login () {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData)

  const { loading, response, parsedResponse, fetchAPI, apiErrorInField } = useAPIFetch();

  function handleSubmit (event) {
    event.preventDefault();
    fetchAPI({
      uri: "/auth/login", options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      },
    },)
  }

  useEffect(() => {
    if (response && response.status === 200) {

      toaster.create({
        title: "Logged In",
        type: "success",
        duration: 4000
      })
      dispatch(login(parsedResponse.data))
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  function handleChange (event) {
    setFormData((oldFD) => {
      let newFD = { ...oldFD }
      newFD[event.target.name] = event.target.value
      return newFD;
    });
  }

  return (
    <VStack width={ '100%' } alignItems={ 'flex-start' }>

      <h2> Login to your account </h2>
      <form>

        <Field required label="Email" { ...apiErrorInField('email') }>
          <Input type='email' required name='email' value={ formData.email } onChange={ handleChange } ></Input>
        </Field>

        <Field required label="Password" { ...apiErrorInField('password') }>
          <Input type='password' required name='password' value={ formData.password } onChange={ handleChange } ></Input>
        </Field>

        <Field>
          <HStack>
            <Button loading={ loading } loadingText={ 'logging In' } onClick={ (e) => handleSubmit(e) }>Login</Button>
          </HStack>
        </Field>

      </form>
      <hr />
      <p> <Link to={ '/register' }>Create a new Account</Link> </p>
    </VStack>
  )
}

export default Login