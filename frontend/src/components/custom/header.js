import React, { useEffect } from 'react'
import "./header.css"
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/menu'
import { HStack } from '@chakra-ui/react'
import { RiArrowDropDownFill } from "react-icons/ri";
import { authTokenLocalSaveName } from 'src/helpers/constants'
import useAPIFetch from 'src/hooks/useAPIFetch'
import { login, logout } from 'src/state/slices/auth'



function Header () {

    const {  parsedResponse, fetchAPI } = useAPIFetch();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authUser = useSelector((store) => store.auth)
    function handleLogout () {
        dispatch(logout())
        gotoLogin();
    }

    function gotoLogin () {
        navigate("/login");
    }

    // check for saved token and try from it if it exists for automatic login
    useEffect(function () {
        const savedToken = localStorage.getItem(authTokenLocalSaveName);
        if (savedToken) {
            fetchAPI({
                uri: "/users/me",
                options: {
                    headers: {
                        "Authorization": "Bearer " + savedToken
                    }
                }
            })
        } else {
            gotoLogin();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(function () {
        if (!parsedResponse) return;
        if (parsedResponse.status === 'success') {
            dispatch(login(parsedResponse.data));
        } else gotoLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parsedResponse])

    return (
        <div className='header'>
            <span>Artist Management System</span>
            { !authUser && (
                <Link to="/login"> Login </Link>
            ) }
            { authUser && (
                <MenuRoot>
                    <MenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <HStack>
                                { authUser.first_name + " " + authUser.last_name } <RiArrowDropDownFill />
                            </HStack>
                        </Button>
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem value='dd'>{ authUser.email }</MenuItem>
                        <MenuItem value='dds'>[{ authUser.role }]</MenuItem>
                        <MenuItem onClick={ handleLogout } color='red' value="new-txt">Logout</MenuItem>
                    </MenuContent>
                </MenuRoot>
            ) }
        </div>
    )
}

export default Header