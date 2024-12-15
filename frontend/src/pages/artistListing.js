import {  Text, VStack } from '@chakra-ui/react'
import React from 'react'
import AllArtists from './dashboard/artists/all'
import { useNavigate } from 'react-router-dom'

function ArtistListing () {
    const navigate = useNavigate() 
    return (
        <VStack width={'100%'} alignItems={'flex-start'}>
                <h2>Artists</h2>
            <Text>Click on some artist row to view their music.</Text>
            <AllArtists onRowClicked={(artistId) => navigate(`/artists-listing/${artistId}/music`)} />
        </VStack>

    )
}

export default ArtistListing