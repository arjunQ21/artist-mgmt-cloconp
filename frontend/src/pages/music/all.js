import { Table, Group, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useAPIFetch from 'src/hooks/useAPIFetch'
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "src/components/ui/pagination"
import Loading from 'src/components/custom/loading';
import { useNavigate, useParams } from 'react-router-dom';


function AllMusics () {

    const navigate = useNavigate();

    const { artistListingId } = useParams();

    const [page, setPage] = useState(1);

    const { loading, fetchAPI, parsedResponse } = useAPIFetch();

    function fetchNow () {
        fetchAPI({ uri: `/musics?page=${page}&limit=10&artistId=${artistListingId}` })
    }

    function handlePageChange (details) {
        setPage(details.page)
    }

    useEffect(() => {
        fetchNow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return loading ? <Loading /> : (

        <>
            <VStack width={ '100%' } alignItems={ 'flex-start' }>
                <Table.ScrollArea borderWidth="1px" interactive>
                    <Table.Root size="sm" variant="outline">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader >ID</Table.ColumnHeader>
                                <Table.ColumnHeader >Artist ID</Table.ColumnHeader>
                                <Table.ColumnHeader >Title</Table.ColumnHeader>
                                <Table.ColumnHeader >Album Name</Table.ColumnHeader>
                                <Table.ColumnHeader >Genre</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            { parsedResponse && parsedResponse.status === 'success' && parsedResponse.data.map((item) => (
                                <Table.Row key={ item.id } onClick={ () => navigate(`/artists-listing/${artistListingId}/music/${item.id}`) } cursor={ 'pointer' } >
                                    <Table.Cell>{ item.id }</Table.Cell>
                                    <Table.Cell>{ item.artist_id }</Table.Cell>
                                    <Table.Cell>{ item.title }</Table.Cell>
                                    <Table.Cell>{ item.album_name }</Table.Cell>
                                    <Table.Cell>{ item.genre }</Table.Cell>
                                </Table.Row>
                            )) }
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>

                <PaginationRoot count={ (page + 3) * 10 } onPageChange={ handlePageChange } pageSize={ 10 } page={ page } defaultPage={ 1 } >
                    <Group attached>
                        <PaginationPrevTrigger />
                        <PaginationItems />
                        <PaginationNextTrigger />
                    </Group>
                </PaginationRoot>
            </VStack>
        </>
    )
}


export default AllMusics