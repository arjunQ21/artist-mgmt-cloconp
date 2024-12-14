import React from 'react'
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
import UsersIndex from './pages/dashboard/users';
import ArtistsIndex from './pages/dashboard/artists';
import UserAdd from './pages/dashboard/users/add';
import AllUsers from './pages/dashboard/users/all';
import { Route, Routes } from 'react-router-dom';
import { Center } from '@chakra-ui/react';
import SingleUserIndex from './pages/dashboard/users/single';
import SingleUserShow from './pages/dashboard/users/single/show';
import SingleUserEdit from './pages/dashboard/users/single/edit';


function AppRoutes () {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />
      <Route path="/dashboard" element={ <Dashboard /> }>
        <Route path="users" element={ <UsersIndex /> }>
          <Route path="add" element={ <UserAdd /> } />
          <Route index element={ <AllUsers /> } />
          <Route path=":userId" element={ <SingleUserIndex /> } >
            <Route index element={ <SingleUserShow /> } />
            <Route path = "edit" element = {<SingleUserEdit />} />
          </Route>
        </Route>
        <Route path="artists" element={ <ArtistsIndex /> } />
      </Route>
      <Route path='*' element={ <Center>404 - page not found</Center> } />
    </Routes>
  )
}

export default AppRoutes