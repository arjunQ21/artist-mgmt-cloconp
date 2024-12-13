import { HStack } from '@chakra-ui/react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function UsersIndex () {
  return (
    <>
      <HStack className='crud-heading' >
        <h2>Users</h2>
        <Link to="/dashboard/users/add">+ New</Link>
      </HStack>
      <Outlet />
    </>
  )
}

export default UsersIndex