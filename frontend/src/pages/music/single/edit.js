import { HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from 'src/components/custom/loading';
import { Button } from 'src/components/ui/button';
import { Field } from 'src/components/ui/field';
import { Radio, RadioGroup } from "src/components/ui/radio";
import { toaster } from 'src/components/ui/toaster';
import useAPIFetch from 'src/hooks/useAPIFetch';
import useFetchSingle from 'src/hooks/useFetchSingle';


const genre = ['rnb', 'country', 'classic', 'rock', 'jazz'];
const initialFormData = {
  "title": "",
  "album_name": "",
  "genre": "",
}


function SingleMusicEdit () {

  const [formData, setFormData] = useState(initialFormData)

  const { musicId } = useParams();
  const { loading, singleResource, fetchSingle } = useFetchSingle()
  const { loading: editLoading, response, fetchAPI, apiErrorInField } = useAPIFetch();

  useEffect(function () {
    if (musicId) {
      fetchSingle("/musics/" + musicId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicId])

  useEffect(function () {
    if (singleResource) {
      setFormData(singleResource)
      console.log("Set: ", singleResource)
    }
  }, [singleResource])

  function handleSubmit (event) {
    event.preventDefault();
    // console.log("Submitting: ", formData);
    const toSend = { ...formData }
    delete toSend.artist_id;
    delete toSend.id;
    delete toSend.created_at;
    delete toSend.updated_at;
    fetchAPI({
      uri: "/musics/" + musicId, options: {
        method: "PUT",
        body: JSON.stringify(toSend)
      },
    },)
  }

  useEffect(() => {
    // console.log({response})
    if (response && response.status === 200) {

      toaster.create({
        title: "Music Edited",
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



  return (
    <>
      { singleResource && (
        <VStack width={ '100%' } alignItems={ 'flex-start' }>

          <h2> Edit Music Details </h2>
          <form>
            <Field required label="Title" { ...apiErrorInField('title') }>
              <Input type='text' required name='title' value={ formData.title } onChange={ handleChange } ></Input>
            </Field>
            <Field required label="Album name" { ...apiErrorInField('album_name') }>
              <Input type='text' required name='album_name' value={ formData.album_name } onChange={ handleChange } ></Input>
            </Field>
          
            <Field required label="Genre" { ...apiErrorInField('genre') }>

              <RadioGroup defaultValue={ formData.genre }>
                <HStack gap={ '6' }>

                  { genre.map((e) => (<Radio onClick={ () => setFormData((fd) =>( {...fd, genre: e}) )} key={ e } value={ e }><Text textTransform={ 'capitalize' }> { e } </Text></Radio>)) }
                </HStack>

              </RadioGroup>
            </Field>
          


            <Field>
              <HStack>
                <Button loadingText="SingleMusicEditing..." loading={ editLoading } onClick={ (e) => handleSubmit(e) }>Edit Music</Button>
              </HStack>
            </Field>



          </form>
        </VStack>
      ) }
      { loading && (<Loading />) }
    </>
  )
}

export default SingleMusicEdit