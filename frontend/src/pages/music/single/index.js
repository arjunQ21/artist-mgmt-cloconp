import { HStack } from '@chakra-ui/react';
import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

function SingleMusicIndex () {
  const { musicId, artistListingId } = useParams();

  
  return (
    <>
      <HStack className='crud-heading
      '>
        <h2>Music#{ musicId }</h2>
        <HStack>
          <Link to={ `/artists-listing/${artistListingId}/music/${musicId}/edit` }>  Edit</Link>

        </HStack>
      </HStack>
      <Outlet />
    </>
  )
}

export default SingleMusicIndex