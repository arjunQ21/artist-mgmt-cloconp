import React from 'react'
import "./header.css"
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/menu'
import { HStack} from '@chakra-ui/react'
import { RiArrowDropDownFill } from "react-icons/ri";

function Header () {
    const authUser = useSelector((store) => store.auth)
    function logout () {
        if (authUser) {
            console.log("Logout Logic")
        }
    }
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
                        <MenuItem value="email">{ authUser.email }</MenuItem>
                        <MenuItem onClick={logout} color='red' value="new-txt">Logout</MenuItem>
                    </MenuContent>
                </MenuRoot>
            ) }
        </div>
    )
}

export default Header