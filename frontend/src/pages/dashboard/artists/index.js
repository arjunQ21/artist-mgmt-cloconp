import { HStack } from '@chakra-ui/react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function ArtistsIndex () {
  return (
    <>
      <HStack className='crud-heading' >
        <h2>Artists</h2>
        <Link to="/dashboard/artists/add">+ New</Link>
      </HStack>
      <Outlet />
    </>
  )
}

export default ArtistsIndex