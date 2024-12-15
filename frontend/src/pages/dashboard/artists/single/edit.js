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


const genders = ['male', 'female', 'others'];
const initialFormData = {
  "name": "",
  "dob": "",
  "gender": 'm',
  "address": "",
  "first_release_year": "",
  "no_of_albums_released": "",
}


function SingleArtistEdit () {

  const [formData, setFormData] = useState(initialFormData)

  const { artistId } = useParams();
  const { loading, singleResource, fetchSingle } = useFetchSingle()
  const { loading: editLoading, response, fetchAPI, apiErrorInField } = useAPIFetch();

  useEffect(function () {
    if (artistId) {
      fetchSingle("/artists/" + artistId)
      // console.log("Fetching Single Resource: ", "/artists/" + artistId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId])

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
      uri: "/artists/" + artistId, options: {
        method: "PUT",
        body: JSON.stringify(toSend)
      },
    },)
  }

  useEffect(() => {
    // console.log({response})
    if (response && response.status === 200) {

      toaster.create({
        title: "Artist Edited",
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

          <h2> Edit Artist Details </h2>
          <form>
            <Field required label="Name" { ...apiErrorInField('name') }>
              <Input type='text' required name='name' value={ formData.name } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Date of Birth" { ...apiErrorInField('dob') }>
              <Input type='date' required name='dob' value={ moment(formData.dob).format("YYYY-MM-DD") } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Gender" { ...apiErrorInField('gender') }>

              <RadioGroup defaultValue={ formData.gender }>
                <HStack gap={ '6' }>

                  { genders.map((e) => (<Radio onClick={ () => setGender(e[0]) } key={ e[0] } value={ e[0] }><Text textTransform={ 'capitalize' }> { e } </Text></Radio>)) }
                </HStack>

              </RadioGroup>
            </Field>
            <Field required label="Address" { ...apiErrorInField('address') }>
              <Input type='text' required name='address' value={ formData.address } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="First Release Year" { ...apiErrorInField('first_release_year') }>
              <Input type='email' required name='first_release_year' value={ formData.first_release_year } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Released Albums" { ...apiErrorInField('no_of_albums_released') }>
              <Input type='number' required name='no_of_albums_released' value={ formData.no_of_albums_released } onChange={ handleChange } ></Input>
            </Field>


            <Field>
              <HStack>
                <Button loadingText="SingleArtistEditing..." loading={ editLoading } onClick={ (e) => handleSubmit(e) }>Edit Artist</Button>
              </HStack>
            </Field>



          </form>
        </VStack>
      ) }
      { loading && (<Loading />) }
    </>
  )
}

export default SingleArtistEdit