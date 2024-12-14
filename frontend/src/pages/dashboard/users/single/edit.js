import { HStack, Input, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from 'src/components/custom/loading';
import { Button } from 'src/components/ui/button';
import { Field } from 'src/components/ui/field';
import { Radio, RadioGroup } from "src/components/ui/radio";
import { toaster } from 'src/components/ui/toaster';
import useAPIFetch from 'src/hooks/useAPIFetch';
import useFetchSingle from 'src/hooks/useFetchSingle';


const roles = ['super_admin', 'artist', 'artist_manager']
const genders = ['male', 'female', 'others'];
const initialFormData = {
  "first_name": "",
  "last_name": "",
  "email": "",
  "phone": "",
  "dob": "",
  "gender": 'm',
  "address": "",
  "password": "",
  "role": roles[1],
  "confirm_pw": "",
}


function SingleUserEdit () {

  const [formData, setFormData] = useState(initialFormData)

  const { userId } = useParams();
  const { loading, singleResource, fetchSingle } = useFetchSingle()
  const { loading: editLoading, response, fetchAPI, apiErrorInField } = useAPIFetch();

  useEffect(function () {
    if (userId) {
      fetchSingle("/users/" + userId)
      // console.log("Fetching Single Resource: ", "/users/" + userId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(function () {
    if (singleResource) {
      setFormData(singleResource)
    }
  }, [singleResource])

  function handleSubmit (event) {
    event.preventDefault();
    // console.log("Submitting: ", formData);
    const toSend = { ...formData, ...{ dob: moment(formData.dob).toDate() } }
    delete toSend.id;
    delete toSend.created_at;
    delete toSend.updated_at;
    fetchAPI({
      uri: "/users/" + userId, options: {
        method: "PUT",
        body: JSON.stringify(toSend)
      },
    },)
  }

  useEffect(() => {
    console.log({response})
    if (response && response.status === 200) {

      toaster.create({
        title: "User Edited",
        type: "success",
        duration: 4000
      })
    }
  }, [response])

  function handleChange (event) {
    setFormData((oldFD) => {
      let newFD = { ...oldFD }
      newFD[event.target.name] = event.target.value
      return newFD;
    });
  }

  function setGender (value) {
    setFormData((oldFD) => {
      let newFD = { ...oldFD }
      newFD['gender'] = value
      return newFD;
    });
  }



  return (
    <>
      { singleResource && (
        <VStack width={ '100%' } alignItems={ 'flex-start' }>

          <h2> Edit User Details </h2>
          <form>
            <Field required label="First Name" { ...apiErrorInField('first_name') }>
              <Input type='text' required name='first_name' value={ formData.first_name } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Last Name" { ...apiErrorInField('last_name') }>
              <Input type='text' required name='last_name' value={ formData.last_name } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Email" { ...apiErrorInField('email') }>
              <Input type='email' required name='email' value={ formData.email } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Phone" { ...apiErrorInField('phone') }>
              <Input type='number' required name='phone' value={ formData.phone } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Date of Birth" { ...apiErrorInField('dob') }>
              <Input type='date' required name='dob' value={ moment( formData.dob).format("YYYY-MM-DD") } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Gender" { ...apiErrorInField('gender') }>

              <RadioGroup defaultValue = {formData.gender}>
                <HStack gap={ '6' }>

                  { genders.map((e) => (<Radio onClick={ () => setGender(e[0]) } key={ e[0] } value={ e[0] }><Text textTransform={ 'capitalize' }> { e } </Text></Radio>)) }
                </HStack>

              </RadioGroup>
            </Field>

            <Field required label="Address" { ...apiErrorInField('address') }>
              <Input type='text' required name='address' value={ formData.address } onChange={ handleChange } ></Input>
            </Field>

            <Field label={ "Role" } { ...apiErrorInField('role') }>
              <select value={ formData.role } onChange={ handleChange } name='role' style={ { border: "1px solid #999", 'padding': "0.5em", borderRadius: "5px" } }>
                { roles.map(role => (<option key={ role } value={ role } style={ { textTransform: "capitalize" } }>{ role.split("_").join(" ") }</option>)) }
              </select>
            </Field>

            <Field>
              <HStack>
                <Button loadingText="SingleUserEditing..." loading={ editLoading } onClick={ (e) => handleSubmit(e) }>Edit User</Button>
              </HStack>
            </Field>



          </form>
        </VStack>
      ) }
      {loading && (<Loading />)}
    </>
  )
}

export default SingleUserEdit