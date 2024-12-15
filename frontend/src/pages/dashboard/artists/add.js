import { HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { Field } from 'src/components/ui/field';
import { Radio, RadioGroup } from "src/components/ui/radio";
import { toaster } from 'src/components/ui/toaster';
import useAPIFetch from 'src/hooks/useAPIFetch';



const genders = ['male', 'female', 'others'];
const initialFormData = {
  "name": "",
  "dob": "",
  "gender": genders[0][0],
  "address": "",
  "first_release_year": "",
  "no_of_albums_released": 0
}


function ArtistAdd () {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData)

  const { loading, response, fetchAPI, apiErrorInField } = useAPIFetch();

  function handleSubmit (event) {
    event.preventDefault();
    // console.log("Submitting: ", formData);
    const toSend = { ...formData }
    fetchAPI({
      uri: "/artists", options: {
        method: "POST",
        body: JSON.stringify(toSend)
      },
    },)
  }

  useEffect(() => {
    if (response && response.status === 201) {

      toaster.create({
        title: "Artist Added",
        type: "success",
        duration: 4000
      })
      navigate("/dashboard/artists")
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

  function valueOf (fieldName) {
    if (formData[fieldName] === "") return "";
    else return formData[fieldName];
  }

  function setGender (value) {
    setFormData((oldFD) => {
      let newFD = { ...oldFD }
      newFD['gender'] = value
      return newFD;
    });
  }





  return (
    <VStack width={ '100%' } alignItems={ 'flex-start' }>

      <h2> Add new Artist </h2>
      <form>
        <Field required label="Name" { ...apiErrorInField('name') }>
          <Input type='text' required name='name' value={ valueOf('name') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Date of Birth" { ...apiErrorInField('dob') }>
          <Input type='date' required name='dob' value={ valueOf('dob') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Gender" { ...apiErrorInField('gender') }>

          <RadioGroup defaultValue={formData.gender}>
            <HStack gap={ '6' }>

              { genders.map((e) => (<Radio onClick={ () => setGender(e[0]) } key={ e[0] } value={ e[0] }><Text textTransform={ 'capitalize' }> { e } </Text></Radio>)) }
            </HStack>

          </RadioGroup>
        </Field>

        <Field required label="Address" { ...apiErrorInField('address') }>
          <Input type='text' required name='address' value={ valueOf('address') } onChange={ handleChange } ></Input>
        </Field>

        <Field required label="First Release Year" { ...apiErrorInField('first_release_year') }>
          <Input type='number' required name='first_release_year' value={ valueOf('first_release_year') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="No of Albums Released" { ...apiErrorInField('no_of_albums_released') }>
          <Input type='number' required name='no_of_albums_released' value={ valueOf('no_of_albums_released') } onChange={ handleChange } ></Input>
        </Field>
        <Field>
          <HStack>
            <Button loadingText="Adding Artist..." loading={ loading }  onClick={ (e) => handleSubmit(e) }>Add Artist</Button>
          </HStack>
        </Field>
      </form>
    </VStack>
  )
}

export default ArtistAdd