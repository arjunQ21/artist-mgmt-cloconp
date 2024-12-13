import { Box } from '@chakra-ui/react'
import React from 'react'

function Loading () {
    return (
        <Box height={ '200px' } width={ '100%' } bgColor="white" display={ 'flex' } alignItems={ 'center' } justifyContent={ 'center' }>
            <img src="/Loading.gif" style={ { height: "200px", mixBlendMode: "multiply" } } alt='Loading Image...' />
        </Box>
    )
}

export default Loading