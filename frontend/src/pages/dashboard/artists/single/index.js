import { HStack } from '@chakra-ui/react';
import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

function SingleArtistIndex () {
  const { artistId } = useParams();
  return (
    <>
      <HStack className='crud-heading
      '>
        <h2>Artist#{ artistId }</h2>
        <Link to={ `/dashboard/artists/${artistId}/edit` }>  Edit</Link>
      </HStack>
      <Outlet />
    </>
  )
}

export default SingleArtistIndex