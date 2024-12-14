import { HStack } from '@chakra-ui/react';
import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

function SingleUserIndex () {
  const { userId } = useParams();
  return (
    <>
      <HStack className='crud-heading
      '>
        <h2>User#{ userId }</h2>
        <Link to={ `/dashboard/users/${userId}/edit` }>  Edit</Link>
      </HStack>
      <Outlet />
    </>
  )
}

export default SingleUserIndex