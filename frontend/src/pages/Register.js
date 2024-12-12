import {  HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { Field } from 'src/components/ui/field';
import { Radio, RadioGroup } from "src/components/ui/radio";
import { toaster } from 'src/components/ui/toaster';
import useAPIFetch from 'src/hooks/useAPIFetch';

const unInputtedValue = "";

const roles = ['super_admin', 'artist', 'artist manager']
const genders = ['male', 'female', 'others'];
const initialFormData = {
  "first_name": unInputtedValue,
  "last_name": unInputtedValue,
  "email": unInputtedValue,
  "phone": unInputtedValue,
  "dob": unInputtedValue,
  "gender": unInputtedValue,
  "address": unInputtedValue,
  "password": unInputtedValue,
  "role": roles[1],
  "confirm_pw": unInputtedValue,
}


function Register () {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData)

  const { loading, response, fetchAPI, apiErrorInField } = useAPIFetch();

  function handleSubmit (event) {
    event.preventDefault();
    // console.log("Submitting: ", formData);
    const toSend = { ...formData }
    delete toSend.confirm_pw
    fetchAPI({
      uri: "/auth/register", options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSend)
      },
    },)
  }

  useEffect(() => {
    if ( response && response.status === 201) {
      
      toaster.create({
        title: "User Registered",
        type: "success",
        duration: 4000
      })
      navigate("/login")
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

  function isNotEmpty (fieldName) {
    if (formData[fieldName] === unInputtedValue) return true;
    else return formData[fieldName].trim().length > 0;
  }

  function valueOf (fieldName) {
    if (formData[fieldName] === unInputtedValue) return "";
    else return formData[fieldName];
  }

  function setGender (value) {
    setFormData((oldFD) => {
      let newFD = { ...oldFD }
      newFD['gender'] = value
      return newFD;
    });
  }

  function goodToSubmit () {
    const keys = Object.keys(initialFormData)
    keys.pop();
    return keys.every((i) => isNotEmpty(i));
  }



  return (
    <VStack width={ '100%' } alignItems={ 'flex-start' }>

      <h2> Register a new Account </h2>
      <form>
        <Field required label="First Name" { ...apiErrorInField('first_name') }>
          <Input type='text' required name='first_name' value={ valueOf('first_name') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Last Name" { ...apiErrorInField('last_name') }>
          <Input type='text' required name='last_name' value={ valueOf('last_name') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Email" { ...apiErrorInField('email') }>
          <Input type='email' required name='email' value={ valueOf('email') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Phone" { ...apiErrorInField('phone') }>
          <Input type='number' required name='phone' value={ valueOf('phone') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Date of Birth" { ...apiErrorInField('dob') }>
          <Input type='date' required name='dob' value={ valueOf('dob') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Gender" { ...apiErrorInField('gender') }>

          <RadioGroup defaultValue='o'>
            <HStack gap={ '6' }>

              { genders.map((e) => (<Radio onClick={ () => setGender(e[0]) } key={ e[0] } value={ e[0] }><Text textTransform={ 'capitalize' }> { e } </Text></Radio>)) }
            </HStack>

          </RadioGroup>
        </Field>

        <Field required label="Address" { ...apiErrorInField('address') }>
          <Input type='text' required name='address' value={ valueOf('address') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Set a Password" { ...apiErrorInField('password') }>
          <Input type='password' required name='password' value={ valueOf('password') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Confirm Password" invalid={ formData['password'] !== formData['confirm_pw'] } errorText="Passwords dont match">
          <Input type='password' required name='confirm_pw' value={ valueOf('confirm_pw') } onChange={ handleChange } ></Input>
        </Field>

        <Field label="Register As:" { ...apiErrorInField('role') }>
          <select value={ formData.role } onChange={ handleChange } name='role' style={ { border: "1px solid #999", 'padding': "0.5em", borderRadius: "5px" } }>
            { roles.map(role => (<option key={ role } value={ role } style={ { textTransform: "capitalize" } }>{ role.split("_").join(" ") }</option>)) }
          </select>
        </Field>

        <Field>
          <HStack>
            <Button loadingText="Registering..." loading={ loading } disabled={ !goodToSubmit } onClick={ (e) => handleSubmit(e) }>Register</Button>
          </HStack>
        </Field>



      </form>
    </VStack>
  )
}

export default Register