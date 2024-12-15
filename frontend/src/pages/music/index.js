import { HStack } from '@chakra-ui/react'
import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

function MusicsIndex () {
  const { artistListingId } = useParams();
  return (
    <>
      <HStack className='crud-heading' >
        <h2>Music from Artist#{ artistListingId }</h2>
        <Link to={ "/artists-listing/" + artistListingId +"/music/add"}>+ New</Link>
      </HStack>
      <Outlet />
    </>
  )
}

export default MusicsIndex