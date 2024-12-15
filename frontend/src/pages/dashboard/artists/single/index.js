import { Button, HStack } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import useAPIFetch from 'src/hooks/useAPIFetch';

function SingleArtistIndex () {
  const { artistId } = useParams();

  const navigate = useNavigate();
  const { loading: deleteLoading, parsedResponse, fetchAPI } = useAPIFetch();

  function handleDelete () {
      fetchAPI({
          uri: "/artists/" + artistId, options: {
              method: "DELETE"
          }
      })
  }

  useEffect(function () {
      if (parsedResponse && parsedResponse.status === 'success') {
          navigate("../")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedResponse])
  return (
    <>
      <HStack className='crud-heading
      '>
        <h2>Artist#{ artistId }</h2>
        <HStack>
        <Link to={'/artists-listing/'+ artistId + "/music"}>View Music</Link>
        <Button loading={ deleteLoading } loadingText="Deleting..." color='red' variant='outline' onClick={ handleDelete }>Delete this Artist</Button>
        <Link  to={ `/dashboard/artists/${artistId}/edit` }>  Edit</Link>
        </HStack>
      </HStack>
      <Outlet />
    </>
  )
}

export default SingleArtistIndex