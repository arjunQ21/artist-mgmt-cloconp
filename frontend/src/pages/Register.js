import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Field } from 'src/components/ui/field';
import { Radio, RadioGroup } from "src/components/ui/radio";

const unInputtedValue = "-";

const initialFormData = {
  "first_name": unInputtedValue,
  "last_name": unInputtedValue,
  "email": unInputtedValue,
  "phone": unInputtedValue,
  "dob": unInputtedValue,
  "gender": unInputtedValue,
  "address": unInputtedValue,
  "password": unInputtedValue,
  "confirm_pw": unInputtedValue,
}

const genders = ['male', 'female', 'others'];


function Register () {

  const [formData, setFormData] = useState(initialFormData)

  function handleSubmit (event) {
    event.preventDefault();
    console.log("Submitted: ", event, formData);
  }

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
      <form  >

        <Field required label="First Name" invalid={ !isNotEmpty('first_name') } errorText="Required">
          <Input type='text' required name='first_name' value={ valueOf('first_name') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Last Name" invalid={ !isNotEmpty('last_name') } errorText="Required">
          <Input type='text' required name='last_name' value={ valueOf('last_name') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Email" invalid={ !isNotEmpty('email') } errorText="Valid email needed.">
          <Input type='email' required name='email' value={ valueOf('email') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Phone" invalid={ !isNotEmpty('phone') } errorText="Valid phone needed.">
          <Input type='number' required name='phone' value={ valueOf('phone') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Date of Birth" invalid={ !isNotEmpty('dob') } errorText="Required.">
          <Input type='date' required name='dob' value={ valueOf('dob') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Gender">

          <RadioGroup defaultValue='o'>
            <HStack gap={ '6' }>

              { genders.map((e) => (<Radio onClick = {() => setGender(e[0])} key={ e[0] } value={ e[0] }><Text textTransform={ 'capitalize' }> { e } </Text></Radio>)) }
            </HStack>

          </RadioGroup>
        </Field>

        <Field required label="Address" invalid={ !isNotEmpty('address') } errorText="Required.">
          <Input type='text' required name='address' value={ valueOf('address') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Set a Password" invalid={ !isNotEmpty('password') || formData['password'].trim().length < 8 } errorText="At least 8 character long password needed.">
          <Input type='password' required name='password' value={ valueOf('password') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Confirm Password" invalid={ formData['password'] !== formData['confirm_pw'] } errorText="Passwords dont match">
          <Input type='password' required name='confirm_pw' value={ valueOf('confirm_pw') } onChange={ handleChange } ></Input>
        </Field>

        <Field>
          <Button disabled={!goodToSubmit} onClick={ handleSubmit }>Register</Button>
        </Field>

      </form>
    </VStack>
  )
}

export default Register