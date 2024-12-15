import { Table, Group } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useAPIFetch from 'src/hooks/useAPIFetch'
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "src/components/ui/pagination"
import Loading from 'src/components/custom/loading';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


function AllArtists ({onRowClicked}) {

    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const { loading, fetchAPI, parsedResponse } = useAPIFetch();

    function fetchNow () {
        fetchAPI({ uri: `/artists?page=${page}&limit=10` })
    }

    function handlePageChange (details) {
        setPage(details.page)
    }

    function handleRowClick(artistId){
        if (onRowClicked) {
            onRowClicked(artistId);
        } else {
            navigate("/dashboard/artists/" + artistId);
        }
    }

    useEffect(() => {
        fetchNow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return loading ? <Loading /> : (

        <>
            <Table.ScrollArea borderWidth="1px" interactive>
                <Table.Root size="sm" variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader >ID</Table.ColumnHeader>
                            <Table.ColumnHeader >Name</Table.ColumnHeader>
                            <Table.ColumnHeader >DOB</Table.ColumnHeader>
                            <Table.ColumnHeader >Gender</Table.ColumnHeader>
                            <Table.ColumnHeader >Address</Table.ColumnHeader>
                            <Table.ColumnHeader >First Release Year</Table.ColumnHeader>
                            <Table.ColumnHeader >Released Albums</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { parsedResponse && parsedResponse.status === 'success' && parsedResponse.data.map((item) => (
                            <Table.Row key={ item.id } onClick={ () => handleRowClick(item.id) } cursor={ 'pointer' } >
                                <Table.Cell>{ item.id }</Table.Cell>
                                <Table.Cell>{ item.name }</Table.Cell>
                                <Table.Cell>{ moment( item.dob).format("DD MMM, YYYY") }</Table.Cell>
                                <Table.Cell>{ item.gender }</Table.Cell>
                                <Table.Cell>{ item.address }</Table.Cell>
                                <Table.Cell>{ item.first_release_year }</Table.Cell>
                                <Table.Cell>{ item.no_of_albums_released }</Table.Cell>
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
        </>
    )
}


export default AllArtists