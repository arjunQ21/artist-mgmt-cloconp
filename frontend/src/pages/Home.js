import { Button, Center } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home () {
  const authUser = useSelector(store => store.auth)
  const navigate = useNavigate();
  function handleViewPortal () {
    if (authUser.role === 'super_admin') {
      navigate("/dashboard/users")
    } else if (authUser.role === 'artist_manager') {
      navigate("/dashboard/artists")
    } else {
      navigate("/artists-listing")
    }
  }
  return (
    <>
    <Center>
      Welcome { authUser && (<span> { ", " + authUser.first_name }</span>) }
      </Center>
      { authUser && (<Button onClick={handleViewPortal}>View Portal</Button>) }
    </>

  )
}

export default Home