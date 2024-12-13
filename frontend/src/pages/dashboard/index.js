import { Tabs, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LuPersonStanding, LuUsers } from 'react-icons/lu'
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import "./index.css"
function Dashboard () {
  const location = useLocation();

  function getCurrentTab () {
    if (location.pathname.includes("/dashboard/users")) {
      return ("users")
    } else if (location.pathname.includes("/dashboard/artists")) {
      return ("artists")
    } else {
      return "";
    }
  }

  const navigate = useNavigate();

  const authUser = useSelector(store => store.auth)

  const [selectedTab, setSelectedTab] = useState(getCurrentTab());


  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    } else {
      if (!getCurrentTab()) {
        if (authUser.role === 'super_admin') {
          navigate("users")
          setSelectedTab("users")
        } else if (authUser.role === 'artist_manager') {
          navigate("artists")
        } else {
          navigate("/songs")
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, location, navigate])

  return (
    <VStack width={ '100%' } alignItems={ 'flex-start' } >
      {/* <h2>Dashboard</h2> */ }
      <Tabs.Root defaultValue={ selectedTab } >
        <Tabs.List>
          <Tabs.Trigger value="users" onClick={ () => navigate("/dashboard/users") } >
            <LuUsers />
            Users
          </Tabs.Trigger>
          <Tabs.Trigger value="artists" onClick={ () => navigate("/dashboard/artists") }>
            <LuPersonStanding />
            Artists
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <VStack scrollbarWidth={ 'none' } width={ '100%' } overflowX={ 'scroll' } alignItems={ 'flex-start' }>
        <Outlet />
      </VStack>

    </VStack>
  )
}

export default Dashboard