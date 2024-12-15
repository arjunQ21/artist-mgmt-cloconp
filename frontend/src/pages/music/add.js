import { HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { Field } from 'src/components/ui/field';
import { Radio, RadioGroup } from "src/components/ui/radio";
import { toaster } from 'src/components/ui/toaster';
import useAPIFetch from 'src/hooks/useAPIFetch';



const genre = ['rnb', 'country', 'classic', 'rock', 'jazz'];
const initialFormData = {
  "title": "",
  "album_name": "",
  "genre": genre[2],
}


function MusicAdd () {

  const { artistListingId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData)

  const { loading, response, fetchAPI, apiErrorInField } = useAPIFetch();

  function handleSubmit (event) {
    event.preventDefault();
    // console.log("Submitting: ", formData);
    const toSend = { ...formData, artist_id: parseInt(artistListingId) }
    fetchAPI({
      uri: "/musics", options: {
        method: "POST",
        body: JSON.stringify(toSend)
      },
    },)
  }

  useEffect(() => {
    if (response && response.status === 201) {

      toaster.create({
        title: "Music Added",
        type: "success",
        duration: 4000
      })
      navigate("../")
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





  return (
    <VStack width={ '100%' } alignItems={ 'flex-start' }>

      <h2> Add new Music </h2>
      <form>
        <Field required label="Title" { ...apiErrorInField('title') }>
          <Input type='text' required name='title' value={ valueOf('title') } onChange={ handleChange } ></Input>
        </Field>
        <Field required label="Album Name" { ...apiErrorInField('album_name') }>
          <Input type='text' required name='album_name' value={ valueOf('album_name') } onChange={ handleChange } ></Input>
        </Field>

        <Field required label="Genre" { ...apiErrorInField('genre') }>

          <RadioGroup defaultValue={ formData.genre }>
            <HStack gap={ '6' }>
              { genre.map((e) => (<Radio onClick={ () => setFormData((fd) => ({ ...fd, genre: e })) } key={ e } value={ e }><Text textTransform={ 'capitalize' }> { e } </Text></Radio>)) }
            </HStack>

          </RadioGroup>
        </Field>


        <Field>
          <HStack>
            <Button loadingText="Adding Music..." loading={ loading } onClick={ (e) => handleSubmit(e) }>Add Music</Button>
          </HStack>
        </Field>
      </form>
    </VStack>
  )
}

export default MusicAdd